import './App.css'
import Header from './components/Header'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Todo from './pages/Todo'
import Done from './pages/Done'
import Trash from './pages/Trash'
function App() {


  return (
    <>
      <BrowserRouter>
      <Header />
      <nav>
        <ul>
          <li>
            <Link to="/">Todo</Link>
          </li>
          <li>
            <Link to="/Done">Done</Link>
          </li>
          <li>
            <Link to="/Trash">Trash</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Todo />} />
        <Route path="/Done" element={<Done />} />
        <Route path="/Trash" element={<Trash />} />
      </Routes>
    </BrowserRouter >
    </>
  )
}

export default App
