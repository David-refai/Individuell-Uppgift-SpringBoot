/* eslint-disable react/prop-types */

import axios from 'axios';
import { createContext, useEffect, useState } from 'react';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const API_URL = 'api/v1/auth/';
const [isLoading, setIsLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

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

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );

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
      const response = await axios.post(API_URL + 'register', user);
      setIsLoading(true);
      if (response) {
        setIsLoading(false);
      }
      return response.data;
    } catch (error) {
      console.error('Error during registration:', error.response.data.message);
      throw error;
    }
  };

  const loginUser = async (user) => {
    try {
      const response = await axios.post(API_URL + 'login', user);
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
      setCurrentUser(userInfo);
      setIsLoading(true);
      setAuthenticated(true);
      if (response) {
        setIsLoading(false);
      }
      return response.data;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  const logoutUser = async () => {
    const token = getAuthToken();

    try {
      await axios.post(
        API_URL + 'logout',
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
      setCurrentUser(null);
      setAuthenticated(false);
      if (!token) {
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  };

  const updateUser = async (user) => {
    try {
      const token = getAuthToken();
      const response = await axios.put(
        `http://localhost:8080/api/v1/users/${user.id}`,
        user,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
        setIsLoading(true);
      // update user in local storage if the user is updating their own profile
      if (user.id === currentUser.id) {
        localStorage.setItem('user', JSON.stringify(user));
        setCurrentUser(user);
      }
      setIsLoading(false);
      return response.data;
    } catch (error) {
      console.error('Error during user update:', error);
      throw error;
    }
  };

  const getAllUsers = async () => {
    try {
      const token = getAuthToken();
      const response = await axios.get('http://localhost:8080/api/v1/users', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      setIsLoading(true);
      return response.data;
    } catch (error) {
      console.error('Error during user update:', error);
      throw error;
    }
  };

  const deleteUser = async (id) => {
    try {
      const token = getAuthToken();
      const response = await axios.delete(
        `http://localhost:8080/api/v1/users/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getAllUsers();
      return response.data;
    } catch (error) {
      console.error('Error during user update:', error);
      throw error;
    }
  };

  const getUserById = async (id) => {
    try {
      const token = getAuthToken();
      if (token) {
        const response = await axios.get(
          `http://localhost:8080/api/v1/users/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
      }
      return null;
    } catch (error) {
      console.error('Error during user update:', error);
      throw error;
    }
  };

  // ... (other code)

  useEffect(() => {
    setIsLoading(false);
    if (authenticated) {
      setToken(getAuthToken());
    }
  }, [currentUser, authenticated]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
