import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode }) => {
  // We use the environment variable to detect the PR
  const isPreview = process.env.GITHUB_EVENT_NAME === 'pull_request';

  return {
    plugins: [react()],
    // If it's a preview, we use relative paths so it works in the subfolder
    base: isPreview ? './' : '/',
  }
})