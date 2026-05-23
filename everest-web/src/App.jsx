import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Calendar from './pages/Calendar'
import Calculator from './pages/Calculator'
import ServerTime from './pages/ServerTime'
import './styles/App.css'
import Files from './pages/Files'
import Users from './pages/Users'


function App() {
  return (
    //  enables routing in our app
    <BrowserRouter>
      <div className="container">

        <nav className="navbar">
          <span className="logo">everest.</span>
          <div className="nav-links">
            <NavLink to="/calendar">Calendar</NavLink>
            <NavLink to="/calculator">Calculator</NavLink>
            <NavLink to="/server-time">Server Time</NavLink>
            <NavLink to="/files">Files</NavLink>
            <NavLink to="/users">Users</NavLink>
          </div>
        </nav>

        <main className="main">
          <Routes>
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/server-time" element={<ServerTime />} />
            <Route path="/files" element={<Files />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  )
}

export default App 
