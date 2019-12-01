const config = {
  secret: 'my-secret-key',
  development: {
    DB: {
      name: 'toyproject_db',
      user: 'root',
      password: 'password123',
    },
  },
  production: {
    DB: {
      name: '',
      user: '',
      password: '',
      port: 3306,
    },
  },
};

module.exports = config;
