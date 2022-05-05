import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, NavLink } from "react-bootstrap";
import { Container } from "react-bootstrap";
import Signinpage from './Pages/Signinpage.js';
import Homepage from "./Pages/Homepage.js";


// 2nd component of page
function App() {
    return (
        <div>
            <header>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href='/'>Monstera </Navbar.Brand>
                        <NavLink href="/signin">Sign In</NavLink>
                    </Container>
                </Navbar>
            </header>
            <main>
                <Container>
                    <Router>
                        <Routes>
                            <Route path='/' element={<Homepage />} />
                            <Route path='/signin' element={<Signinpage />} />
                        </Routes>
                    </Router>
                </Container>
            </main>
        </div>
    );
}

export default App;