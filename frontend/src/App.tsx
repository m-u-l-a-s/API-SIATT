// import { useState } from 'react'
import "./App.css";
import Navbar from "./components/Navbar";
import { Rotas } from "./pages/Rotas";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Router>
      <div className="test">
        <Navbar />

        <Rotas />
      </div>
    </Router>
  );
}

export default App;
