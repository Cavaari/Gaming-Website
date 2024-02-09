module.exports = {
  webpack: (config, { dev }) => {
    // Phaser webpack config
    config.module.rules.push({
      test: [/\.vert$/, /\.frag$/],
      use: "raw-loader",
    });
    

    return config;
  },
  env: {
    HOST_URL: process.env.HOST_URL,
    SOCKET_URL: process.env.SOCKET_URL
  }
};
