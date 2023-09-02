import { Route, Navigate } from "react-router-dom";
export const PrivateRoute = ({ children, ...rest }) => {
//   const authenticated = false;
console.log(children)
  return (
    <Route {...rest}>
        {children}
      {/* {!authenticated ? <Navigate to="/login" /> : children} */}
    </Route>
  );
};


export default PrivateRoute;
