import { RouterProvider } from "react-router-dom";
import router from "./router/routes";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { GET_USER } from "./store/authSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GET_USER());
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
