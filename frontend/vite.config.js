import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-dom': ['react-dom'],
          'react-router-dom': ['react-router-dom'],
          antd: ['antd'],
          'react-icons': ['react-icons'],
          axios: ['axios'],
          sweetalert2: ['sweetalert2'],
          daisyui: ['daisyui'],
          'js-cookie': ['js-cookie'],
          lodash: ['lodash'],
          moment: ['moment'],
          'sweetalert2-react-content': ['sweetalert2-react-content']
        }
      }
    }
  }
})
