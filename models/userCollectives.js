
module.exports = function(sequelize, DataTypes) {
  var JoinUsersCollectives = sequelize.define("JoinUsersCollectives", {  
    role: {
      type: DataTypes.STRING,
      // allowNull: false,
    }
  });
  
  return JoinUsersCollectives;
};