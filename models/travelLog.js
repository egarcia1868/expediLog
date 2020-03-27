module.exports = function(sequelize, DataTypes) {
  var travelLog = sequelize.define("travelLog", {
    text: DataTypes.STRING,
    complete: DataTypes.BOOLEAN
  });
  return travelLog;
};
