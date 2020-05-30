'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Persona', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
    id_usuario: {type: Sequelize.INTEGER, allowNull: false, validate: {min: 1, isNumeric: true}
        ,references:{
          model: 'Usuario',
          key: 'id'
        }
    },
    id_tipo_documento: {type: Sequelize.INTEGER, allowNull: false, validate: {min: 1, isNumeric: true},
      references:{
        model: 'TipoDocumento',
        key: 'id'
      }
    },
    numero_documento: {type: Sequelize.CHAR(11), unique: true, allowNull: false, 
      validate: {notEmpty: true, len: [8,11], isNumeric: true}},
    nombre: {type: Sequelize.STRING(50), allowNull: false, validate: {notEmpty: true, len: [1,50]}},
    apellido: {type: Sequelize.STRING(50), allowNull: false, validate: {notEmpty: true, len: [1,50]}},
    estado: {type: Sequelize.CHAR(1), allowNull: false, defaultValue: 'A',
      validate: {notEmpty: true, len: [1,1], isIn: [['A', 'I']], isAlpha: true}
    },

    createdAt: {type: Sequelize.DATE, allowNull: false, defaultValue: Date.now},
    updatedAt: {type: Sequelize.DATE, allowNull: true}
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Persona');
  }
};