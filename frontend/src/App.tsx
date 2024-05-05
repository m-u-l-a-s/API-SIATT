import { BrowserRouter as Router } from "react-router-dom";
import './App.css'
import Navbar from './components/Navbar';
import { Rotas } from './routes/Rotas';
import { AuthProvider } from "./context/auth";

function App() {

  return (
    <AuthProvider>
      <Router>
        <div className="test">
          <Navbar />
          <Rotas />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
