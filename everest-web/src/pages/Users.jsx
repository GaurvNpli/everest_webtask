import { useState, useEffect } from 'react'
import '../styles/Users.css'

function Users() {
  const [users, setUsers] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  function fetchUsers() {
    fetch('http://localhost:3000/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(() => setStatus('Could not reach server'))
  }

  function handleSubmit() {
    if (!name || !email) {
      setStatus('Please fill in both fields!')
      return
    }

    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email })
    })
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.message)
        setName('')
        setEmail('')
        fetchUsers()
      })
      .catch(() => setStatus('Could not add user'))
  }

  return (
    <div className="users-wrapper">

      <div className="users-card">
        <h2 className="users-title">Add User</h2>
        <p className="users-desc">Insert a new user into the database</p>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="users-input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="users-input"
        />

        <button className="users-btn" onClick={handleSubmit}>
          Add User
        </button>

        {status && <p className="users-status">{status}</p>}
      </div>

      <div className="users-card">
        <h2 className="users-title">Users</h2>
        <p className="users-desc">All users from the database</p>

        {users.length === 0 ? (
          <p className="users-empty">No users yet. Add one!</p>
        ) : (
          <div className="users-list">
            {users.map((user) => (
              <div key={user.id} className="user-item">
                <div className="user-name">{user.name}</div>
                <div className="user-email">{user.email}</div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default Users 
