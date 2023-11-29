/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useNavigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
const ProtectedRoute = ({
  isAllowed,
  redirectPath = '/',
  children,
  user,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      // Redirect to login if not logged in
      navigate('/login');
    }

    if (!isAllowed && user?.roles[0] === 'ADMIN') {
      // Redirect to unauthorized if the user doesn't have the required roles
      navigate('/');
    }

    // Check if the user is trying to access the login page
    if (user?.roles[0] === 'USER') {
      // If the user is already logged in and trying to access the login page, redirect them to the homepage
      navigate('/unauthorized');
    }

    if (redirectPath === '/login' && isAllowed) {
      // If the user is already logged in and trying to access the login page, redirect them to the homepage
      navigate('/');
    }
  }, [user, isAllowed, navigate, redirectPath]);

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
