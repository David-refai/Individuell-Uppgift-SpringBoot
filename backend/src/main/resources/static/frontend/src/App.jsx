/* eslint-disable react/prop-types */
import { useContext } from 'react';
import './App.css';

import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import AppLayout from '../../frontend/src/view/AppLayout';
import Home from '../../frontend/src/view/Home';
import UpdateForm from '../../frontend/src/view/UpdateForm';
import { AuthContext } from './components/Auth';
import UploadForm from '../../frontend/src/view/UploadForm';
import Users from '../../frontend/src/view/Users';
import { ModalLoginForm } from '../../frontend/src/view/ModalLoginForm';
import CreateUserForm from '../../frontend/src/view/CreateUserForm';
import { ModalRegisterForm } from '../../frontend/src/view/ModalRegisterForm';
import UnauthorizedError from '../../frontend/src/view/UnauthorizedError';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const { user } = useContext(AuthContext);

  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: '/login',
          element: (
            <ProtectedRoute isAllowed={!user} redirectPath="/" user={user}>
              <ModalLoginForm user={user} />
            </ProtectedRoute>
          ),
        },
        {
          path: '/',
          element: (
            <ProtectedRoute
              isAllowed={!!user}
              redirectPath="/login"
              user={user}
            >
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: '/register',
          element: <ModalRegisterForm />,
        },
        {
          path: '/unauthorized',
          element: <UnauthorizedError />,
        },
      ],
    },
    {
      element: (
        <ProtectedRoute
          isAllowed={
            !!user &&
            (user?.roles[0]?.includes('ROLE_ADMIN') ||
              user?.roles[0]?.includes('ADMIN'))
          }
          redirectPath="/"
          user={user}
        >
          <AppLayout>
            <CreateUserForm />
            <UploadForm />
            <UpdateForm />
            <Users user={user} />
            <ModalLoginForm />
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
        {
          path: '/login',
          element: <ModalLoginForm />,
        },
        {
          path: '/register',
          element: <ModalRegisterForm />,
        },
      ],
    },
    {
      element: (
        <ProtectedRoute
          isAllowed={
            user?.roles[0]?.includes('ROLE_USER') ||
            user?.roles[0]?.includes('USER')
          }
          redirectPath="/unauthorized"
          user={user}
        >
          <AppLayout>
            <Home />
            <ModalLoginForm />
          </AppLayout>
        </ProtectedRoute>
      ),
      children: [
        {
          path: '/login',
          element: <ModalLoginForm />,
        },
        {
          path: '/register',
          element: <ModalRegisterForm />,
        },
        {
          path: '/unauthorized',
          element: <UnauthorizedError />,
        },
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
