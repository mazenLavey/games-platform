import React from 'react';
import ReactDOM from 'react-dom/client';
import { TicTakToeProvider } from "context/TicTakToeContext";
import { BlackjackProvider } from 'context/BlackjackContext';
import App from './app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <TicTakToeProvider>
      <BlackjackProvider>
        <App />
      </BlackjackProvider>
    </TicTakToeProvider>
  </React.StrictMode>
);
