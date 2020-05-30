'use strict';
module.exports = (sequelize, DataTypes) => {
  const MedioComunicacion = sequelize.define('MedioComunicacion', {
    id_tipo: {type: DataTypes.INTEGER, allowNull: false},
    id_cliente: {type: DataTypes.INTEGER, allowNull: false},
    dato: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
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
    tableName: 'MedioComunicacion'
  });
  MedioComunicacion.associate = function(models) {
    MedioComunicacion.belongsTo(models.TipoMedioComunicacion, {foreignKey: 'id_tipo'});
    MedioComunicacion.belongsTo(models.Cliente, {foreignKey: 'id_cliente'});
  };
  return MedioComunicacion;
};