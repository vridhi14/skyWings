
import { useState } from "react";
import "./App.css";

function App() {
  const [passengers, setPassengers] = useState([
    { id: 1, name: "Passenger 1", seat: null }
  ]);

  const [selectedPassenger, setSelectedPassenger] = useState(1);

  // Add a passenger
  function addPassenger() {
    if (passengers.length < 9) {
      const newPassenger = {
        id: passengers.length + 1,
        name: `Passenger ${passengers.length + 1}`,
        seat: null
      };

      setPassengers([...passengers, newPassenger]);
    }
  }

  // Remove the last passenger
  function removePassenger() {
    if (passengers.length > 1) {
      const updatedPassengers = passengers.slice(0, -1);

      setPassengers(updatedPassengers);

      // If the selected passenger was removed,
      // select the last remaining passenger.
      if (selectedPassenger > updatedPassengers.length) {
        setSelectedPassenger(updatedPassengers.length);
      }
    }
  }

  return (
    <div className="container">
      <h1>Flight Passenger Selection</h1>

      <div className="counter">
        <button onClick={removePassenger}>−</button>

        <h2>{passengers.length} Passengers</h2>

        <button onClick={addPassenger}>+</button>
      </div>

      <div className="passenger-list">
        {passengers.map((passenger) => (
          <div
            key={passenger.id}
            className={
              selectedPassenger === passenger.id
                ? "passenger-card active"
                : "passenger-card"
            }
            onClick={() => setSelectedPassenger(passenger.id)}
          >
            <h3>{passenger.name}</h3>
            <p>ID: {passenger.id}</p>
            <p>Seat: {passenger.seat || "Not selected"}</p>
          </div>
        ))}
      </div>

      <h3>
        Currently Selected: Passenger {selectedPassenger}
      </h3>
    </div>
  );
}

export default App;
