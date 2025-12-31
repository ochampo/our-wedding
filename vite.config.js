import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // This tells Vite: "Just use relative paths for everything."
  // It works for the root domain AND any subfolder automatically.
  base: '', 
})