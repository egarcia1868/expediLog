module.exports = function (sequelize, DataTypes) {
  const Log = sequelize.define('Log', {
    location: DataTypes.STRING,
    journal_entry: DataTypes.TEXT,
    latitude: DataTypes.DOUBLE,
    longitude: DataTypes.DOUBLE,
  });

  return Log;
};
