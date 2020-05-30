'use strict'
const models=require('../models')

async function getFormaPagos(req,res){
  let [err,formaPagos]=await get(models.FormaPago.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(formaPagos==null) return res.status(404).json({message: `FormaPagos nulos`})
  res.status(200).json(formaPagos)
}

async function getFormaPago(req,res){
  let [err,formaPago]=await get(models.FormaPago.findOne({
    where:{id: req.params.id, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(formaPago==null) return res.status(404).json({message: `FormaPagos nulos`})
  res.status(200).json(formaPago)
}

async function createFormaPago(req,res){
  let [err,formaPago]=await get(models.FormaPago.create({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo formaPago.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(formaPago==null) return res.status(404).json({message: `FormaPagos nulos`})
  res.status(200).json(formaPago)
}

async function createAllFormaPago(req,res){
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
        accion_usuario: 'Creo un nuevo usuario formaPago.',
      }, { transaction: t });
      
      const persona = await models.Persona.create({
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        celular: req.body.celular,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion_usuario: 'Creo una nueva persona formaPago.',
        accion: 'I',
        ip: req.ip,
        usuario: 0
      }, { transaction: t });
  
      await models.FormaPago.create({
        id_persona: persona.id,
        id_usuario: user.id,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion: 'I',
        accion_usuario: 'Creo un nuevo formaPago.',
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

async function updateFormaPago(req,res){
  let [err,formaPago]=await get(models.FormaPago.update({
    nombre: req.body.nombre,
    observacion: req.body.observacion,
    
    accion: 'U',
    accion_usuario: 'Edito un formaPago.',
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
  if(formaPago==null) return res.status(404).json({message: `FormaPagos nulos`})
  res.status(200).json(formaPago)
}

async function deleteFormaPago(req,res){
  let [err,formaPago]=await get(models.FormaPago.update({
    estado: 'I',

    accion_usuario: 'Elimino un formaPago.',
    accion: 'D',
    ip: req.ip
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(formaPago==null) return res.status(404).json({message: `FormaPagos nulos`})
  res.status(200).json(formaPago)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getFormaPagos,
  getFormaPago,
  createFormaPago,
  createAllFormaPago,
  updateFormaPago,
  deleteFormaPago
}