import './App.css'

function App() {

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
  0: { col: 1, row: 6, span: 4 }, // Big fat 0
};

const numberButtons =  numberWords.map((word, index: number) => {
  const position = numberPositions[index];
  return (
      <button
        id={word}
        key={index}
        className="button"
        style={{
          gridColumn: position.col,
          gridRow: position.row,
          gridColumnEnd: position.span ? `span ${position.span}` : undefined
        }}
        >{index}
      </button>
  )
})
   
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
  let col: number;
  let row: number;

  if (i < 4) {
    col = i + 1;
    row = 2;
  } else {
    col = 4;
    row = i-1; 
  }

  return (
    <button
      id={id}
      key={id}
      className="button"
      style={{
        gridColumn: col,
        gridRow: row,
      }}
    >
      {symbol}
    </button>
  );
});

  return (
  <div className="calculator">
    <div id="display" className='display' style={{gridRow:1}}></div>
      {numberButtons}
      {operatorButtons}
  </div>
  )
}

export default App
