module.exports = function(sequelize, DataTypes) {
  let users = sequelize.define("users", {
    text: DataTypes.STRING,
    complete: DataTypes.BOOLEAN
  });
  return users;
};
