const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack: (config, { dev }) => {
    // Phaser webpack config
    config.module.rules.push({
      test: [/\.vert$/, /\.frag$/],
      use: "raw-loader",
    });
    
    return config;
  },
  output:"export",
  
  images: {
    unoptimized: true,
  },
  basePath: '/gaming-website',
  env: {
    HOST_URL: process.env.HOST_URL,
    SOCKET_URL: process.env.SOCKET_URL
  }
};
