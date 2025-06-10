import './App.css';
import { useEffect, useState } from 'react';
import { evaluate } from 'mathjs';

function App() {
  const [expression, setExpression] = useState("0");
  const [result, setResult] = useState("");
  const [justEvaluated, setJustEvaluated] = useState(false);

  const numberWords = [
    "zero", "one", "two", "three", "four",
    "five", "six", "seven", "eight", "nine"
  ];

  const numberPositions: Record<number, { col: number; row: number; span?: number }> = {
    7: { col: 1, row: 3 },
    8: { col: 2, row: 3 },
    9: { col: 3, row: 3 },
    4: { col: 1, row: 4 },
    5: { col: 2, row: 4 },
    6: { col: 3, row: 4 },
    1: { col: 1, row: 5 },
    2: { col: 2, row: 5 },
    3: { col: 3, row: 5 },
    0: { col: 1, row: 6, span: 4 },
  };

  const numberButtons = numberWords.map((word, index) => {
    const pos = numberPositions[index];
    return (
      <button
        id={word}
        key={index}
        className="button"
        onClick={() => handleClick(index.toString())}
        style={{
          gridColumn: pos.col,
          gridRow: pos.row,
          gridColumnEnd: pos.span ? `span ${pos.span}` : undefined,
        }}
      >
        {index}
      </button>
    );
  });

  const operatorList = [
    { id: "clear", symbol: "C" },
    { id: "divide", symbol: "/" },
    { id: "multiply", symbol: "*" },
    { id: "subtract", symbol: "-" },
    { id: "add", symbol: "+" },
    { id: "decimal", symbol: "." },
    { id: "equals", symbol: "=" },
  ];

  const operatorButtons = operatorList.map(({ id, symbol }, i) => {
    let col = i < 4 ? i + 1 : 4;
    let row = i < 4 ? 2 : i - 1;
    return (
      <button
        id={id}
        key={id}
        className="button"
        onClick={() => handleOperator(symbol)}
        style={{
          gridColumn: col,
          gridRow: row,
        }}
      >
        {symbol}
      </button>
    );
  });

  const VALID_CHARS = new Set([
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    "+", "-", "*", "/", ".", "="
  ]);

  const handleClick = (val: string) => {
  setExpression(prev => {
    if (justEvaluated && /[0-9]/.test(val)) {
      setJustEvaluated(false);
      return val; 
    } else if (justEvaluated && /[\+\-\*\/]/.test(val)) {
      setJustEvaluated(false);
      return prev + val; 
    } else {
      return prev === "0" ? val : prev + val;
    }
  });
  setResult(""); 
};


  const handleOperator = (symbol: string) => {
  if (symbol === "=") {
    handleEquals();
    return;
  }

  if (symbol === "C") {
    setExpression("0");
    setResult("");
    setJustEvaluated(false);
    return;
  }

  if (symbol === ".") {
    const lastNumber = expression.split(/[\+\-\*\/]/).pop();
    if (lastNumber?.includes(".")) return;
    handleClick(symbol);
    return;
  }

  setExpression(prev => {
    // If just evaluated, start fresh with the result + operator
    if (justEvaluated && /[+\-*/]/.test(symbol)) {
      setJustEvaluated(false);
      return result + symbol;
    }

    const lastChar = prev[prev.length - 1];
    const secondLastChar = prev[prev.length - 2];

    // If two operators at the end, allow minus (negative number) but replace other operators
    if (/[+\-*/]/.test(lastChar)) {
      if (symbol === "-" && !/[+\-*/]/.test(secondLastChar)) {
        return prev + symbol;
      } else {
        return prev.replace(/[+\-*/]+$/, symbol);
      }
    }

    return prev + symbol;
  });

  setJustEvaluated(false);
  };

  const handleEquals = () => {
    try {
      const value = evaluate(expression);
      setResult(value.toString());
      setExpression(value.toString());
      setJustEvaluated(true);
    } catch {
      setResult("Error");
      setJustEvaluated(true);
    }
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (VALID_CHARS.has(key)) {
        handleClick(key);
      } else if (key === "Enter") {
        handleEquals();
      } else if (key === "Backspace") {
        setExpression(expr => expr.length > 1 ? expr.slice(0, -1) : "0");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="calculator">
      <div id="display" className="display" style={{ gridRow: 1 }}>
        {result || expression}
      </div>
      {numberButtons}
      {operatorButtons}
    </div>
  );
}

export default App;
