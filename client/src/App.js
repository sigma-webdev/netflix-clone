import { RouterProvider } from "react-router-dom";
import router from "./router/routes";
import { Toaster } from "react-hot-toast";

function App() {
  // const dispatch = useDispatch();
  // function getUser() {
  //   dispatch(GET_USER());
  // }

  // useEffect(() => {
  //   getUser();
  // }, []);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
