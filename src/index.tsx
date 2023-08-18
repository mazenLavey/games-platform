import React from 'react';
import ReactDOM from 'react-dom/client';
import { TicTakToeProvider } from "context/TicTakToeContext";
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <TicTakToeProvider>
      <App />
    </TicTakToeProvider>
  </React.StrictMode>
);
