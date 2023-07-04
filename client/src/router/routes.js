import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home.jsx";
import SignUp from "../pages/SignUp/SignUp.js";
import Browse from "../pages/Browse";
import Admin from "../pages/Admin";
import Watch from "../pages/Watch";
import PlanForm from "../pages/SignUp/PlanForm.js";
import UserRegistration from "../pages/SignUp/UserRegistration.js";
import CheckPlan from "../pages/SignUp/CheckPlan.js";
import PaymentSuccess from "../pages/SignUp/PaymentSuccess.js";
import PaymentFail from "../pages/SignUp/PaymentFail.js";
import AdminDashboard from "../components/admin/AdminDashboard.jsx";
import AdminManageUsers from "../components/admin/AdminManageUsers.jsx";
import AdminManageContents from "../components/admin/AdminManageContents.jsx";
import TestSignIn from "../pages/temp/signin.jsx";
import AdminContentView from "../components/admin/AdminContentView.jsx";

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
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "/admin/dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/admin/manageusers",
        element: <AdminManageUsers />,
      },
      {
        path: "/admin/managecontents",
        element: <AdminManageContents />,
      },
      {
        path: "/admin/managecontents/:contentId",
        element: <AdminContentView />,
        children: [],
      }
    ],
  },
  {
    path: "/test/signin",
    element: <TestSignIn />,
    children: [],
  },
]);

export default router;
