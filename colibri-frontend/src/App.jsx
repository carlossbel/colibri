import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Historial from "./pages/Historial";

function App() {
  return (
    <BrowserRouter>
      <nav className="bg-green-600 text-white p-4 flex gap-4">

        <Link to="/home">Home</Link>
        <Link to="/historial">Historial</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/historial" element={<Historial />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
