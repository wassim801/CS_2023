import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Suppliers() {
    const handleOpenTab = () => {
        window.open('http://localhost:3001/signup', '_blank');
      };
  return (
    <>
 <div className="bg-light py-5">
      <Container>
        <Row>
          <Col md={6} className="text-center text-md-left">
            <h1 className="mb-3">Become a Supplier</h1>
            <p className="lead mb-5">Our platform connects suppliers with buyers, giving you access to a wide audience and helping you grow your business.</p>
            <ul className="list-unstyled">
              <li><i className="bi bi-check"></i> Showcase your products to a large audience</li>
              <li><i className="bi bi-check"></i> Expand your customer base and increase sales</li>
              <li><i className="bi bi-check"></i> Connect with other businesses in your industry</li>
              <li><i className="bi bi-check"></i> Access our platform's tools and resources for sellers</li>
            </ul>
            <Button style={{zIndex:"100"}} onClick={handleOpenTab}>L'ets Start</Button>

          </Col>
          <Col md={6} className="d-none d-md-block">
          <img src="/images/affiche.jpg" alt="Supplier" className="img-fluid" />
          </Col>
        </Row>
      </Container>
    </div>    </>
  )
}

export default Suppliers