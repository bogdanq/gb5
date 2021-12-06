import { Navigate } from "react-router-dom";

export function PrivateRoute({ isAuth, to = "/", children }) {
  return !!isAuth ? children : <Navigate to={to} replace />;
}

export function PublicRoute({ isAuth, to = "/", children }) {
  return !isAuth ? children : <Navigate to={to} replace />;
}
