import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { magic } from "lib/magic";

const ProtectedRoute = (props: any) => {
  const navigate = useNavigate();

  const checkLoggedIn = async () => {
    try {
      const isLoggedIn = await magic.user.isLoggedIn();
      if (isLoggedIn) {
        navigate("/profile");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return <React.Fragment>{props.children}</React.Fragment>;
};

export default ProtectedRoute;
