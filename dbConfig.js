const config = {
  server: 'localhost',
  authentication: {
    type: 'default',
    options: {
      userName: 'sa',
      password: 'teste123',
    },
  },
  options: {
    encrypt: false,
    database: 'Lojas',
  },
  port: 65076,
};

module.exports = config;
