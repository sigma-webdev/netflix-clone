import { RouterProvider } from "react-router-dom";
import router from "./router/routes";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { GET_USER } from "./store/authSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  console.log(userData);

  useEffect(() => {
    (async () => {
      await dispatch(GET_USER());
    })();
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
