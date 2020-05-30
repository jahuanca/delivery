'use strict'
const models=require('../models')

async function getProductos(req,res){
  let [err,productos]=await get(models.Producto.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(productos==null) return res.status(404).json({message: `Productos nulos`})
  res.status(200).json(productos)
}

async function getProducto(req,res){
  let [err,producto]=await get(models.Producto.findOne({
    where:{id: req.params.id, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(producto==null) return res.status(404).json({message: `Productos nulos`})
  res.status(200).json(producto)
}

async function createProducto(req,res){
  let [err,producto]=await get(models.Producto.create({
      id_categoria: req.body.id_categoria,
      id_estado: req.body.id_estado,
      id_negocio: req.body.id_negocio,
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      cantidad: req.body.cantidad,
      foto_1: req.body.foto_1,
      foto_2: req.body.foto_2,
      foto_3: req.body.foto_3,
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo producto.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(producto==null) return res.status(404).json({message: `Productos nulos`})
  res.status(200).json(producto)
}

async function createAllProducto(req,res){
  try {

    const result = await sequelize.transaction(async (t) => {
  
      const user=await models.Usuario.create({
        id_tipo: 1,
        username: req.body.username,
        password: req.body.password,
        observacion: req.body.observacion,

        accion: 'I',
        usuario: 0,
        ip: req.ip,
        accion_usuario: 'Creo un nuevo usuario producto.',
      }, { transaction: t });
      
      const persona = await models.Persona.create({
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        celular: req.body.celular,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion_usuario: 'Creo una nueva persona producto.',
        accion: 'I',
        ip: req.ip,
        usuario: 0
      }, { transaction: t });
  
      await models.Producto.create({
        id_persona: persona.id,
        id_usuario: user.id,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion: 'I',
        accion_usuario: 'Creo un nuevo producto.',
        ip: req.ip,
        usuario: 0
      }, { transaction: t });
  
      return persona;
  
    });
    res.status(200).json(result)
  
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: `Error en el servidor ${error}`})  
  }

  
}

async function updateProducto(req,res){
  let [err,producto]=await get(models.Producto.update({
    id_categoria: req.body.id_categoria,
    id_estado: req.body.id_estado,
    id_negocio: req.body.id_negocio,
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    cantidad: req.body.cantidad,
    foto_1: req.body.foto_1,
    foto_2: req.body.foto_2,
    foto_3: req.body.foto_3,
    
    accion: 'U',
    accion_usuario: 'Edito un producto.',
    ip: req.ip,
    usuario: 0
  },{
    where:{
      id: req.body.id, estado:'A'
    },
    individualHooks: true,
    validate: false
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(producto==null) return res.status(404).json({message: `Productos nulos`})
  res.status(200).json(producto)
}

async function deleteProducto(req,res){
  let [err,producto]=await get(models.Producto.update({
    estado: 'I',

    accion_usuario: 'Elimino un producto.',
    accion: 'D',
    ip: req.ip
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(producto==null) return res.status(404).json({message: `Productos nulos`})
  res.status(200).json(producto)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getProductos,
  getProducto,
  createProducto,
  createAllProducto,
  updateProducto,
  deleteProducto
}