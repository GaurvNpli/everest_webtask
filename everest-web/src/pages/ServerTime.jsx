import { useState, useEffect } from 'react'
import '../styles/ServerTime.css'

function ServerTime() {
  const [serverTime, setServerTime] = useState(null)
  const [status, setStatus] = useState('loading')

  function fetchTime() {
    setStatus('loading')
    fetch('http://localhost:3000/time')
      .then((res) => res.json())
      .then((data) => {
        setServerTime(new Date(data.time))
        setStatus('success')
      })
      .catch(() => {
        setStatus('error')
      })
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
    <div className="servertime-wrapper">
      <div className="servertime-card">

        <p className="servertime-label">Server Time</p>

        {status === 'loading' && <p className="servertime-status">Connecting...</p>}
        {status === 'error' && <p className="servertime-error">Can't reach server. Is it running?</p>}
        {status === 'success' && serverTime && (
          <>
            <h1 className="servertime-time">{formatTime(serverTime)}</h1>
            <p className="servertime-date">{formatDate(serverTime)}</p>
          </>
        )}

        <button className="servertime-btn" onClick={fetchTime}>
          Refresh
        </button>

      </div>
    </div>
  )
}

export default ServerTime 
