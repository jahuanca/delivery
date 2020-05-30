'use strict'
const models=require('../models')

async function getTrabajadors(req,res){
  let [err,trabajadors]=await get(models.Trabajador.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(trabajadors==null) return res.status(404).json({message: `Trabajadors nulos`})
  res.status(200).json(trabajadors)
}

async function getTrabajador(req,res){
  let [err,trabajador]=await get(models.Trabajador.findOne({
    where:{id: req.params.id, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(trabajador==null) return res.status(404).json({message: `Trabajadors nulos`})
  res.status(200).json(trabajador)
}

async function createTrabajador(req,res){
  let [err,trabajador]=await get(models.Trabajador.create({
      id_persona: req.body.id_persona,
      id_delivery: req.body.id_delivery,

      accion: 'I',
      accion_usuario: 'Creo un nuevo trabajador.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(trabajador==null) return res.status(404).json({message: `Trabajadors nulos`})
  res.status(200).json(trabajador)
}

async function createAllTrabajador(req,res){
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
        accion_usuario: 'Creo un nuevo usuario trabajador.',
      }, { transaction: t });
      
      const persona = await models.Persona.create({
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        celular: req.body.celular,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion_usuario: 'Creo una nueva persona trabajador.',
        accion: 'I',
        ip: req.ip,
        usuario: 0
      }, { transaction: t });
  
      await models.Trabajador.create({
        id_persona: persona.id,
        id_usuario: user.id,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion: 'I',
        accion_usuario: 'Creo un nuevo trabajador.',
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

async function updateTrabajador(req,res){
  let [err,trabajador]=await get(models.Trabajador.update({
    id_persona: req.body.id_persona,
    id_delivery: req.body.id_delivery,
    
    accion: 'U',
    accion_usuario: 'Edito un trabajador.',
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
  if(trabajador==null) return res.status(404).json({message: `Trabajadors nulos`})
  res.status(200).json(trabajador)
}

async function deleteTrabajador(req,res){
  let [err,trabajador]=await get(models.Trabajador.update({
    estado: 'I',

    accion_usuario: 'Elimino un trabajador.',
    accion: 'D',
    ip: req.ip
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(trabajador==null) return res.status(404).json({message: `Trabajadors nulos`})
  res.status(200).json(trabajador)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getTrabajadors,
  getTrabajador,
  createTrabajador,
  createAllTrabajador,
  updateTrabajador,
  deleteTrabajador
}