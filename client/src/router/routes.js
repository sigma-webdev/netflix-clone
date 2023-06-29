import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home.jsx";
import SignUp from "../pages/SignUp/SignUp.js";
import Browse from "../pages/Browse";
import Watch from "../pages/Watch";
import PlanForm from "../pages/SignUp/PlanForm.js";
import UserRegistration from "../pages/SignUp/UserRegistration.js";
import CheckPlan from "../pages/SignUp/CheckPlan.js";
import PaymentSuccess from "../pages/SignUp/PaymentSuccess.js";
import PaymentFail from "../pages/SignUp/PaymentFail.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    children: [],
  },
  {
    path: "/signup/registration",
    element: <UserRegistration />,
  },
  {
    path: "/signup/checkplan",
    element: <CheckPlan />,
  },
  {
    path: "/signup/planform",
    element: <PlanForm />,
  },
  {
    path: "/signup/paymentSuccess",
    element: <PaymentSuccess />,
  },
  {
    path: "/signup/paymentfail",
    element: <PaymentFail />,
  },
  {
    path: "/browse",
    element: <Browse />,
    children: [],
  },
  {
    path: "/watch/:contentId",
    element: <Watch />,
    children: [],
  },
]);

export default router;
