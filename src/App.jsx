import { useState } from "react";
import "./App.css";

function App() {
  const [passengers] = useState([
    { id: 1, name: "Passenger 1" },
    { id: 2, name: "Passenger 2" },
    { id: 3, name: "Passenger 3" }
  ]);

  const [selectedPassenger, setSelectedPassenger] = useState(1);

  return (
    <div className="container">
      <h1>Select Passenger</h1>

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
          </div>
        ))}
      </div>

      <h2>
        Currently Selected: Passenger {selectedPassenger}
      </h2>
    </div>
  );
}

export default App;
