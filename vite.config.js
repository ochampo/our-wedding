import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode }) => {
  // Check if this is a PR build inside GitHub Actions
  const isPreview = process.env.GITHUB_EVENT_NAME === 'pull_request';
  const prNumber = process.env.GITHUB_REF ? process.env.GITHUB_REF.split('/')[2] : '';

  return {
    plugins: [react()],
    // This is the magic line:
    // It makes your app work at 'lorraineanddaniel.com/pr-preview/pr-X/'
    base: isPreview ? `/pr-preview/pr-${prNumber}/` : '/',
    build: {
      outDir: 'dist',
    }
  }
})