import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, NavLink } from "react-bootstrap";
import { Container } from "react-bootstrap";
import Signinpage from './Pages/Signinpage.js';
import Homepage from "./Pages/Homepage.js";
import Goodjob from './Pages/Goodjob.js'


// 2nd component of page
function App() {
    return (
        <div name="app">
            <header>
                <Navbar className="navbar">
                    <Container>
                        <Navbar.Brand href='/'>Green Thumb Club </Navbar.Brand>
                        <NavLink className="signin" href="/signin"><b>Sign In</b></NavLink>
                    </Container>
                </Navbar>
            </header>
            <main>
                <Container>
                    <Router>
                        <Routes>
                            <Route path='/' element={<Homepage />} />
                            <Route path='/signin' element={<Signinpage />} />
                            <Route path='/goodjob' element={<Goodjob />} />
                        </Routes>
                    </Router>
                </Container>
            </main>
        </div>
    );
}

export default App;