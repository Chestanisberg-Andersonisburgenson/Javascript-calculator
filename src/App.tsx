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
        className="number-button"
        >{index}
      </button>
    ))
   

  return (
  <div className="calculator">
      {numberButtons}
  </div>
  )
}

export default App
