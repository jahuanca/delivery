'use strict'
const models=require('../models')

async function getTipoMedioComunicacions(req,res){
  let [err,tipoMedioComunicacions]=await get(models.TipoMedioComunicacion.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(tipoMedioComunicacions==null) return res.status(404).json({message: `TipoMedioComunicacions nulos`})
  res.status(200).json(tipoMedioComunicacions)
}

async function getTipoMedioComunicacion(req,res){
  let [err,tipoMedioComunicacion]=await get(models.TipoMedioComunicacion.findOne({
    where:{id: req.params.id, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(tipoMedioComunicacion==null) return res.status(404).json({message: `TipoMedioComunicacions nulos`})
  res.status(200).json(tipoMedioComunicacion)
}

async function createTipoMedioComunicacion(req,res){
  let [err,tipoMedioComunicacion]=await get(models.TipoMedioComunicacion.create({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo tipoMedioComunicacion.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(tipoMedioComunicacion==null) return res.status(404).json({message: `TipoMedioComunicacions nulos`})
  res.status(200).json(tipoMedioComunicacion)
}

async function createAllTipoMedioComunicacion(req,res){
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
        accion_usuario: 'Creo un nuevo usuario tipoMedioComunicacion.',
      }, { transaction: t });
      
      const persona = await models.Persona.create({
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        celular: req.body.celular,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion_usuario: 'Creo una nueva persona tipoMedioComunicacion.',
        accion: 'I',
        ip: req.ip,
        usuario: 0
      }, { transaction: t });
  
      await models.TipoMedioComunicacion.create({
        id_persona: persona.id,
        id_usuario: user.id,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion: 'I',
        accion_usuario: 'Creo un nuevo tipoMedioComunicacion.',
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

async function updateTipoMedioComunicacion(req,res){
  let [err,tipoMedioComunicacion]=await get(models.TipoMedioComunicacion.update({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    
    accion: 'U',
    accion_usuario: 'Edito un tipoMedioComunicacion.',
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
  if(tipoMedioComunicacion==null) return res.status(404).json({message: `TipoMedioComunicacions nulos`})
  res.status(200).json(tipoMedioComunicacion)
}

async function deleteTipoMedioComunicacion(req,res){
  let [err,tipoMedioComunicacion]=await get(models.TipoMedioComunicacion.update({
    estado: 'I',

    accion_usuario: 'Elimino un tipoMedioComunicacion.',
    accion: 'D',
    ip: req.ip
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(tipoMedioComunicacion==null) return res.status(404).json({message: `TipoMedioComunicacions nulos`})
  res.status(200).json(tipoMedioComunicacion)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getTipoMedioComunicacions,
  getTipoMedioComunicacion,
  createTipoMedioComunicacion,
  createAllTipoMedioComunicacion,
  updateTipoMedioComunicacion,
  deleteTipoMedioComunicacion
}