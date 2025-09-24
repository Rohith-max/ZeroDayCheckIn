import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Avatars from "./components/Avatars.jsx";
import HelpDesk from "./components/HelpDesk.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Avatars />} />
        <Route path="/helpdesk" element={<HelpDesk />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
