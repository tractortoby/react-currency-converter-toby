import React, { useState, useEffect } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';

const ACCESS_KEY = 'd550e80a38cb3394859f2f09daf15cb8';
const BASE_URL = `http://api.exchangeratesapi.io/v1/latest?access_key=${ACCESS_KEY}`;

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);

  // 第一个选择菜单
  const [fromCurrency, setFromCurrency] = useState();

  // 第二个选择菜单
  const [toCurrency, setToCurrency] = useState();

  const [amount, setAmount] = useState(1);

  // 设置两个输入框的选中状态便于更新
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  // 汇率
  const [exchangeRate, setExchangeRate] = useState();

  // 定义第一和第二输入框
  let fromAmount, toAmount;

  // 输入框为第一个则数量乘汇率, 第二个则数量除汇率
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.rates)[0];

        // 返回货币代号数组
        setCurrencyOptions(Object.keys(data.rates));

        // 设置第一个选择菜单初始汇率基准
        setFromCurrency(data.base);

        // 设置第二个选择菜单
        setToCurrency(firstCurrency);

        // 设置汇率
        setExchangeRate(data.rates[firstCurrency]);
      });
  }, []);

  // 选择菜单时更新输入框汇率
  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(BASE_URL)
        .then((res) => res.json())
        .then((data) => setExchangeRate(data.rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }
  
  console.log(exchangeRate);
  return (
    <>
      <h1>Convert</h1>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={(e) => setFromCurrency(e.target.value)}
        amount={fromAmount}
        onChangeAmount={handleFromAmountChange}
      />
      <div className="equals">=</div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={(e) => setToCurrency(e.target.value)}
        amount={toAmount}
        onChangeAmount={handleToAmountChange}
      />
    </>
  );
}

export default App;
