'use strict';
module.exports = (sequelize, DataTypes) => {
  const Negocio = sequelize.define('Negocio', {
    id_persona: {type: DataTypes.INTEGER, allowNull: false},
    id_estado: {type: DataTypes.INTEGER, allowNull: false},
    id_rubro: {type: DataTypes.INTEGER, allowNull: false},
    nombre: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    delivery: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true},
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
    tableName: 'Negocio'
  });
  Negocio.associate = function(models) {
    Negocio.belongsTo(models.Persona, {foreignKey: 'id_persona'});
    Negocio.belongsTo(models.Estado, {foreignKey: 'id_estado'});
    Negocio.belongsTo(models.Rubro, {foreignKey: 'id_rubro'});
  };
  return Negocio;
};