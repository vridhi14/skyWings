import { useState } from "react";

function App() {

  const [count, setCount] = useState(1);

  return (
    <div>
      <h1>Passenger Selection</h1>

      <h2>Passengers: {count}</h2>

      <button onClick={() => setCount(count + 1)}>
        Add Passenger
      </button>

      <button onClick={() => setCount(count - 1)}>
        Remove Passenger
      </button>

    </div>
  );
}

export default App;
