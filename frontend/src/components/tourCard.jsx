import React from "react";
import { Card, Button, Form, ListGroup, Alert } from "react-bootstrap";
import { getTourAvailability, reserveTour } from "../api/tours.js";
import { useState } from "react";

const TourCard = ({ tour }) => {
  const [availability, setAvailability] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [userName, setUserName] = useState("");

  // revisar disponibilidad
  const handleCheckAvailability = async () => {
    try {
      const availabilityData = await getTourAvailability();
      const tourAvailability = availabilityData.filter(
        (selection) => selection.tour_id === tour.id
      );
      setAvailability(tourAvailability);
    } catch (error) {
      console.error("Error fetching tour availability:", error);
    }
  };

  // hacer reserva
  const handleReserve = async () => {};

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body className="d-flex flex-column">
        <Card.Title>{tour.name}</Card.Title>
        <Card.Text className="flex-grow-1">{tour.description}</Card.Text>
        {/* disponibilidad */}
        <div className="mb-3">
          <h6>Horarios Disponibles:</h6>
          <ListGroup className="mb-3">
            {availability.map((selection) => (
              <ListGroup.Item key={selection.id} className="p-2">
                <Form.Check
                  type="checkbox"
                  name="timeselection"
                  id={`selection-${selection.id}`}
                  label={selection.schedule_time}
                  value={selection.id}
                  checked={selectedTime === selection.id.toString()}
                  onChange={(e) => setSelectedTime(e.target.value)}
                />
              </ListGroup.Item>
            ))}
          </ListGroup>

          <Form.Group className="mb-3">
            <Form.Label>Tu nombre:</Form.Label>
            <Form.Control
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Group>

          <Button
            variant="success"
            className="w-100 mb-2"
            onClick={
              {
                /*logica reserva*/
              }
            }
          >
            Reservar
          </Button>
        </div>

        {/* hay horarios o no hay */}
        {availability && availability.length === 0 && (
          <Alert variant="info" className="mb-3">
            No hay horarios disponibles.
          </Alert>
        )}

        <div className="mt-auto">
          <Button
            variant="primary"
            className="w-100"
            onClick={handleCheckAvailability}
          >
            Ver disponibilidad
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TourCard;
