'use strict'
const models=require('../models')

async function getEstados(req,res){
  let [err,estados]=await get(models.Estado.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(estados==null) return res.status(404).json({message: `Estados nulos`})
  res.status(200).json(estados)
}

async function getEstado(req,res){
  let [err,estado]=await get(models.Estado.findOne({
    where:{id: req.params.id, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(estado==null) return res.status(404).json({message: `Estados nulos`})
  res.status(200).json(estado)
}

async function createEstado(req,res){
  let [err,estado]=await get(models.Estado.create({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo estado.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(estado==null) return res.status(404).json({message: `Estados nulos`})
  res.status(200).json(estado)
}

async function createAllEstado(req,res){
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
        accion_usuario: 'Creo un nuevo usuario estado.',
      }, { transaction: t });
      
      const persona = await models.Persona.create({
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        celular: req.body.celular,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion_usuario: 'Creo una nueva persona estado.',
        accion: 'I',
        ip: req.ip,
        usuario: 0
      }, { transaction: t });
  
      await models.Estado.create({
        id_persona: persona.id,
        id_usuario: user.id,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion: 'I',
        accion_usuario: 'Creo un nuevo estado.',
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

async function updateEstado(req,res){
  let [err,estado]=await get(models.Estado.update({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    
    accion: 'U',
    accion_usuario: 'Edito un estado.',
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
  if(estado==null) return res.status(404).json({message: `Estados nulos`})
  res.status(200).json(estado)
}

async function deleteEstado(req,res){
  let [err,estado]=await get(models.Estado.update({
    estado: 'I',

    accion_usuario: 'Elimino un estado.',
    accion: 'D',
    ip: req.ip
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(estado==null) return res.status(404).json({message: `Estados nulos`})
  res.status(200).json(estado)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getEstados,
  getEstado,
  createEstado,
  createAllEstado,
  updateEstado,
  deleteEstado
}