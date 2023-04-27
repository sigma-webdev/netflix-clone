import Layout from "./components/layout/Layout";
import Step1_1 from "./components/signup/Step1_1";
import Step1_2 from "./components/signup/Step1_2";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
