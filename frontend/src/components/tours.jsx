import React from "react";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import TourCard from "./tourCard.jsx";
import { getTours } from "../api/tours.js";

const Tours = () => {
  const [tour, setTours] = useState([]);
  //obtener tour de apis
  const fetchTours = async () => {
    try {
      const data = await getTours();
      setTours(data);
    } catch (error) {
      console.error("Error fetching tours in component:", error);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Tours Disponibles</h1>

      {/* tarjeta de tour */}
      <Row>
        {tour.map((tour) => (
          <Col key={tour.id} md={6} lg={4} className="mb-4">
            <TourCard tour={tour} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Tours;
