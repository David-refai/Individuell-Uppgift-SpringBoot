import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from './components/Auth';
import { FileProvider } from './components/file/File';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
    <ChakraProvider>
      <AuthProvider>
        <FileProvider>
          <App />
        </FileProvider>
      </AuthProvider>
    </ChakraProvider>
    {/* </BrowserRouter> */}
  </React.StrictMode>
);
