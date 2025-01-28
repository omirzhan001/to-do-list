import './App.css'
import Header from './components/Header'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Todo from './pages/Todo'
import Done from './pages/Done'
import Trash from './pages/Trash'

function App() {
  return (
    <div className='container '>
      <BrowserRouter>
        <Header />
        <nav>
          <ul className='nav'>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'button__nav active' : 'button__nav'
                }
              >
                To Do
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Done"
                className={({ isActive }) =>
                  isActive ? 'button__nav active' : 'button__nav'
                }
              >
                Done
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Trash"
                className={({ isActive }) =>
                  isActive ? 'button__nav active' : 'button__nav'
                }
              >
                Trash
              </NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Todo />} />
          <Route path="/Done" element={<Done />} />
          <Route path="/Trash" element={<Trash />} />
        </Routes>
      </BrowserRouter>
      <div className='footer' >
        <div >
        <h6>Made with ❤️ at nFactorial in 2022</h6>
        </div>
        <div>
        <p>Credits: icons from Icons8.</p>
        </div>
      </div>
    </div>
  )
}

export default App
