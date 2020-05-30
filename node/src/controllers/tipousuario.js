'use strict'
const models=require('../models')

async function getTipoUsuarios(req,res){
  let [err,tipoUsuarios]=await get(models.TipoUsuario.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(tipoUsuarios==null) return res.status(404).json({message: `TipoUsuarios nulos`})
  res.status(200).json(tipoUsuarios)
}

async function getTipoUsuario(req,res){
  let [err,tipoUsuario]=await get(models.TipoUsuario.findOne({
    where:{id: req.params.id, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(tipoUsuario==null) return res.status(404).json({message: `TipoUsuarios nulos`})
  res.status(200).json(tipoUsuario)
}

async function createTipoUsuario(req,res){
  let [err,tipoUsuario]=await get(models.TipoUsuario.create({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo tipoUsuario.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(tipoUsuario==null) return res.status(404).json({message: `TipoUsuarios nulos`})
  res.status(200).json(tipoUsuario)
}

async function createAllTipoUsuario(req,res){
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
        accion_usuario: 'Creo un nuevo usuario tipoUsuario.',
      }, { transaction: t });
      
      const persona = await models.Persona.create({
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        celular: req.body.celular,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion_usuario: 'Creo una nueva persona tipoUsuario.',
        accion: 'I',
        ip: req.ip,
        usuario: 0
      }, { transaction: t });
  
      await models.TipoUsuario.create({
        id_persona: persona.id,
        id_usuario: user.id,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion: 'I',
        accion_usuario: 'Creo un nuevo tipoUsuario.',
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

async function updateTipoUsuario(req,res){
  let [err,tipoUsuario]=await get(models.TipoUsuario.update({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    
    accion: 'U',
    accion_usuario: 'Edito un tipoUsuario.',
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
  if(tipoUsuario==null) return res.status(404).json({message: `TipoUsuarios nulos`})
  res.status(200).json(tipoUsuario)
}

async function deleteTipoUsuario(req,res){
  let [err,tipoUsuario]=await get(models.TipoUsuario.update({
    estado: 'I',

    accion_usuario: 'Elimino un tipoUsuario.',
    accion: 'D',
    ip: req.ip
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(tipoUsuario==null) return res.status(404).json({message: `TipoUsuarios nulos`})
  res.status(200).json(tipoUsuario)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getTipoUsuarios,
  getTipoUsuario,
  createTipoUsuario,
  createAllTipoUsuario,
  updateTipoUsuario,
  deleteTipoUsuario
}