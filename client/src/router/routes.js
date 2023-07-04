import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home.jsx";
import SignUp from "../pages/SignUp/SignUp.jsx";
import Browse from "../pages/Browse";
import Admin from "../pages/Admin";
import Watch from "../pages/Watch";
import PlanForm from "../pages/SignUp/PlanForm.jsx";
import UserRegistration from "../pages/SignUp/UserRegistration.jsx";
import CheckPlan from "../pages/SignUp/CheckPlan.jsx";
import PaymentSuccess from "../pages/SignUp/PaymentSuccess.jsx";
import PaymentFail from "../pages/SignUp/PaymentFail.jsx";
import AdminDashboard from "../components/admin/AdminDashboard.jsx";
import AdminManageUsers from "../components/admin/AdminManageUsers.jsx";
import AdminManageContents from "../components/admin/AdminManageContents.jsx";
import TestSignIn from "../pages/temp/signin.jsx";
import AdminContentView from "../components/admin/AdminContentView.jsx";
import SignIn from "../pages/SignIn/SignIn.jsx";
import UserExistLogin from "../pages/SignIn/UserExistLogin.jsx";
import Logout from "../pages/SignIn/Logout.jsx";
import ForgotPassword from "../pages/SignIn/ForgetPassword.jsx";
import SignInHelp from "../pages/SignIn/SignInHelp.jsx";
import ResetPassword from "../pages/SignIn/ResetPassword.jsx";
import NotRequireAuth from "../helpers/auth/NotRequireAuth.jsx";
import RequireAuth from "../helpers/auth/RequireAuth.jsx";
import NotFound from "../pages/NotFound.jsx";

const router = createBrowserRouter([
  // for open routes
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },

  // for routes that do not require auth
  {
    element: <NotRequireAuth />,
    children: [
      {
        path: "/signup",
        element: <SignUp />,
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
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signin/:email",
        element: <UserExistLogin />,
      },
      {
        path: "/password/forget",
        element: <ForgotPassword />,
      },
      {
        path: "/password/forget/:email",
        element: <SignInHelp />,
      },
      {
        path: "/reset-password/:token",
        element: <ResetPassword />,
      },
    ],
  },

  // for routes which are for admin and normal user both
  {
    element: <RequireAuth allowedRoles={["ADMIN", "USER"]} />,
    children: [
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
    ],
  },

  // for routes which are for admin user
  {
    element: <RequireAuth allowedRoles={["ADMIN"]} />,
    children: [
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
          },
        ],
      },
    ],
  },

  // for test route
  {
    path: "/test/signin",
    element: <TestSignIn />,
    children: [],
  },
]);

export default router;