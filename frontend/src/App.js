import React from 'react';
import Dashboard from './pages/Dashboard';
import { CommProvider } from './context/CommContext';

function App() {
  return (
    <CommProvider>
      <Dashboard />
    </CommProvider>
  );
}

export default App;
