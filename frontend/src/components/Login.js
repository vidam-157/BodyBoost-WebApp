import React, { useState, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import login_image from '../images/img1.jpg';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [action, setAction] = useState('Login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [errors, setErrors] = useState({});
    const { login, signup } = useContext(AuthContext);

    const validateForm = () => {
        let errors = {};

        if (action === 'Sign up') {
            if (!firstName) errors.firstName = 'First name is required';
            if (!lastName) errors.lastName = 'Last name is required';
        }

        if (!email) errors.email = 'Email is required';
        if (!password) errors.password = 'Password is required';

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleAuth = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        if (action === 'Login') {
            login({ email, password });
        } else {
            signup({ firstName, lastName, email, password });
        }
    };

    return (
        <Container className='d-flex justify-content-center align-items-center vh-100'>
            <Row>
                <Col>
                    <Card className='login-form-container' 
                        style={{ background: 'hsla(0, 0%, 10%, 0.55)', backdropFilter: 'blur(10px)', color:'#ff8c00' }}>
                        <Card.Body className='p-5 text-center'>
                            <Row>
                                <Col className='login-signup' md='6'>
                                    <h1>BodyBoost</h1>
                                    <h3 className="m-5">{action}</h3>

                                    <Form className='login-form-info' onSubmit={handleAuth}>
                                        {action === 'Sign up' && (
                                            <Row>
                                                <Col md='6'>
                                                    <Form.Group className='mb-4' controlId='formFirstName'>
                                                        <Form.Label>First name</Form.Label>
                                                        <Form.Control 
                                                            type='text' 
                                                            placeholder='First name' 
                                                            value={firstName} 
                                                            onChange={(e) => setFirstName(e.target.value)} 
                                                        />
                                                        {errors.firstName && <div style={{ color: 'red' }}>{errors.firstName}</div>}
                                                    </Form.Group>
                                                </Col>

                                                <Col md='6'>
                                                    <Form.Group className='mb-4' controlId='formLastName'>
                                                        <Form.Label>Last name</Form.Label>
                                                        <Form.Control 
                                                            type='text' 
                                                            placeholder='Last name' 
                                                            value={lastName} 
                                                            onChange={(e) => setLastName(e.target.value)} 
                                                        />
                                                        {errors.lastName && <div style={{ color: 'red' }}>{errors.lastName}</div>}
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        )}

                                        <Form.Group className='mb-4' controlId='formEmail'>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control 
                                                type='email' 
                                                placeholder='Enter email' 
                                                value={email} 
                                                onChange={(e) => setEmail(e.target.value)} 
                                            />
                                            {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                                        </Form.Group>

                                        <Form.Group className='mb-4' controlId='formPassword'>
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control 
                                                type='password' 
                                                placeholder='Password' 
                                                value={password} 
                                                onChange={(e) => setPassword(e.target.value)} 
                                            />
                                            {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
                                        </Form.Group>

                                        <Button variant='primary' type='submit' className='w-100 mb-4'>{action}</Button>
                                    </Form>

                                    <div className="text-center">
                                        <div>
                                            <div
                                                className={action === "Login" ? "active" : "inactive"}
                                                onClick={() => setAction("Sign up")}
                                            >
                                                or Sign up with:
                                            </div>
                                            <div
                                                className={action === "Sign up" ? "active" : "inactive"}
                                                onClick={() => setAction("Login")}
                                            >
                                                or Login with:
                                            </div>
                                        </div>
                                        
                                        <Button variant='link' className='mx-3' style={{ color: '#1266f1' }}>
                                            <i className="fab fa-facebook-f"></i>
                                        </Button>

                                        <Button variant='link' className='mx-3' style={{ color: '#1266f1' }}>
                                            <i className="fab fa-google"></i>
                                        </Button>
                                    </div>
                                </Col>

                                <Col md='6' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0' }}>
                                    <img src={login_image} style={{ width: '100%', maxWidth: '470px', height: 'auto' }} className="rounded-4 shadow-4" alt="Signup illustration" />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
