import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import { Col, Container, Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";

import Login from "./login/Login"; 
import Register from "./login/Register"; 

import img1 from "./images/menu1.jpg";
import img2 from "./images/menu2.jpg";
import img3 from "./images/menu3.jpg";
import img4 from "./images/menu4.jpg";
import imgp1 from "./images/pizza1.jpg";
import imgp2 from "./images/pizza2.jpg";
import imgp3 from "./images/pizza3.jpg";

function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false); // State for login modal

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const incrementQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleShowCart = () => setShowCart(true);
  const handleCloseCart = () => setShowCart(false);
  
  // Functions to handle login modal
  const handleShowLogin = () => setShowLoginModal(true);
  const handleCloseLogin = () => setShowLoginModal(false);

  const items = [
    { id: 1, name: "Pizza Menu 1", img: img1 },
    { id: 2, name: "Pizza Menu 2", img: img2 },
    { id: 3, name: "Pizza Menu 3", img: img3 },
    { id: 4, name: "Pizza Menu 4", img: img4 },
  ];

  return (
    <Router>
      <Container>
        <Row>
          <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
              <Navbar.Brand href="#">Pizza House</Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                  <Nav.Link as={Link} to="/">Home</Nav.Link>
                  <Nav.Link as={Link} to="#about">About Us</Nav.Link>
                  <NavDropdown title="Menu" id="navbarScrollingDropdown">
                    <NavDropdown.Item href="#pizza">Pizza</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Button variant="outline-success" onClick={handleShowCart}>
                  Cart <span>({totalItems})</span>
                </Button>
                <Button variant="outline-primary" onClick={handleShowLogin} className="ms-2">
                  Login
                </Button>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Row>

        <Routes>
          <Route path="/" element={
            <>
              <Row>
                <Carousel>
                  <Carousel.Item>
                    <Image className="d-block w-100" src={imgp1} alt="First slide" />
                    <Carousel.Caption>
                      <h3>First Pizza</h3>
                      <p>Delicious pizza with fresh ingredients.</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <Image className="d-block w-100" src={imgp2} alt="Second slide" />
                    <Carousel.Caption>
                      <h3>Second Pizza</h3>
                      <p>Freshly baked pizza with melted cheese.</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <Image className="d-block w-100" src={imgp3} alt="Third slide" />
                    <Carousel.Caption>
                      <h3>Third Pizza</h3>
                      <p>A perfect combination of flavors and textures.</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
              </Row>

              <Row className="mt-4">
                {items.map((item) => (
                  <Col key={item.id} md={3}>
                    <Card>
                      <Card.Img variant="top" src={item.img} />
                      <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Button variant="primary" onClick={() => addToCart(item)}>
                          Buy
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>

              <Modal show={showCart} onHide={handleCloseCart}>
                <Modal.Header closeButton>
                  <Modal.Title>Your Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <ListGroup>
                    {cart.map((item) => (
                      <ListGroup.Item key={item.id}>
                        <Row>
                          <Col>{item.name}</Col>
                          <Col>
                            <Button variant="outline-secondary" onClick={() => decrementQuantity(item.id)}>
                              -
                            </Button>
                            <span className="mx-2">{item.quantity}</span>
                            <Button variant="outline-secondary" onClick={() => incrementQuantity(item.id)}>
                              +
                            </Button>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Modal.Body>
              </Modal>
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

        {/* Login Modal */}
        <Modal show={showLoginModal} onHide={handleCloseLogin}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseLogin}>
              Close
            </Button>
            <Button variant="primary" onClick={handleCloseLogin}>
              Login
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Router>
  );
}

export default App;
