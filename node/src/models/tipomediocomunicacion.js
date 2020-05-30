'use strict';
module.exports = (sequelize, DataTypes) => {
  const TipoMedioComunicacion = sequelize.define('TipoMedioComunicacion', {
    nombre: {type: DataTypes.STRING(100), allowNull: false, validate: {notEmpty: true, len: [1,100]}},
    descripcion: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
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
    tableName: 'TipoMedioComunicacion'
  });
  TipoMedioComunicacion.associate = function(models) {
    TipoMedioComunicacion.belongsTo(models.Cliente, {foreignKey: 'id_cliente'});
  };
  return TipoMedioComunicacion;
};