'use strict'
const models=require('../models')

async function getNegocios(req,res){
  let [err,negocios]=await get(models.Negocio.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(negocios==null) return res.status(404).json({message: `Negocios nulos`})
  res.status(200).json(negocios)
}

async function getNegocio(req,res){
  let [err,negocio]=await get(models.Negocio.findOne({
    where:{id: req.params.id, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(negocio==null) return res.status(404).json({message: `Negocios nulos`})
  res.status(200).json(negocio)
}

async function createNegocio(req,res){
  let [err,negocio]=await get(models.Negocio.create({
      id_persona: req.body.id_persona,
      id_estado: req.body.id_estado,
      id_rubro: req.body.id_rubro,
      nombre: req.body.nombre,
      delivery: req.body.delivery,
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo negocio.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(negocio==null) return res.status(404).json({message: `Negocios nulos`})
  res.status(200).json(negocio)
}

async function createAllNegocio(req,res){
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
        accion_usuario: 'Creo un nuevo usuario negocio.',
      }, { transaction: t });
      
      const persona = await models.Persona.create({
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        celular: req.body.celular,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion_usuario: 'Creo una nueva persona negocio.',
        accion: 'I',
        ip: req.ip,
        usuario: 0
      }, { transaction: t });
  
      await models.Negocio.create({
        id_persona: persona.id,
        id_usuario: user.id,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion: 'I',
        accion_usuario: 'Creo un nuevo negocio.',
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

async function updateNegocio(req,res){
  let [err,negocio]=await get(models.Negocio.update({
    id_persona: req.body.id_persona,
    id_estado: req.body.id_estado,
    id_rubro: req.body.id_rubro,
    nombre: req.body.nombre,
    delivery: req.body.delivery,
    
    accion: 'U',
    accion_usuario: 'Edito un negocio.',
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
  if(negocio==null) return res.status(404).json({message: `Negocios nulos`})
  res.status(200).json(negocio)
}

async function deleteNegocio(req,res){
  let [err,negocio]=await get(models.Negocio.update({
    estado: 'I',

    accion_usuario: 'Elimino un negocio.',
    accion: 'D',
    ip: req.ip
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(negocio==null) return res.status(404).json({message: `Negocios nulos`})
  res.status(200).json(negocio)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getNegocios,
  getNegocio,
  createNegocio,
  createAllNegocio,
  updateNegocio,
  deleteNegocio
}