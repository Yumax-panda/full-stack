import path from 'path'

import react from '@vitejs/plugin-react'
import { defineWorkspace, defineConfig, mergeConfig } from 'vitest/config'

const baseConfig = defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~': path.resolve(__dirname, './src'),
    },
  },
})

const clientConfig = defineConfig({
  plugins: [react()],
  test: {
    root: './src/__tests__/client',
    name: 'client',
    environment: 'happy-dom',
  },
})

const serverConfig = defineConfig({
  test: {
    root: './src/__tests__/server',
    name: 'server',
    environment: 'node',
    setupFiles: ['setup.ts'],
  },
})

const sharedConfig = defineConfig({
  plugins: [react()],
  test: {
    root: './src/__tests__/shared',
    name: 'shared',
    environment: 'happy-dom',
    setupFiles: ['setup.ts'],
  },
})

const databaseConfig = defineConfig({
  test: {
    root: './src/__tests__/database',
    name: 'database',
    environment: 'node',
    setupFiles: ['seed.ts'],
  },
})

export default defineWorkspace([
  mergeConfig(baseConfig, clientConfig),
  mergeConfig(baseConfig, serverConfig),
  mergeConfig(baseConfig, sharedConfig),
  mergeConfig(baseConfig, databaseConfig),
])
