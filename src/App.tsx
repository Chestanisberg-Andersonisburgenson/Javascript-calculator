import './App.css'

function App() {

  const numberWords = [
  "zero", "one", "two", "three", "four",
  "five", "six", "seven", "eight", "nine"
];

const numberButtons =  numberWords.map((word, index: number) => (
      <button
        id={word}
        key={index}
        className="button"
        >{index}
      </button>
    ))
   
const calcButtons = {
  "add": "+",
  "subtract": "-",
  "multiply": "*",
  "divide": "/",
  "equals": "=",
  "clear": "C",
  "decimal": "."
}

const otherButtons = Object.entries(calcButtons).map(([name, symbol]) => (
  <button
    id={name}
    key={name}
    className="button"
    >{symbol}
  </button>
))

  return (
  <div className="calculator">
    <div id="display" className='display'></div>
    <div id="display"></div>
      {numberButtons}
      {otherButtons}
  </div>
  )
}

export default App
