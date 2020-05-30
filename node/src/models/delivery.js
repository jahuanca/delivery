'use strict';
module.exports = (sequelize, DataTypes) => {
  const Delivery = sequelize.define('Delivery', {
    id_persona: {type: DataTypes.INTEGER, allowNull: false},
    estado: {type: DataTypes.CHAR(1), allowNull: false, defaultValue: 'A',
      validate: {notEmpty: true, len: [1,1], isIn: [['A', 'I']], isAlpha: true}
    },
    createdAt: {type: DataTypes.DATE, allowNull: false, defaultValue: Date.now},
    updatedAt: {type: DataTypes.DATE, allowNull: true},

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    freezeTableName: true,
    tableName: 'Delivery'
  });
  Delivery.associate = function(models) {
    Delivery.belongsTo(models.Persona, {foreignKey: 'id_persona'});
  };
  return Delivery;
};