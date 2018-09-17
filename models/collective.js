
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
    }
  });

  Collective.associate = function (models) {
    Collective.hasMany(models.Media, {
      // **do we delete associated media with the collective?**
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
