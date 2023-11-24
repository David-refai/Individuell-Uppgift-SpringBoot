import { useContext } from 'react';
import { Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from './Auth';

const ProtectedRoute = ({ ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  if (!isAuthenticated) {
    navigate('/login');
  }
  return isAuthenticated ? <Route {...rest} /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
