import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'; // Asegúrate de que index.css exista

const root = createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
