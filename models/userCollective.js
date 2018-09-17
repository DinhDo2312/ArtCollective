
module.exports = function(sequelize, DataTypes) {
  var UserCollective = sequelize.define("UserCollective", {  
    role: {
      type: DataTypes.STRING,
      // allowNull: false,
    }
  });
  
  return UserCollective;
};