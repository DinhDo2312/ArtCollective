
module.exports = function(sequelize, DataTypes) {
  var JoinUsersCollectives = sequelize.define("JoinUsersCollectives", {  
    role: {
      type: DataTypes.STRING,
      // allowNull: false,
    }
  });

  JoinUsersCollectives.associate = function (models) {
    JoinUsersCollectives.belongsTo(models.User, {});
  };

  JoinUsersCollectives.associate = function (models) {
    JoinUsersCollectives.belongsTo(models.Collective, {});
  };
  
  return JoinUsersCollectives;
};
