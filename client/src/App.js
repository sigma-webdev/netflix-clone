import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Browse from "./pages/Browse";
import Watch from "./pages/Watch";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/watch" element={<Watch />} />
    </Routes>
  );
}

export default App;
