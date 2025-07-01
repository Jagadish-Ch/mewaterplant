import { Navigate, useLocation } from "react-router-dom";
import { Fragment, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function RouteGuard({ element }) {
  const location = useLocation();
  const { auth, lang, setLang } = useContext(AuthContext);


  console.log(auth?.authenticate, auth?.user, "useruser");
  console.log(location.pathname.includes("/auth"))

  if (!auth?.authenticate && !location.pathname.includes("/auth")) {
    return <Navigate to="/auth" />;
  }

  if (
    (auth?.authenticate &&
    auth?.user?.role === "user" &&
    (location.pathname.includes("/auth") || location.pathname.includes("/forgot")) 
  )
  ) {
    return <Navigate to="/" />;
  }

  return <Fragment>{element}</Fragment>;
}

export default RouteGuard;