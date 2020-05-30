'use strict'
const models=require('../models')

async function getPagos(req,res){
  let [err,pagos]=await get(models.Pago.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(pagos==null) return res.status(404).json({message: `Pagos nulos`})
  res.status(200).json(pagos)
}

async function getPago(req,res){
  let [err,pago]=await get(models.Pago.findOne({
    where:{id: req.params.id, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(pago==null) return res.status(404).json({message: `Pagos nulos`})
  res.status(200).json(pago)
}

async function createPago(req,res){
  let [err,pago]=await get(models.Pago.create({
      id_forma: req.body.id_forma,
      id_pedido: req.body.id_pedido,
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo pago.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(pago==null) return res.status(404).json({message: `Pagos nulos`})
  res.status(200).json(pago)
}

async function createAllPago(req,res){
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
        accion_usuario: 'Creo un nuevo usuario pago.',
      }, { transaction: t });
      
      const persona = await models.Persona.create({
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        celular: req.body.celular,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion_usuario: 'Creo una nueva persona pago.',
        accion: 'I',
        ip: req.ip,
        usuario: 0
      }, { transaction: t });
  
      await models.Pago.create({
        id_persona: persona.id,
        id_usuario: user.id,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion: 'I',
        accion_usuario: 'Creo un nuevo pago.',
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

async function updatePago(req,res){
  let [err,pago]=await get(models.Pago.update({
    id_forma: req.body.id_forma,
    id_pedido: req.body.id_pedido,
    
    accion: 'U',
    accion_usuario: 'Edito un pago.',
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
  if(pago==null) return res.status(404).json({message: `Pagos nulos`})
  res.status(200).json(pago)
}

async function deletePago(req,res){
  let [err,pago]=await get(models.Pago.update({
    estado: 'I',

    accion_usuario: 'Elimino un pago.',
    accion: 'D',
    ip: req.ip
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(pago==null) return res.status(404).json({message: `Pagos nulos`})
  res.status(200).json(pago)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getPagos,
  getPago,
  createPago,
  createAllPago,
  updatePago,
  deletePago
}