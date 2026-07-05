import React from "react";
import Login from "../../features/Login/Login";
import AuthShell from "./AuthShell";

const LoginPage = () => {
  return (
    <AuthShell>
      <Login />
    </AuthShell>
  );
};

export default LoginPage;
