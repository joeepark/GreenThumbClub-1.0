import React from 'react';
import { Button, Container, Form } from "react-bootstrap";
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Axios from 'axios';

// 4th component of page
function Signinpage() {
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await Axios.post('/api/users', {
                username,
                password,
            });
            if (data) {
                window.location.replace('/goodjob');
            } else {
                alert('Invalid username or password')
            }
        } catch (err) {
        }
    }

    return (
        <Container>
            <div className="small-container">
                <h1 className='my-3'>Sign In</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" required onChange={(e) => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <div className="mb-3">
                        <Button type="submit">Sign In</Button>
                    </div>
                    <div className="mb-3">
                        New customer?{' '}
                        <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
                    </div>
                </Form>
            </div>
        </Container>
    )
}

export default Signinpage;