import React, { useState, useEffect } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';

const ACCESS_KEY = 'd550e80a38cb3394859f2f09daf15cb8';
const BASE_URL = `http://api.exchangeratesapi.io/v1/latest?access_key=${ACCESS_KEY}`;

function App() {
  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <>
      <h1>Convert</h1>
      <CurrencyRow />
      <div className="equals">=</div>
      <CurrencyRow />
    </>
  );
}

export default App;
