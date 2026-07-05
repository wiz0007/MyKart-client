import React from "react";
import Signup from "../../features/Login/Signup";
import AuthShell from "./AuthShell";

const SignupPage = () => {
  return (
    <AuthShell>
      <Signup />
    </AuthShell>
  );
};

export default SignupPage;
