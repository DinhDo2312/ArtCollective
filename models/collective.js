
module.exports = function(sequelize, DataTypes) {
  var Collective = sequelize.define("Collective", {  
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    privacy: {
      type: DataTypes.INTEGER
    },
  });

  Collective.associate = function (models) {
    Collective.hasMany(models.Submission, {
      // **do we delete associated submissions with the collective?**
    });
    Collective.hasMany(models.Comment, {
      onDelete: "CASCADE"
    });
    Collective.belongsToMany(models.User, {
      through: models.UserCollective
    });
  };

  return Collective;
};
