import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => {
  return {
    plugins: [react()],
    // Use relative paths (./) when building for production.
    // This allows the site to work at lorraineanddaniel.com/ AND 
    // lorraineanddaniel.com/pr-preview/pr-2/ automatically.
    base: command === 'build' ? './' : '/',
  }
})