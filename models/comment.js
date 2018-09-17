
module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define("Comment", {  
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
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
    Comment.belongsTo(models.Media, {
      foreignKey: {
        allowNull: true
      }
    });
  };

  return Comment;
};
