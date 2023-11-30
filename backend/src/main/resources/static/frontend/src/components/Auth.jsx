/* eslint-disable react/prop-types */

import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const API_URL = 'api/v1/';
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
   const [user, setUser] = useState(
     JSON.parse(localStorage.getItem('user')) || null
   );
  

  const isAuthenticated = () => {
    const token = getAuthToken();
    console.log('token' + token);
    if (!token) {
      return false;
    }
    const { exp } = JSON.parse(atob(token.split('.')[1]));
    if (exp < new Date().getTime() / 1000) {
      logoutUser();
      return false;
    }
    return true;
  };



  const getAuthToken = () => {
    const jwtCookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('jwt='));

    if (jwtCookie) {
      setAuthenticated(true);
    }

    return jwtCookie ? jwtCookie.split('=')[1] : null;
  };

  const registerUser = async (user) => {
    try {
      const response = await axios.post(API_URL + 'auth/register', user);
      setIsLoading(true);
      if (response) {
        setIsLoading(false);
      }
      return response.data;
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const loginUser = async (user) => {
    try {
      const response = await axios.post(API_URL + 'auth/login', user);
      const { jwt } = response.data;
      setIsLoading(true);
      const payload = JSON.parse(atob(jwt.split('.')[1]));
      let expires;

      if (typeof payload.exp === 'number') {
        expires = new Date(payload.exp * 1000);
      } else if (payload.exp === 'Session') {
        expires = new Date(2147483647000); // Set session expiration to browser close
      } else {
        console.error('Invalid expiration time in JWT');
        return;
      }

      document.cookie = `jwt=${jwt}; expires=${expires.toUTCString()}; SameSite=None; Secure; OnlyHttp;`;

      const userInfo = response.data.user;
      localStorage.setItem('user', JSON.stringify(userInfo));
      setUser(userInfo);
      setIsLoading(true);
      setAuthenticated(true);
      if (response) {
        setIsLoading(false);
      }
      return response.data;
    } catch (error) {
      console.error('Error during login:', error);
      setError(error.response?.data.message);
    }
  };

  const logoutUser = async () => {
    const token = getAuthToken();

    try {
      await axios.post(
        API_URL + 'auth/logout',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsLoading(true);

      localStorage.removeItem('user');
      document.cookie =
        'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; SameSite=None;';
      setUser(null);
      setAuthenticated(false);
      if (!token) {
        setIsLoading(false);
      }
      window.location.reload();
    } catch (error) {
      console.error('Error during logout:', error);
      setError(error.response?.data.message);
    }
  };

  const updateUser = async (user) => {
    try {
      setIsLoading(true);
      const token = getAuthToken();
      const response = await axios.put(API_URL + "users/" + user.id, user, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
    

      //  get id from user local storage
      const userId = JSON.parse(localStorage.getItem('user')).id;
      // update user in local storage if the user is updating their own profile
      if (userId === user.id) {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
      }
      setIsLoading(false);
      return response.data;
    } catch (error) {
      console.error('Error during user update:', error);
      setError(error.response?.data.message);
    }
  };

  const getAllUsers = async () => {
    try {
      setIsLoading(true);
      const token = getAuthToken();
      const response = await axios.get(API_URL + 'users/all', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      setIsLoading(false);
      return response.data;
    } catch (error) {
      console.error('Error during user update:', error);
      setError(error.response?.data.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      setIsLoading(true);
      const token = getAuthToken();
      const response = await axios.delete(API_URL + 'users/' + id, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      getAllUsers();
      setIsLoading(false);
      return response.data;
    } catch (error) {
      console.error('Error during user update:', error);
      setError(error.response?.data.message);
    }
  };

  const getUserById = async (id) => {
    try {
      setIsLoading(true);
      const token = getAuthToken();
      if (token) {
        const response = await axios.get(API_URL + '/users/' + id, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        setIsLoading(false);
        return response.data;
      }
      return null;
    } catch (error) {
      console.error('Error during user update:', error);
      setError(error.response?.data.message);
    }
  };

  // ... (other code)

  useEffect(() => {
    setIsLoading(false);
    if (authenticated) {
      setToken(getAuthToken());
    }
  }, [authenticated, setIsLoading, setToken]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loginUser,
        logoutUser,
        isLoading,
        updateUser,
        registerUser,
        authenticated,
        getAllUsers,
        deleteUser,
        getUserById,
        isAuthenticated,
        getAuthToken,
        token,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
