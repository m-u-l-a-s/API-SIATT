// import { useState } from 'react'
import './App.css'
import { Rotas } from './pages/Rotas';
import { BrowserRouter as Router } from 'react-router-dom';




function App() {
  // const [count, setCount] = useState(0)

  return (
   
    <Router>
      <div className='test'>
        <Rotas />
      </div>
    </Router>
  );
};

export default App;
