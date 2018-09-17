
module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define("Comment", {  
    text: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  // **define relationships here**
  Comment.associate = function (models) {
    Comment.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Comment.belongsTo(models.Collective, {
      foreignKey: {
        allowNull: true
      }
    });
    Comment.belongsTo(models.Submission, {
      foreignKey: {
        allowNull: true
      }
    });
  };

  return Comment;
};
