'use strict'
const models=require('../models')

async function getPedidos(req,res){
  let [err,pedidos]=await get(models.Pedido.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(pedidos==null) return res.status(404).json({message: `Pedidos nulos`})
  res.status(200).json(pedidos)
}

async function getPedido(req,res){
  let [err,pedido]=await get(models.Pedido.findOne({
    where:{id: req.params.id, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(pedido==null) return res.status(404).json({message: `Pedidos nulos`})
  res.status(200).json(pedido)
}

async function createPedido(req,res){
  let [err,pedido]=await get(models.Pedido.create({
      id_cliente: req.body.id_cliente,
      id_trabajador: req.body.id_trabajador,
      monto: req.body.monto,
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo pedido.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(pedido==null) return res.status(404).json({message: `Pedidos nulos`})
  res.status(200).json(pedido)
}

async function createAllPedido(req,res){
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
        accion_usuario: 'Creo un nuevo usuario pedido.',
      }, { transaction: t });
      
      const persona = await models.Persona.create({
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        celular: req.body.celular,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion_usuario: 'Creo una nueva persona pedido.',
        accion: 'I',
        ip: req.ip,
        usuario: 0
      }, { transaction: t });
  
      await models.Pedido.create({
        id_persona: persona.id,
        id_usuario: user.id,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion: 'I',
        accion_usuario: 'Creo un nuevo pedido.',
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

async function updatePedido(req,res){
  let [err,pedido]=await get(models.Pedido.update({
    id_cliente: req.body.id_cliente,
    id_trabajador: req.body.id_trabajador,
    monto: req.body.monto,
    
    accion: 'U',
    accion_usuario: 'Edito un pedido.',
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
  if(pedido==null) return res.status(404).json({message: `Pedidos nulos`})
  res.status(200).json(pedido)
}

async function deletePedido(req,res){
  let [err,pedido]=await get(models.Pedido.update({
    estado: 'I',

    accion_usuario: 'Elimino un pedido.',
    accion: 'D',
    ip: req.ip
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(pedido==null) return res.status(404).json({message: `Pedidos nulos`})
  res.status(200).json(pedido)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getPedidos,
  getPedido,
  createPedido,
  createAllPedido,
  updatePedido,
  deletePedido
}