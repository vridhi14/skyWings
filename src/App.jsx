import Header from "./components/Header";
import PassengerCard from "./components/PassengerCard";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <h1>Select your seats</h1>

        <PassengerCard
          name="Angel"
          seat="1A"
        />

        <PassengerCard
          name="Rahul"
          seat="2B"
        />

        <PassengerCard
          name="Priya"
          seat="3C"
        />
      </main>
    </div>
  );
}

export default App;
