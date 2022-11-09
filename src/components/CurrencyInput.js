import React from "react";
import { useState, useEffect } from "react";

export default function CurrencyInput({
  amount,
  currency,
  currencies,
  onAmountChange,
  onCurrencyChange,
}) {
  const [currencyName, setCurrencyName] = useState("");

  useEffect(() => {
    fetch(
      "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json"
    )
      .then((res) => res.json())
      .then((data) => {
        setCurrencyName(data[currency]);
      });
  }, [currency]);

  return (
    <>
      <div className="group">
        <input
          className="input"
          type="number"
          min={0}
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
        />
        <select
          className="select"
          value={currency}
          onChange={(e) => onCurrencyChange(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
      <p className="details">
        {amount} {currencyName}s
      </p>
    </>
  );
}
