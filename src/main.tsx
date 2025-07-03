import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { AuthProvider } from '@/contexts/AuthContext.tsx';
import { FavoriteProvider } from '@/contexts/FavoriteContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <FavoriteProvider>
        <App />
      </FavoriteProvider>
    </AuthProvider>
  </StrictMode>,
);
