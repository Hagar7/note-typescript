import React from "react";
import { useAppSelector } from "../../store/hooks";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element | null => {
  const { authUser } = useAppSelector((state) => state.auth);
  if (authUser == null && localStorage.getItem("token") == null) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
