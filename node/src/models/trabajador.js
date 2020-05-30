'use strict';
module.exports = (sequelize, DataTypes) => {
  const Trabajador = sequelize.define('Trabajador', {
    id_persona: {type: DataTypes.INTEGER, allowNull: false, validate: {isInt: true, min: 1}},
    id_delivery: {type: DataTypes.INTEGER, allowNull: false, validate: {isInt: true, min: 1}},
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
    tableName: 'Trabajador'
  });
  Trabajador.associate = function(models) {
    Trabajador.belongsTo(models.Persona, {foreignKey: 'id_persona'});
    Trabajador.belongsTo(models.Delivery, {foreignKey: 'id_delivery'});
  };
  return Trabajador;
};