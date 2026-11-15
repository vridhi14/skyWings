
import { useState } from "react";
import "./App.css";

import SeatMap from "./components/SeatMap";
import BookingSummary from "./components/BookingSummary";
import Header from "./components/Header";
import seats from "./data/seats";
import seats232 from "./data/seats232";

function App() {
  // Passenger state
  const [passengers, setPassengers] = useState([
    { id: 1, name: "Passenger 1", seat: null }
  ]);

  // Currently selected passenger
  const [selectedPassenger, setSelectedPassenger] = useState(1);

  // Aircraft configuration
  const [layout, setLayout] = useState("3-2");

  // Error message state
  const [message, setMessage] = useState("");

  // Select seat data according to aircraft layout
  const currentSeats = layout === "3-2" ? seats : seats232;

  // Add passenger
  function addPassenger() {
    if (passengers.length >= 9) {
      setMessage("Maximum 9 passengers allowed!");
      return;
    }

    const newId = Math.max(...passengers.map((p) => p.id)) + 1;

    const newPassenger = {
      id: newId,
      name: `Passenger ${newId}`,
      seat: null
    };

    setPassengers((prev) => [...prev, newPassenger]);
    setMessage("");
  }

  // Remove last passenger
  function removePassenger() {
    if (passengers.length <= 1) {
      setMessage("At least one passenger is required!");
      return;
    }

    const updatedPassengers = passengers.slice(0, -1);

    setPassengers(updatedPassengers);

    if (!updatedPassengers.some((p) => p.id === selectedPassenger)) {
      setSelectedPassenger(
        updatedPassengers[updatedPassengers.length - 1].id
      );
    }

    setMessage("");
  }

  // Find currently selected passenger
  const currentPassenger = passengers.find(
    (passenger) => passenger.id === selectedPassenger
  );

  // Assign seat to selected passenger
  function handleSeatSelect(seatId) {
    const seat = currentSeats.find((s) => s.id === seatId);

    if (!seat || seat.status === "occupied") {
      return;
    }

    const alreadyAssigned = passengers.some(
      (passenger) =>
        passenger.seat === seatId &&
        passenger.id !== selectedPassenger
    );

    if (alreadyAssigned) {
      setMessage("This seat is already assigned to another passenger!");
      return;
    }

    setPassengers((prev) =>
      prev.map((passenger) =>
        passenger.id === selectedPassenger
          ? { ...passenger, seat: seatId }
          : passenger
      )
    );

    setMessage("");
  }

  // Remove assigned seat
  function removeSeat() {
    setPassengers((prev) =>
      prev.map((passenger) =>
        passenger.id === selectedPassenger
          ? { ...passenger, seat: null }
          : passenger
      )
    );

    setMessage("");
  }

  // Change aircraft layout safely
  function handleLayoutChange(newLayout) {
    if (newLayout === layout) {
      return;
    }

    const hasAssignedSeats = passengers.some(
      (passenger) => passenger.seat !== null
    );

    if (hasAssignedSeats) {
      setMessage(
        "Please remove all assigned seats before changing aircraft layout."
      );
      return;
    }

    setLayout(newLayout);
    setMessage("");
  }

  // Calculate total seat price
  const totalPrice = passengers.reduce((total, passenger) => {
    if (!passenger.seat) {
      return total;
    }

    const seat = currentSeats.find(
      (s) => s.id === passenger.seat
    );

    return total + (seat ? seat.price : 0);
  }, 0);

  return (
    <div className="container">
      <Header />
      
      <h1>Flight Passenger Selection</h1>

      {/* Error Message */}
      {message && (
        <div className="error-message">
          <span>{message}</span>

          <button onClick={() => setMessage("")}>
            ×
          </button>
        </div>
      )}

      {/* Passenger Counter */}
      <div className="counter">

        <button
          onClick={removePassenger}
          disabled={passengers.length <= 1}
        >
          −
        </button>

        <h2>{passengers.length} Passengers</h2>

        <button
          onClick={addPassenger}
          disabled={passengers.length >= 9}
        >
          +
        </button>

      </div>

      {/* Passenger Cards */}
      <div className="passenger-list">

        {passengers.map((passenger) => (

          <div
            key={passenger.id}
            className={
              selectedPassenger === passenger.id
                ? "passenger-card active"
                : "passenger-card"
            }
            onClick={() => {
              setSelectedPassenger(passenger.id);
              setMessage("");
            }}
          >

            <h3>{passenger.name}</h3>

            <p>ID: {passenger.id}</p>

            <p>
              Seat: {passenger.seat || "Not selected"}
            </p>

          </div>

        ))}

      </div>

      {/* Selected Passenger */}
      <h3>
        Currently Selected: {currentPassenger?.name}
      </h3>

      {/* Aircraft Configuration */}
      <div className="layout-selector">

        <h3>Choose Aircraft Layout</h3>

        <button
          className={layout === "3-2" ? "active-layout" : ""}
          onClick={() => handleLayoutChange("3-2")}
        >
          3–2
        </button>

        <button
          className={layout === "2-3-2" ? "active-layout" : ""}
          onClick={() => handleLayoutChange("2-3-2")}
        >
          2–3–2
        </button>

      </div>

      {/* Seat Map */}
      <SeatMap
        seats={currentSeats}
        layout={layout}
        passengers={passengers}
        selectedPassenger={selectedPassenger}
        selectedSeat={currentPassenger?.seat}
        onSeatSelect={handleSeatSelect}
      />

      {/* Remove Assigned Seat */}
      {currentPassenger?.seat && (

        <button onClick={removeSeat}>
          Remove Assigned Seat
        </button>

      )}

      {/* Booking Summary */}
      <BookingSummary
        passengers={passengers}
        seats={currentSeats}
        totalPrice={totalPrice}
      />

    </div>
  );
}

export default App;
