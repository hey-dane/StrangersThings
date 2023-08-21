import React from "react";
import { userLogout } from "../Helpers/userLogin";

export default function LogoutButton() {
  const handleLogout = () => {
    userLogout();
    window.location.ref = "/Login"; //redirect user to different page
  };

  return <button onClick={handleLogout}>Logout</button>;
}
