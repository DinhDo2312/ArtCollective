
module.exports = function(sequelize, DataTypes) {
  var Submission = sequelize.define("Submission", {  
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
  Submission.associate = function (models) {
    Submission.belongsTo(models.Collective, {
      foreignKey: {
        allowNull: false
      }
    });
    Submission.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Submission;
};
