'use strict';
module.exports = (sequelize, DataTypes) => {
  const Persona = sequelize.define('Persona', {
    id_usuario: {type: DataTypes.INTEGER, allowNull: false, validate: {min: 1, isNumeric: true}},
    id_tipo_documento: {type: DataTypes.INTEGER, allowNull: false, validate: {min: 1, isNumeric: true}},
    numero_documento: {type: DataTypes.CHAR(11), unique: true, allowNull: false, 
      validate: {notEmpty: true, len: [8,11], isNumeric: true}},
    nombre: {type: DataTypes.STRING(50), allowNull: false, validate: {notEmpty: true, len: [1,50]}},
    apellido: {type: DataTypes.STRING(50), allowNull: false, validate: {notEmpty: true, len: [1,50]}},
    estado: {type: DataTypes.CHAR(1), allowNull: false, defaultValue: 'A',
      validate: {notEmpty: true, len: [1,1], isIn: [['A', 'I']], isAlpha: true}
    },

    createdAt: {type: DataTypes.DATE, allowNull: false, defaultValue: Date.now},
    updatedAt: {type: DataTypes.DATE, allowNull: true},

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    //visita_id: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    freezeTableName: true,
    tableName: 'Persona'
  });
  Persona.associate = function(models) {
    Persona.belongsTo(models.Usuario, {foreignKey: 'id_usuario'});
    Persona.belongsTo(models.TipoDocumento, {foreignKey: 'id_tipo_documento'});
  };
  return Persona;
};