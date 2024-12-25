import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/encode-sans-expanded';
import '@fontsource-variable/cairo';
import  '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css'
import App from './App.jsx'
import "react-image-gallery/styles/css/image-gallery.css";
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
