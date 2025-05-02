// frontend/src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { registerLicense } from '@syncfusion/ej2-base';  // ← new

import './App.css';
import App from './App';

// ← add your license key here:
registerLicense('ORg4AjUWIQA/Gnt2XFhhQlJHfVpdX2ZWfFN0QHNQdVpwflZHcC0sT3RfQFhjTXxad0FhXX9ZeXFXQmteWA==');

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Root container not found');
ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
