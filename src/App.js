import React, { useState } from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import { Col, Container, Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";

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

  // Thêm sản phẩm vào giỏ hàng
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

  // Tăng số lượng sản phẩm trong giỏ hàng
  const incrementQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Giảm số lượng sản phẩm trong giỏ hàng
  const decrementQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Hiển thị tổng số sản phẩm trong giỏ hàng
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Mở hoặc đóng popup giỏ hàng
  const handleShowCart = () => setShowCart(true);
  const handleCloseCart = () => setShowCart(false);

  // Dữ liệu sản phẩm
  const items = [
    { id: 1, name: "Pizza Menu 1", img: img1 },
    { id: 2, name: "Pizza Menu 2", img: img2 },
    { id: 3, name: "Pizza Menu 3", img: img3 },
    { id: 4, name: "Pizza Menu 4", img: img4 },
  ];

  return (
    <>
      <Container>
        <Row>
          <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
              <Navbar.Brand href="#">Pizza House</Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                  <Nav.Link href="#home">Home</Nav.Link>
                  <Nav.Link href="#about">About Us</Nav.Link>
                  <NavDropdown title="Menu" id="navbarScrollingDropdown">
                    <NavDropdown.Item href="#pizza">Pizza</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Button variant="outline-success" onClick={handleShowCart}>
                  Cart <span>({totalItems})</span>
                </Button>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Row>

        {/* Phần Carousel */}
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

        {/* Sản phẩm */}
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

        {/* Modal giỏ hàng */}
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
                      <Button
                        variant="outline-secondary"
                        onClick={() => decrementQuantity(item.id)}
                      >
                        -
                      </Button>
                      <span className="mx-2">{item.quantity}</span>
                      <Button
                        variant="outline-secondary"
                        onClick={() => incrementQuantity(item.id)}
                      >
                        +
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
}

export default App;
