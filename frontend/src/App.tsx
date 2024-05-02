import { BrowserRouter as Router } from "react-router-dom";
import './App.css'
import Navbar from './components/Navbar';
import { Rotas } from './pages/Rotas';

function App() {

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
