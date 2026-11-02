module.exports = {
  apps: [
    {
      name: "kemazirham",
      // Menggunakan bin Next.js langsung untuk efisiensi resource & cluster mode
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3002",
      cwd: "./",

      // Auto Restart & Clustering
      instances: "max", // Menyesuaikan jumlah core CPU (atau isi angka 1 untuk VPS kecil)
      exec_mode: "cluster",
      autorestart: true, // Auto restart jika aplikasi crash
      max_memory_restart: "1G", // Auto restart jika memori melewati 1GB
      restart_delay: 4000, // Menghindari loop restart terlalu cepat jika ada error
      exp_backoff_restart_delay: 100,

      // Watcher: dimatikan untuk production agar tidak restart loop akibat build
      watch: false,

      // Environment variables
      env: {
        NODE_ENV: "development",
        PORT: 3002,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3002,
      },

      // Logging
      error_file: "./logs/pm2-error.log",
      out_file: "./logs/pm2-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      merge_logs: true,
    },
  ],

  // Konfigurasi PM2 Auto Deploy ke VPS / Server
  deploy: {
    production: {
      user: "root", // User SSH di VPS Anda (contoh: ubuntu / root)
      host: "YOUR_SERVER_IP", // IP Address Server/VPS Anda
      ref: "origin/main", // Branch git yang dideploy
      repo: "git@github.com:mauluddin12z/kemazirham-portfolio.git",
      path: "/var/www/kemazirham",
      "pre-deploy-local": "",
      // Perintah otomatis saat deploy berjalan di server:
      "post-deploy":
        "npm install && npm run build && pm2 reload ecosystem.config.js --env production && pm2 save",
      "pre-setup": "",
      env: {
        NODE_ENV: "production",
      },
    },
  },
};
