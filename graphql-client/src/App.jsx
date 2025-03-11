import { useState } from 'react'
import './App.css'
import Home from '../components/Home'
import PromptList from '../components/PromptList'
import AddPrompt from '../components/AddPrompt'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Navbar bg="primary" variant="dark" expand="lg" className="mb-4 shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to='/home' className="fw-bold fs-4">Prompt Manager</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className='ms-auto'>
              <Nav.Link as={Link} to='/home' className="text-white fw-semibold">Home</Nav.Link>
              <Nav.Link as={Link} to='/promptList' className="text-white fw-semibold">Prompt List</Nav.Link>
              <Nav.Link as={Link} to='/addprompt' className="text-white fw-semibold">Add Prompt</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="p-4 bg-light rounded shadow-sm">
        <Routes>
          <Route index element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/promptList' element={<PromptList />} />
          <Route path='/addprompt' element={<AddPrompt />} />
        </Routes>
      </Container>
    </Router>
  )
}

export default App
