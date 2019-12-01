const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config')[env];

const db = {};

try {
  const sequelize = new Sequelize(
    config.DB.name, // 데이터베이스 이름
    config.DB.user, // 유저 명
    config.DB.password, // 비밀번호
    {
      'host': 'localhost', // 데이터베이스 호스트
      'dialect': 'mysql', // 사용할 데이터베이스 종류
      'port': config.DB.port,
      retry: {
        match: [
          /SequelizeConnectionError/,
          /SequelizeConnectionRefusedError/,
          /SequelizeHostNotFoundError/,
          /SequelizeHostNotReachableError/,
          /SequelizeInvalidConnectionError/,
          /SequelizeConnectionTimedOutError/,
        ],
        name: 'query',
        backoffBase: 100,
        backoffExponent: 1.1,
        timeout: 60000,
        max: Infinity
      }
    }
  );

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  db.User = require('./user')(sequelize, Sequelize);
  db.User.sync();
} catch (err) {
  console.log('데이터베이스 연결 실패');
}



module.exports = db;
