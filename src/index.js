import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './components/serviceWorker';
import App from './App';
import reportWebVitals from "./components/reportWebVitals";
import { ChakraProvider, theme } from '@chakra-ui/react'

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
    <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
serviceWorker.unregister();
