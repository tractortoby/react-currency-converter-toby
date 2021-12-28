import React from 'react';

export default function CurrencyRow(props) {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    amount,
    onChangeAmount,
  } = props;
  return (
    <div>
      {/* <label htmlFor="">Amount</label> */}
      <input
        type="number"
        name="number"
        id="number"
        className="input"
        value={amount}
        onChange={onChangeAmount}
      />
      <select
        value={selectedCurrency}
        onChange={onChangeCurrency}
        name="currencyOptions"
        id="currencyOptions"
      >
        {currencyOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
