/* eslint-disable react/prop-types */
import { useContext } from 'react';
import './App.css';

import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import AppLayout from './view/AppLayout';
import Home from './view/Home';
import UpdateForm from './view/UpdateForm';
import { AuthContext } from './components/Auth';
import UploadForm from './view/UploadForm';
import Users from './view/Users';
import { ModalLoginForm } from './view/ModalLoginForm';
import CreateUserForm from './view/CreateUserForm';
import { ModalRegisterForm } from './view/ModalRegiserForm';
import UnauthorizedError from './view/UnauthorizedError';

const App = () => {
  const { currentUser } = useContext(AuthContext);
console.log(currentUser?.roles[0]);
  const router = createBrowserRouter([
    {
      element: <AppLayout currentUser={currentUser} />,
      children: [
        {
          path: '/',
          element: <Home currentUser={currentUser} />,
        },

        {
          path: '/unauthorized',
          element: <UnauthorizedError />,
        },
        {
          path: '/error',
          element: <UnauthorizedError />,
        },
        {
          path: '/*',
          element: <Navigate to="/error" />,
        },
      ],
    },

    {
      path: '/login',
      element: <ModalLoginForm />,
    },
    {
      path: '/register',
      element: <ModalRegisterForm />,
    },
    {
      // path: '/login',
      element: (
        <ProtectedRoute
          isAllowed={
            !!currentUser &&
            (currentUser?.roles[0]?.includes('ROLE_ADMIN') ||
              currentUser?.roles[0]?.includes('ADMIN'))
          }
          redirectPath="/"
          currentUser={currentUser}
        >
          <AppLayout currentUser={currentUser}>
            <CreateUserForm />
            <UploadForm />
            <UpdateForm />
            <Users currentUser={currentUser} />
          </AppLayout>
        </ProtectedRoute>
      ),
      children: [
        {
          path: '/create-users',
          element: <CreateUserForm />,
        },
        {
          path: '/upload',
          element: <UploadForm />,
        },
        {
          path: '/update/:id',
          element: <UpdateForm />,
        },
        {
          path: '/users',
          element: <Users />,
        },
        {
          path: '/delete/:id',
          element: <Users />,
        },
      ],
    },
    {
      element: (
        <ProtectedRoute
          isAllowed={
            !!currentUser &&
            (currentUser?.roles[0]?.includes('ROLE_USER') ||
              currentUser?.roles[0]?.includes('USER'))
          }
          redirectPath="/unauthorized"
          currentUser={currentUser}
        >
          <AppLayout currentUser={currentUser}>
            <Home />
          </AppLayout>
        </ProtectedRoute>
      ),
      children: [
        {
          path: '/',
          element: <Home />,
        },
      ],
    },
    {
      path: '/*',
      element: <Navigate to="/error" />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;



const ProtectedRoute = ({ isAllowed, redirectPath = '/', children, currentUser }) => {

 
    if (!currentUser) {
      // Redirect to login if not logged in
      return <Navigate to="/login" replace />;
    }

    if (!isAllowed) {
      // Redirect to unauthorized if the user doesn't have the required roles
      return <Navigate to="/unauthorized" replace />;
    }

  if (currentUser && redirectPath === '/login' && isAllowed) {

    // Redirect to home page if logged in
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

