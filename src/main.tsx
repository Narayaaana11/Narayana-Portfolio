import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import App from './App.tsx';
import ProjectDetail from './pages/ProjectDetail.tsx';
import { ThemeProvider } from './lib/theme';
import { Cursor, Grain, EASE } from './components/ui';
import Preloader from './components/Preloader';
import './index.css';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <Routes location={location}>
          <Route path="/" element={<App />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Preloader />
        <Grain />
        <Cursor />
        <AnimatedRoutes />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
