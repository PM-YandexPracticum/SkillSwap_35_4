import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
//import App from './app/App.tsx';
import './index.scss';
import { Header } from './components/header/Header.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Header/>
    </BrowserRouter>
  </StrictMode>,
);
