'use strict'
const models=require('../models')

async function getDetallePedidos(req,res){
  let [err,detallePedidos]=await get(models.DetallePedido.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(detallePedidos==null) return res.status(404).json({message: `DetallePedidos nulos`})
  res.status(200).json(detallePedidos)
}

async function getDetallePedido(req,res){
  let [err,detallePedido]=await get(models.DetallePedido.findOne({
    where:{id: req.params.id, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(detallePedido==null) return res.status(404).json({message: `DetallePedidos nulos`})
  res.status(200).json(detallePedido)
}

async function createDetallePedido(req,res){
  let [err,detallePedido]=await get(models.DetallePedido.create({
      id_persona: req.body.id_persona,
      id_pedido: req.body.id_pedido,
      id_producto: req.body.id_producto,
      cantidad: req.body.cantidad,
      precio: req.body.precio,
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo detallePedido.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(detallePedido==null) return res.status(404).json({message: `DetallePedidos nulos`})
  res.status(200).json(detallePedido)
}

async function createAllDetallePedido(req,res){
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
        accion_usuario: 'Creo un nuevo usuario detallePedido.',
      }, { transaction: t });
      
      const persona = await models.Persona.create({
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        celular: req.body.celular,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion_usuario: 'Creo una nueva persona detallePedido.',
        accion: 'I',
        ip: req.ip,
        usuario: 0
      }, { transaction: t });
  
      await models.DetallePedido.create({
        id_persona: persona.id,
        id_usuario: user.id,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion: 'I',
        accion_usuario: 'Creo un nuevo detallePedido.',
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

async function updateDetallePedido(req,res){
  let [err,detallePedido]=await get(models.DetallePedido.update({
    id_persona: req.body.id_persona,
    id_pedido: req.body.id_pedido,
    id_producto: req.body.id_producto,
    cantidad: req.body.cantidad,
    precio: req.body.precio,
    
    accion: 'U',
    accion_usuario: 'Edito un detallePedido.',
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
  if(detallePedido==null) return res.status(404).json({message: `DetallePedidos nulos`})
  res.status(200).json(detallePedido)
}

async function deleteDetallePedido(req,res){
  let [err,detallePedido]=await get(models.DetallePedido.update({
    estado: 'I',

    accion_usuario: 'Elimino un detallePedido.',
    accion: 'D',
    ip: req.ip
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(detallePedido==null) return res.status(404).json({message: `DetallePedidos nulos`})
  res.status(200).json(detallePedido)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getDetallePedidos,
  getDetallePedido,
  createDetallePedido,
  createAllDetallePedido,
  updateDetallePedido,
  deleteDetallePedido
}