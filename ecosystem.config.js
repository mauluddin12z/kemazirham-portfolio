module.exports = {
  apps: [
    // 1. Next.js Frontend Application
    {
      name: "kemazirham",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3002",
      cwd: "./",
      instances: "1",
      exec_mode: "cluster",
      autorestart: true,
      max_memory_restart: "1G",
      restart_delay: 4000,
      exp_backoff_restart_delay: 100,
      watch: false,
      env: {
        NODE_ENV: "development",
        PORT: 3002,
        STRAPI_URL: "http://127.0.0.1:5002",
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3002,
        STRAPI_URL: "http://127.0.0.1:5002",
      },
      error_file: "./logs/frontend-error.log",
      out_file: "./logs/frontend-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      merge_logs: true,
    },

    // 2. Strapi Headless CMS Backend
    {
      name: "kemazirham-cms",
      cwd: "./cms",
      script: "npm",
      args: "run start",
      instances: 1,
      autorestart: true,
      max_memory_restart: "1G",
      restart_delay: 4000,
      watch: false,
      env: {
        NODE_ENV: "development",
        PORT: 5002,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 5002,
      },
      error_file: "./logs/cms-error.log",
      out_file: "./logs/cms-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      merge_logs: true,
    },
  ],

  // Konfigurasi PM2 Auto Deploy ke VPS / Server
  deploy: {
    production: {
      user: "root",
      host: "YOUR_SERVER_IP",
      ref: "origin/main",
      repo: "git@github.com:mauluddin12z/kemazirham-portfolio.git",
      path: "/var/www/kemazirham",
      "pre-deploy-local": "",
      "post-deploy":
        "npm install && npm run build && cd cms && npm install && npm run build && cd .. && pm2 reload ecosystem.config.js --env production --update-env && pm2 save",
      "pre-setup": "",
      env: {
        NODE_ENV: "production",
      },
    },
  },
};
