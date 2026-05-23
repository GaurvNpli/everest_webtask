import { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'

const MONTHS = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
]

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

export default function Calendar() {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState(null)

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(y => y - 1) }
    else setMonth(m => m - 1)
  }

  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(y => y + 1) }
    else setMonth(m => m + 1)
  }

  function formatSelected(date) {
    const mm = String(date.getMonth() + 1).padStart(2, '0')
    const dd = String(date.getDate()).padStart(2, '0')
    const yyyy = date.getFullYear()
    const weekday = date.toLocaleDateString('en-US', { weekday: 'long' })
    return `${mm}/${dd}/${yyyy} — ${weekday}`
  }

  function buildDays() {
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const cells = []

    for (let i = 0; i < firstDay; i++) {
      cells.push(<View key={`e-${i}`} style={styles.dayCell} />)
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear()
      const isSelected = selectedDate &&
        d === selectedDate.getDate() &&
        month === selectedDate.getMonth() &&
        year === selectedDate.getFullYear()

      cells.push(
        <TouchableOpacity
          key={d}
          style={[styles.dayCell, isSelected && styles.selectedDay, isToday && !isSelected && styles.todayDay]}
          onPress={() => setSelectedDate(new Date(year, month, d))}
          activeOpacity={0.7}
        >
          <Text style={[
            styles.dayText,
            isSelected && styles.selectedDayText,
            isToday && !isSelected && styles.todayText
          ]}>
            {d}
          </Text>
        </TouchableOpacity>
      )
    }

    return cells
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* page title */}
      <Text style={styles.pageTitle}>Calendar</Text>

      <View style={styles.calendar}>

        {/* year navigation */}
        <View style={styles.yearRow}>
          <TouchableOpacity onPress={() => setYear(y => y - 1)} style={styles.navBtn}>
            <Text style={styles.navBtnText}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.yearText}>{year}</Text>
          <TouchableOpacity onPress={() => setYear(y => y + 1)} style={styles.navBtn}>
            <Text style={styles.navBtnText}>›</Text>
          </TouchableOpacity>
        </View>

        {/* month navigation */}
        <View style={styles.monthRow}>
          <TouchableOpacity onPress={prevMonth} style={styles.navBtn}>
            <Text style={styles.navBtnText}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.monthText}>{MONTHS[month]}</Text>
          <TouchableOpacity onPress={nextMonth} style={styles.navBtn}>
            <Text style={styles.navBtnText}>›</Text>
          </TouchableOpacity>
        </View>

        {/* divider */}
        <View style={styles.divider} />

        {/* day labels */}
        <View style={styles.dayLabels}>
          {DAYS.map(d => (
            <Text key={d} style={styles.dayLabel}>{d}</Text>
          ))}
        </View>

        {/* grid */}
        <View style={styles.grid}>
          {buildDays()}
        </View>

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 24,
    paddingTop: 60,
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0f172a',
    letterSpacing: -1,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  selectedPill: {
    backgroundColor: '#0f172a',
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 25,
    alignSelf: 'flex-start',
  },
  selectedText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '500',
  },
  calendar: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  yearRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  monthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  yearText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#64748b',
  },
  monthText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
    letterSpacing: -0.5,
  },
  navBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  navBtnText: {
    fontSize: 18,
    color: '#64748b',
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginBottom: 12,
  },
  dayLabels: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  dayLabel: {
    flex: 1,
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '600',
    color: '#94a3b8',
    letterSpacing: 0.5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  dayText: {
    fontSize: 14,
    color: '#0f172a',
  },
  todayDay: {
    backgroundColor: '#f1f5f9',
  },
  todayText: {
    color: '#2563eb',
    fontWeight: '700',
  },
  selectedDay: {
    backgroundColor: '#0f172a',
  },
  selectedDayText: {
    color: 'white',
    fontWeight: '600',
  },
}) 
