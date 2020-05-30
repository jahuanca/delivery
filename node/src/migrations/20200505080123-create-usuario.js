'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Usuario', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
    id_tipo: {type: Sequelize.INTEGER, allowNull: false, validate: {isInt: true, min: 1}
      ,references:{
        model: 'TipoUsuario',
        key: 'id'
      }
    },
    username: {type: Sequelize.STRING(50), unique: true, allowNull: false, validate: {notEmpty: true, len: [1,50]}},
    password: {type: Sequelize.STRING(100), allowNull: true, validate: {notEmpty: true, len: [1,100]}},
    estado: {type: Sequelize.CHAR(1), allowNull: false, defaultValue: 'A',
      validate: {notEmpty: true, len: [1,1], isIn: [['A', 'I']], isAlpha: true}
    },
    estado: {type: Sequelize.CHAR(1), allowNull: false, defaultValue: 'A',
      validate: {notEmpty: true, len: [1,1], isIn: [['A', 'I']], isAlpha: true}
    },

    createdAt: {type: Sequelize.DATE, allowNull: false, defaultValue: Date.now},
    updatedAt: {type: Sequelize.DATE, allowNull: true}
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Usuario');
  }
};