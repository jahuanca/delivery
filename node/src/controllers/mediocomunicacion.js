'use strict'
const models=require('../models')

async function getMedioComunicacions(req,res){
  let [err,medioComunicacions]=await get(models.MedioComunicacion.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(medioComunicacions==null) return res.status(404).json({message: `MedioComunicacions nulos`})
  res.status(200).json(medioComunicacions)
}

async function getMedioComunicacion(req,res){
  let [err,medioComunicacion]=await get(models.MedioComunicacion.findOne({
    where:{id: req.params.id, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(medioComunicacion==null) return res.status(404).json({message: `MedioComunicacions nulos`})
  res.status(200).json(medioComunicacion)
}

async function createMedioComunicacion(req,res){
  let [err,medioComunicacion]=await get(models.MedioComunicacion.create({
      id_cliente: req.body.id_cliente,
      id_tipo: req.body.id_tipo,
      dato: req.body.dato,
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo medioComunicacion.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(medioComunicacion==null) return res.status(404).json({message: `MedioComunicacions nulos`})
  res.status(200).json(medioComunicacion)
}

async function createAllMedioComunicacion(req,res){
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
        accion_usuario: 'Creo un nuevo usuario medioComunicacion.',
      }, { transaction: t });
      
      const persona = await models.Persona.create({
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        celular: req.body.celular,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion_usuario: 'Creo una nueva persona medioComunicacion.',
        accion: 'I',
        ip: req.ip,
        usuario: 0
      }, { transaction: t });
  
      await models.MedioComunicacion.create({
        id_persona: persona.id,
        id_usuario: user.id,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion: 'I',
        accion_usuario: 'Creo un nuevo medioComunicacion.',
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

async function updateMedioComunicacion(req,res){
  let [err,medioComunicacion]=await get(models.MedioComunicacion.update({
    id_cliente: req.body.id_cliente,
    id_tipo: req.body.id_tipo,
    dato: req.body.dato,
    
    accion: 'U',
    accion_usuario: 'Edito un medioComunicacion.',
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
  if(medioComunicacion==null) return res.status(404).json({message: `MedioComunicacions nulos`})
  res.status(200).json(medioComunicacion)
}

async function deleteMedioComunicacion(req,res){
  let [err,medioComunicacion]=await get(models.MedioComunicacion.update({
    estado: 'I',

    accion_usuario: 'Elimino un medioComunicacion.',
    accion: 'D',
    ip: req.ip
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(medioComunicacion==null) return res.status(404).json({message: `MedioComunicacions nulos`})
  res.status(200).json(medioComunicacion)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getMedioComunicacions,
  getMedioComunicacion,
  createMedioComunicacion,
  createAllMedioComunicacion,
  updateMedioComunicacion,
  deleteMedioComunicacion
}