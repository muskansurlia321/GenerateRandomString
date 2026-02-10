import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// Vite configuration for a React app using JavaScript
export default defineConfig({
  plugins: [react()]
});

