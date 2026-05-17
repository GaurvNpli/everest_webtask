import { useState } from 'react'
import '../styles/Calendar.css'

function Calendar() {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth()) // 0 = January, 11 = December
  const [selectedDate, setSelectedDate] = useState(null)

  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ]

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const firstDay = new Date(year, month, 1).getDay()

  const daysInMonth = new Date(year, month + 1, 0).getDate()

  function prevMonth() {
    if (month === 0) {
      setMonth(11)
      setYear(year - 1)
    } else {
      setMonth(month - 1)
    }
  }

  function nextMonth() {
    if (month === 11) {
      setMonth(0)
      setYear(year + 1)
    } else {
      setMonth(month + 1)
    }
  }

  function handleDateClick(day) {
    setSelectedDate(new Date(year, month, day))
  }

  function formatSelectedDate(date) {
    const mm = String(date.getMonth() + 1).padStart(2, '0')
    const dd = String(date.getDate()).padStart(2, '0')
    const yyyy = date.getFullYear()
    const weekday = date.toLocaleDateString('en-US', { weekday: 'long' })
    return `${mm}/${dd}/${yyyy}, ${weekday}`
  }

  function buildDays() {
    const cells = []

    for (let i = 0; i < firstDay; i++) {
      cells.push(<div key={`empty-${i}`} className="day-cell empty"></div>)
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const isToday =
        d === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()

      const isSelected =
        selectedDate &&
        d === selectedDate.getDate() &&
        month === selectedDate.getMonth() &&
        year === selectedDate.getFullYear()

      cells.push(
        <div
          key={d}
          className={`day-cell ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
          onClick={() => handleDateClick(d)}
        >
          {d}
        </div>
      )
    }

    return cells
  }

  return (
    <div className="calendar-wrapper">

      {/* shows selected date at top */}
      <div className="selected-date">
        {selectedDate ? formatSelectedDate(selectedDate) : 'Pick a date'}
      </div>

      <div className="calendar">

        <div className="cal-header">
  <button onClick={prevMonth}>←</button>
  <div className="cal-title">
    <span>{months[month]}</span>
    {/* year dropdown - generates years from 1900 to 2100 */}
    <select
      value={year}
      onChange={(e) => setYear(Number(e.target.value))}
      className="year-select"
    >
      {Array.from({ length: 201 }, (_, i) => 1900 + i).map((y) => (
        <option key={y} value={y}>{y}</option>
      ))}
    </select>
  </div>
  <button onClick={nextMonth}>→</button>
</div>

        {/* day labels */}
        <div className="day-labels">
          {days.map(d => <div key={d}>{d}</div>)}
        </div>

        {/* the actual day grid */}
        <div className="day-grid">
          {buildDays()}
        </div>

      </div>
    </div>
  )
}

export default Calendar