'use strict'
const models=require('../models')

async function getTipoDocumentos(req,res){
  let [err,tipoDocumentos]=await get(models.TipoDocumento.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(tipoDocumentos==null) return res.status(404).json({message: `TipoDocumentos nulos`})
  res.status(200).json(tipoDocumentos)
}

async function getTipoDocumento(req,res){
  let [err,tipoDocumento]=await get(models.TipoDocumento.findOne({
    where:{id: req.params.id, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(tipoDocumento==null) return res.status(404).json({message: `TipoDocumentos nulos`})
  res.status(200).json(tipoDocumento)
}

async function createTipoDocumento(req,res){
  let [err,tipoDocumento]=await get(models.TipoDocumento.create({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo tipoDocumento.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(tipoDocumento==null) return res.status(404).json({message: `TipoDocumentos nulos`})
  res.status(200).json(tipoDocumento)
}

async function createAllTipoDocumento(req,res){
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
        accion_usuario: 'Creo un nuevo usuario tipoDocumento.',
      }, { transaction: t });
      
      const persona = await models.Persona.create({
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        celular: req.body.celular,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion_usuario: 'Creo una nueva persona tipoDocumento.',
        accion: 'I',
        ip: req.ip,
        usuario: 0
      }, { transaction: t });
  
      await models.TipoDocumento.create({
        id_persona: persona.id,
        id_usuario: user.id,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion: 'I',
        accion_usuario: 'Creo un nuevo tipoDocumento.',
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

async function updateTipoDocumento(req,res){
  let [err,tipoDocumento]=await get(models.TipoDocumento.update({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    
    accion: 'U',
    accion_usuario: 'Edito un tipoDocumento.',
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
  if(tipoDocumento==null) return res.status(404).json({message: `TipoDocumentos nulos`})
  res.status(200).json(tipoDocumento)
}

async function deleteTipoDocumento(req,res){
  let [err,tipoDocumento]=await get(models.TipoDocumento.update({
    estado: 'I',

    accion_usuario: 'Elimino un tipoDocumento.',
    accion: 'D',
    ip: req.ip
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(tipoDocumento==null) return res.status(404).json({message: `TipoDocumentos nulos`})
  res.status(200).json(tipoDocumento)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getTipoDocumentos,
  getTipoDocumento,
  createTipoDocumento,
  createAllTipoDocumento,
  updateTipoDocumento,
  deleteTipoDocumento
}