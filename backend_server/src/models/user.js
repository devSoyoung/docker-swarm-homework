module.exports = (sequelize, DataTypes) => (
  sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    say: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  })
);
