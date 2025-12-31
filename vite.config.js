import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode }) => {
  // Check if this is a GitHub Actions environment
  const isPreview = process.env.GITHUB_EVENT_NAME === 'pull_request';
  
  return {
    plugins: [react()],
    // If it's a preview, use relative paths ('./') 
    // If it's the live site, use the root ('/')
    base: isPreview ? './' : '/', 
  }
})