import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode }) => {
  // If we are building for a PR Preview, we need a relative base path
  // so it works in the /pr-preview/pr-X/ subfolder
  const isPreview = process.env.GITHUB_EVENT_NAME === 'pull_request';

  return {
    plugins: [react()],
    base: isPreview ? './' : '/', 
  }
})