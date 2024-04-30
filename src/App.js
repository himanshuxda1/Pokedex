import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Pokemon from './components/Pokemon';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path= "/pokemon" element={<Pokemon/>}/>
      <Route path="/home" element={<Home />}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
