/* eslint-disable react/prop-types */

import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Auth';

export const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const API_URL = 'api/v1/file/';

  const [authenticated, setAuthenticated] = useState(false);
  const { logoutUser, getAuthToken } = useContext(AuthContext);

  const uploadFiles = async (file) => {
    try {
      const token = getAuthToken();
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post(API_URL + 'upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Content-Length': formData.length,
          Authorization: `Bearer ${token}`,
        },
      });
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(response.data);
        }, 1000);
      });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const fetchFiles = async () => {
    const response = await axios.get(API_URL + 'all');
    setIsLoading(false);
    return response.data;
  };

  const downloadFile = async (fileId) => {
    const response = await axios.get(API_URL + 'download/' + fileId, {
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    setIsLoading(false);
    return response.data;
  };

  const deleteFile = async (fileId) => {
    const response = await axios.delete(API_URL + 'delete-file/' + fileId, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    setIsLoading(false);
    return response.data;
  };

  const getFileById = async (fileId) => {
    const response = await axios.get(API_URL  + fileId, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  };

  useEffect(() => {
    setIsLoading(false);
  }, [authenticated]);

  return (
    <FileContext.Provider
      value={{
        setAuthenticated,
        logoutUser,
        uploadFiles,
        downloadFile,
        getAuthToken,
        fetchFiles,
        getFileById,
        deleteFile,
        isLoading,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};
