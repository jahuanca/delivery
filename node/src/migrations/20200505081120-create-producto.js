'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Producto', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
    id_categoria: {type: Sequelize.INTEGER, allowNull: false, validatE: {isInt: true, min: 1}
      ,references:{
        model: 'Categoria',
        key: 'id'
      }
    },
    id_estado: {type: Sequelize.INTEGER, allowNull: false, validatE: {isInt: true, min: 1}
      ,references:{
        model: 'Estado',
        key: 'id'
      }
    },
    id_negocio: {type: Sequelize.INTEGER, allowNull: false, validatE: {isInt: true, min: 1}
      ,references:{
        model: 'Negocio',
        key: 'id'
      }
    },
    nombre: {type: Sequelize.STRING(100), allowNull: false, validate: {notEmpty: true, len: [1,100]}},
    descripcion: {type: Sequelize.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    precio: {type: Sequelize.DOUBLE, allowNull: false, validate: {isDecimal: true, min: 0}},
    cantidad: {type: Sequelize.INTEGER, allowNull: false, validate: {isInt: true, min:1}},
    foto_1: {type: Sequelize.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    foto_2: {type: Sequelize.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    foto_3: {type: Sequelize.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    estado: {type: Sequelize.CHAR(1), allowNull: false, defaultValue: 'A',
      validate: {notEmpty: true, len: [1,1], isIn: [['A', 'I']], isAlpha: true}
    },

    createdAt: {type: Sequelize.DATE, allowNull: false, defaultValue: Date.now},
    updatedAt: {type: Sequelize.DATE, allowNull: true},
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Producto');
  }
};