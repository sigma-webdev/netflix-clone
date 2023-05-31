import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SignIn from "./pages/Signin.jsx";
import Signup from "./pages/Signup.jsx";
import Browse from "./pages/Browse";
import Watch from "./pages/Watch";
import Admin from "./pages/Admin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/watch" element={<Watch />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
