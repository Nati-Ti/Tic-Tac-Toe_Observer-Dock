import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // This allows the server to be accessed externally
    port: 5173, // This ensures the server runs on port 5173
  },
})
