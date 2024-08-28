module.exports = {
  apps: [
    {
      name: 'olearning-fe',
      script: 'serve',
      watch: false,
      instances: 2,
      exec_mode: 'cluster',
      env: {
        PM2_SERVE_PATH: './dist',
        PM2_SERVE_PORT: 3000,
        PM2_SERVE_SPA: 'true',
        NODE_ENV: 'production'
      }
    }
  ]
}
