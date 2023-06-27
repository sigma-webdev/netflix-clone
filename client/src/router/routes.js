import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home.jsx";
import SignIn from "../pages/SignIn.jsx";
import Registration from "../components/signUp/Registration.jsx";
import SignUp from "../pages/SignUp.jsx";

const router = createBrowserRouter([
  // accessible for everyone without login
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/signin",
    element: <SignIn />
  },
  {
    path: "/signup",
    children: [
      {
        path: "/signup/registration",
        element: <SignUp page="REGISTRATION" />
      },
      {
        path: "/signup/regform",
        element: <SignUp page="REG_FORM" />
      },
      {
        path: "/signup/password",
        element: <SignUp page="REG_FORM" />
      }
    ]
  },

  {
    element: <RequireAuth />,
    children: [
      {
        path: "signup/choose",
        element: <signUp page="CHOOSE" />
      }
    ]
  }
]);

export default router;
