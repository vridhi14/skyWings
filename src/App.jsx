import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <h1>Select your seats</h1>
        <p>
          Choose your preferred seats for a comfortable journey.
        </p>
      </main>
    </div>
  );
}

export default App;
