import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { RegisterScreen } from "../../../lib/screens/auth/register/RegisterScreen";

const RegisterPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/auth/login");
  }, []);

  return <div />;
};

export default RegisterPage;
