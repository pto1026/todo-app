import React from 'react'
import { Container } from 'react-bootstrap'
import Create from './components/Create'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'
import CustomNavbar from './components/CustomNavbar'
import Edit from './components/Edit'


const App = () => {
    return (
        <Container fluid>
            <CustomNavbar />
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/edit/:id' element={<Edit />} />
                <Route path='/create' element={<Create />} />
            </Routes>
        </Container>
    )
}

export default App