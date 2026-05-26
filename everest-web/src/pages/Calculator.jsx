import { useState } from 'react'
import '../styles/Calculator.css'

function Calculator() {
  const [display, setDisplay] = useState('0')
  const [expression, setExpression] = useState('')
  const [justCalculated, setJustCalculated] = useState(false)

  function handleNumber(num) {
    if (justCalculated) {
      setDisplay(String(num))
      setJustCalculated(false)
      return
    }
    if (display === '0') {
      setDisplay(String(num))
    } else {
      setDisplay(display + num)
    }
  }

  function handleOperator(op) {
    setJustCalculated(false)
    setExpression(display + ' ' + op)
    setDisplay('0')
  }

  function handleDecimal() {
    if (display.includes('.')) return
    setDisplay(display + '.')
  }

  function handleEquals() {
    if (!expression) return
    const parts = expression.split(' ')
    const prev = parseFloat(parts[0])
    const op = parts[1]
    const current = parseFloat(display)

    let result = 0
    if (op === '+') result = prev + current
    if (op === '-') result = prev - current
    if (op === '*') result = prev * current
    if (op === '/') result = current !== 0 ? prev / current : 'Error'

    setDisplay(String(result))
    setExpression('')
    setJustCalculated(true)
  }

  function handleClear() {
    setDisplay('0')
    setExpression('')
    setJustCalculated(false)
  }

  function handleToggleSign() {
    setDisplay(String(parseFloat(display) * -1))
  }

  function handlePercent() {
    setDisplay(String(parseFloat(display) / 100))
  }

  const buttons = [
    ['C', '+/-', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
  ]

  function handleButton(btn) {
    if (btn === 'C') handleClear()
    else if (btn === '+/-') handleToggleSign()
    else if (btn === '%') handlePercent()
    else if (btn === '÷') handleOperator('/')
    else if (btn === '×') handleOperator('*')
    else if (btn === '-') handleOperator('-')
    else if (btn === '+') handleOperator('+')
    else if (btn === '=') handleEquals()
    else if (btn === '.') handleDecimal()
    else handleNumber(btn)
  }

  function getButtonClass(btn) {
    if (btn === '=') return 'btn btn-equals'
    if (['÷', '×', '-', '+'].includes(btn)) return 'btn btn-operator'
    if (['C', '+/-', '%'].includes(btn)) return 'btn btn-function'
    if (btn === '0') return 'btn btn-zero'
    return 'btn'
  }

  return (
    <div className="calc-wrapper">
      <div className="calculator">

        {/* display screen */}
        <div className="calc-display">
          <div className="calc-expression">{expression}</div>
          <div className="calc-number">{display}</div>
        </div>

        <div className="calc-buttons">
          {buttons.map((row, i) => (
            <div key={i} className="calc-row">
              {row.map((btn) => (
                <button
                  key={btn}
                  className={getButtonClass(btn)}
                  onClick={() => handleButton(btn)}
                >
                  {btn}
                </button>
              ))}
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Calculator 
