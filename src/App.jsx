import { useState, useCallback } from "react";
import { Layout } from "./components/Layout";
import { ExpressionInput } from "./components/ExpressionInput";
import { Results } from "./components/Results";
import Calculation from "./logic/calculation";

export const App = () => {
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);

  const calculateResult = useCallback(
    (input) => {
      const calculatedResult = new Calculation(input).calculate() ?? "Wrong input!";
      setResult({ expression: input, result: calculatedResult });
      setHistory(prevHistory => [{ expression: input, result: calculatedResult }, ...prevHistory]);
    },
    [setResult, setHistory]
  );

  const handleEraseHistory = () => {
    setHistory([]);
  };

  return (
    <Layout>
      <ExpressionInput handleSubmit={calculateResult} />
      <Results content={result} eraseHistory={handleEraseHistory} history={history} />
    </Layout>
  );
};