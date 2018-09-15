
module.exports = function(sequelize, DataTypes) {
  var Media = sequelize.define("Media", {  
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    file: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
      // **look into validating eqal: ["image", "text", "audio"]**
    }
  });

  // **define relationships here**
  Media.associate = function (models) {
    // Media.belongsTo(models.Collective, {
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });
    Media.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Media;
};
