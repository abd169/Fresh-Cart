// <<<<<<< HEAD
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/encode-sans-expanded';
import '@fontsource-variable/cairo';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
// =======
// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import '@fontsource/encode-sans-expanded';
// import '@fontsource-variable/cairo';
// import  '@fortawesome/fontawesome-free/css/all.min.css'
// import './index.css'
// import App from './App.jsx'
// import "react-image-gallery/styles/css/image-gallery.css";
// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// )
// Ensure the application's configuration is updated and paths are consistent.
// Change the main entry point from main.tsx to main.jsx.

// Update in vite.config.js or other build tools:
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    rollupOptions: {
      input: '/src/main.jsx', // Update this path to reflect the new file extension.
    },
  },
});

// Verify the entry file (index.html or similar):
<script type="module" src="/src/main.jsx"></script>

// Update main.jsx (ensure TypeScript features are removed or adapted):

import { createRoot } from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
} else {
  console.error('Root element not found!');
}
// >>>>>>> c1591b1 (Save current progress before pull)
