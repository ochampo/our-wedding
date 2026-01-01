import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 1. Detect if we are in a GitHub Action Pull Request
  // GitHub sets GITHUB_EVENT_NAME to 'pull_request' automatically
  const isPreview = process.env.GITHUB_EVENT_NAME === 'pull_request';
  
  // 2. Get the PR number from the Ref (e.g., 'refs/pull/1/merge' -> '1')
  const prNumber = process.env.GITHUB_REF ? process.env.GITHUB_REF.split('/')[2] : '';

  return {
    plugins: [react()],
    // 3. Set thse base path
    // If it's a PR: /pr-preview/pr-1/
    // If it's live: /
    base: isPreview ? `/pr-preview/pr-${prNumber}/` : '/',
  }
})