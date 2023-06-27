import { useSelector } from "react-redux";
import React from "react";
import  {Outlet} from 


function RequiredAuth() {

  const IS_LOGGED_IN = useSelector((state) => state.auth.iSLoggedIn);
  const USER_DATA = useSelector((state) => state.auth.userData);
  const role = USER_DATA.role;

  if (IS_LOGGED_IN && role === "USER") {
     
     }
     
  return;
}

export default RequiredAuth;
