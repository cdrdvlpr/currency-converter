import { useState, useEffect } from "react";
import CurrencyInput from "./components/CurrencyInput";

import Footer from "./components/Footer";

import "./App.css";

export default function App() {
  const [amount1, setAmount1] = useState(1);
  const [currency1, setCurrency1] = useState("usd");
  const [amount2, setAmount2] = useState(1);
  const [currency2, setCurrency2] = useState("syp");

  const [rates, setRates] = useState([]);

  useEffect(() => {
    fetch(
      "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json"
    )
      .then((res) => res.json())
      .then((data) => {
        setRates(data.eur);
      });
  }, []);

  useEffect(() => {
    if (!!rates) {
      handleAmount1Change(1);
    }
  }, [rates]);

  function format(number) {
    return number.toFixed(4);
  }

  function handleAmount1Change(amount1) {
    setAmount1(amount1);
    setAmount2(format((amount1 * rates[currency2]) / rates[currency1]));
  }
  function handleCurrency1Change(currency1) {
    setAmount2(format((amount1 * rates[currency2]) / rates[currency1]));
    setCurrency1(currency1);
  }
  function handleAmount2Change(amount2) {
    setAmount2(amount2);
    setAmount1(format((amount2 * rates[currency1]) / rates[currency2]));
  }
  function handleCurrency2Change(currency2) {
    setAmount1(format((amount2 * rates[currency1]) / rates[currency2]));
    setCurrency2(currency2);
  }

  return (
    <>
      <img className="background" src="./background.jpg" alt='background' />
      <div>
        <h1>Currency Converter</h1>
        <CurrencyInput
          amount={amount1}
          currency={currency1}
          currencies={Object.keys(rates)}
          onAmountChange={handleAmount1Change}
          onCurrencyChange={handleCurrency1Change}
        />
        <CurrencyInput
          amount={amount2}
          currency={currency2}
          currencies={Object.keys(rates)}
          onAmountChange={handleAmount2Change}
          onCurrencyChange={handleCurrency2Change}
        />
      </div>
      <Footer />
    </>
  );
}
