import { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const BUTTONS = [
  ['C', '+/-', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', '.', '='],
]

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [expression, setExpression] = useState('')
  const [justCalculated, setJustCalculated] = useState(false)

  function handleNumber(num) {
    if (justCalculated) { setDisplay(String(num)); setJustCalculated(false); return }
    setDisplay(display === '0' ? String(num) : display + num)
  }

  function handleOperator(op) {
    setJustCalculated(false)
    setExpression(display + ' ' + op)
    setDisplay('0')
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

  function handleButton(btn) {
    if (btn === 'C') { setDisplay('0'); setExpression(''); setJustCalculated(false) }
    else if (btn === '+/-') setDisplay(String(parseFloat(display) * -1))
    else if (btn === '%') setDisplay(String(parseFloat(display) / 100))
    else if (btn === '÷') handleOperator('/')
    else if (btn === '×') handleOperator('*')
    else if (btn === '-') handleOperator('-')
    else if (btn === '+') handleOperator('+')
    else if (btn === '=') handleEquals()
    else if (btn === '.') { if (!display.includes('.')) setDisplay(display + '.') }
    else handleNumber(btn)
  }

  function getBtnStyle(btn) {
    if (btn === '=') return [styles.btn, styles.btnEquals]
    if (['÷', '×', '-', '+'].includes(btn)) return [styles.btn, styles.btnOperator]
    if (['C', '+/-', '%'].includes(btn)) return [styles.btn, styles.btnFunction]
    if (btn === '0') return [styles.btn, styles.btnZero]
    return [styles.btn]
  }

  function getBtnTextStyle(btn) {
    if (btn === '=') return [styles.btnText, styles.btnEqualsText]
    if (['÷', '×', '-', '+'].includes(btn)) return [styles.btnText, styles.btnOperatorText]
    if (['C', '+/-', '%'].includes(btn)) return [styles.btnText, styles.btnFunctionText]
    return [styles.btnText]
  }

  return (
    <View style={styles.container}>
      {/* display */}
      <View style={styles.display}>
        <Text style={styles.expression}>{expression}</Text>
        <Text style={styles.number} numberOfLines={1} adjustsFontSizeToFit>
          {display}
        </Text>
      </View>

      {/* buttons */}
      <View style={styles.buttons}>
        {BUTTONS.map((row, i) => (
          <View key={i} style={styles.row}>
            {row.map((btn) => (
              <TouchableOpacity
                key={btn}
                style={getBtnStyle(btn)}
                onPress={() => handleButton(btn)}
              >
                <Text style={getBtnTextStyle(btn)}>{btn}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    justifyContent: 'flex-end',
    padding: 16,
    paddingBottom: 24,
  },
  display: {
    padding: 24,
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  expression: {
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 4,
    minHeight: 24,
  },
  number: {
    fontSize: 52,
    fontWeight: '300',
    color: '#0f172a',
    letterSpacing: -2,
  },
  buttons: {
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  btn: {
    flex: 1,
    height: 72,
    backgroundColor: 'white',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  btnText: {
    fontSize: 20,
    color: '#0f172a',
    fontWeight: '400',
  },
  btnFunction: {
    backgroundColor: '#f1f5f9',
    borderColor: '#f1f5f9',
  },
  btnFunctionText: {
    color: '#475569',
    fontSize: 16,
  },
  btnOperator: {
    backgroundColor: '#f8fafc',
    borderColor: '#e2e8f0',
  },
  btnOperatorText: {
    color: '#2563eb',
    fontWeight: '500',
  },
  btnEquals: {
    backgroundColor: '#0f172a',
    borderColor: '#0f172a',
  },
  btnEqualsText: {
    color: 'white',
    fontWeight: '500',
  },
  btnZero: {
    flex: 2,
  },
})