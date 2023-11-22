/* eslint-disable react/prop-types */
import { useContext } from 'react';
import './App.css';
import RegistrationForm from './view/RegistrationForm';
import LoginForm from './view/LoginForm';
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

function App() {
  const { currentUser, authenticated } = useContext(AuthContext);
  console.log(currentUser);
  console.log(authenticated);



  const router = createBrowserRouter([
    // Public routes
    {
      element: <AppLayout currentUser={currentUser} />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/login',
          element: <LoginForm />,
        },
      ],
    },

    // Admin-specific routes

    {
      element: (
        <ProtectedRoute
          
          isAllowed={
            (!!currentUser && currentUser?.roles?.includes('ROLE_ADMIN')) ||
            currentUser?.roles?.includes('ADMIN')
          }
        >
          <AppLayout currentUser={currentUser}>
            <RegistrationForm />
            <UploadForm />
            <UpdateForm />
            <Users />
          </AppLayout>
        </ProtectedRoute>
      ),
      children: [
        {
          path: '/create-users',
          element: <RegistrationForm />,
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
          // loader: () => import('./view/Users'),
        },
        // delete user
        {
          path: '/delete/:id',
          element: <Users/>,
        },
      ],
    },

    // User-specific routes
    // {
    //   element: (
    //     <ProtectedRoute
    //       isAllowed={!!currentUser && currentUser.roles.includes('USER')}
    //     >
    //       <AppLayout />
    //     </ProtectedRoute>
    //   ),
    // children: [
    //   {
    //     path: '/user/profile',
    //     element: <Profile />,
    //   },
    //   {
    //     path: '/user/settings',
    //     element: <Settings />,
    //   },
    // ],
    // },

    // Catch-all route for invalid paths
    {
      path: '/*',
      element: <Navigate to="/" />,
    },
  ]);

  return <RouterProvider router={router} />;

  //     //  <AppLayout currentUser={currentUser}>
  //        <Routes>
  //          <Route index element={<AppLayout currentUser={currentUser} />} />
  //          <Route path="login" element={<LoginForm />} />
  //        <Route path="upload" element={<UploadForm />} />

  //          <Route element={<ProtectedRoute isAllowed={!!currentUser} />}>
  //            <Route path="register" element={<RegistrationForm />} />
  //            <Route
  //              path="update/:id"
  //              element={<UpdateForm currentUser={currentUser} />}
  //            />
  //          </Route>
  //          <Route
  //            path="register"
  //            element={
  //              <ProtectedRoute
  //                redirectPath="/"
  //                isAllowed={
  //                  !!currentUser && currentUser.permissions?.includes('USER')
  //                }
  //              >
  //                <Home />
  //              </ProtectedRoute>
  //            }
  //          />
  //          <Route
  //            path="admin"
  //            element={
  //              <ProtectedRoute
  //                redirectPath="/home"
  //                isAllowed={!!currentUser && currentUser.roles.includes('ADMIN')}
  //              >
  //                <Home />
  //              </ProtectedRoute>
  //            }
  //          />
  //          <Route path="*" element={<Navigate to="/" />} />
  //        </Routes>
  //     //  </AppLayout>
  //    );
}

export default App;

// const ProtectedRoute = ({ isAllowed, redirectPath = '/', children }) => {
//   if (!isAllowed) {
//     //   return (
//     //     <div
//     //       style={{
//     //         display: 'flex',
//     //         justifyContent: 'center',
//     //         alignItems: 'center',
//     //         fontSize: '2rem',
//     //         height: '100vh',
//     //         flexDirection: 'column',
//     //       }}
//     //     >
//     //       <h1>Access Denied</h1>
//     //       <p>You are not authorized to access this page.</p>
//     //       <p>
//     //         Please log in with an administrator account to access admin-only
//     //         pages.
//     //       </p>
//     //     </div>
//     //   );
//     // }
//     if (isAllowed) return <Navigate to={redirectPath} replace />;
//     return <Navigate to="/login" replace />;
//   }

//   return children ? children : <Outlet />;
// };
const ProtectedRoute = ({ isAllowed, redirectPath = '/', children }) => {
  if (!isAllowed) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
};
