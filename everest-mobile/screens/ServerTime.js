import { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function ServerTime() {
  const [serverTime, setServerTime] = useState(null)
  const [status, setStatus] = useState('loading')

  function fetchTime() {
    setStatus('loading')
 
fetch('http://192.168.1.75:3000/time')
      .then((res) => res.json())
      .then((data) => {
        setServerTime(new Date(data.time))
        setStatus('success')
      })
      .catch(() => setStatus('error'))
  }

  useEffect(() => {
    fetchTime()
    const interval = setInterval(fetchTime, 5000)
    return () => clearInterval(interval)
  }, [])

  function formatTime(date) {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  function formatDate(date) {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>SERVER TIME</Text>

        {status === 'loading' && <Text style={styles.statusText}>Connecting...</Text>}
        {status === 'error' && <Text style={styles.errorText}>Can't reach server{'\n'}Is it running?</Text>}
        {status === 'success' && serverTime && (
          <>
            <Text style={styles.time}>{formatTime(serverTime)}</Text>
            <Text style={styles.date}>{formatDate(serverTime)}</Text>
          </>
        )}

        <TouchableOpacity style={styles.btn} onPress={fetchTime}>
          <Text style={styles.btnText}>Refresh</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 40,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 8,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94a3b8',
    letterSpacing: 2,
    marginBottom: 8,
  },
  time: {
    fontSize: 48,
    fontWeight: '300',
    color: '#0f172a',
    letterSpacing: -2,
  },
  date: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 16,
  },
  statusText: {
    fontSize: 16,
    color: '#94a3b8',
  },
  errorText: {
    fontSize: 14,
    color: '#ef4444',
    textAlign: 'center',
  },
  btn: {
    marginTop: 16,
    backgroundColor: '#0f172a',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
  },
  btnText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
}) 
