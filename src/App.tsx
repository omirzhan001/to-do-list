import './App.css'
import Header from './components/Header'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Todo from './pages/Todo'
import Done from './pages/Done'
import Trash from './pages/Trash'
function App() {


  return (
    <div className='container'>
      <BrowserRouter>
      
      <Header/>
      <nav >
        <ul className='nav '>
          <li className='button__nav  '>
            <Link to="/" className='link_app'>To Do</Link>
          </li>
          <li className='button__nav'>
            <Link to="/Done" className='link_app'>Done</Link>
          </li>
          <li className='button__nav '>
            <Link to="/Trash" className='link_app'>Trash</Link>
          </li>
        </ul>
      </nav>
      <Routes >
        <Route path="/" element={<Todo />} />
        <Route path="/Done" element={<Done />} />
        <Route path="/Trash" element={<Trash />} />
      </Routes>
    </BrowserRouter >
    </div>
  )
}

export default App
