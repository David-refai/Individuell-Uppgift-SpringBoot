import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, authenticated, ...rest }) => {
  return authenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
