import { useState } from "react";
import axiosInstance from "../../helpers/axiosInstance";

const TestSignIn = () => {
  const [userData, setuserData] = useState({
    email: "mangesh@gmail.com",
    password: "mangesh@gmail.com",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resp = await axiosInstance.post("/auth/signin", userData);

    console.log(resp);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={"mangesh@gmail.com"}
        onChange={(e) => setuserData({ ...userData, email: e.target.value })}
      />
      <input
        type="password"
        value={"mangesh@gmail.com"}
        onChange={(e) => setuserData({ ...userData, password: e.target.value })}
      />

      <button type="submit">Login</button>
    </form>
  );
};

export default TestSignIn;
