'use strict'
const models=require('../models')

async function getRubros(req,res){
  let [err,rubros]=await get(models.Rubro.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(rubros==null) return res.status(404).json({message: `Rubros nulos`})
  res.status(200).json(rubros)
}

async function getRubro(req,res){
  let [err,rubro]=await get(models.Rubro.findOne({
    where:{id: req.params.id, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(rubro==null) return res.status(404).json({message: `Rubros nulos`})
  res.status(200).json(rubro)
}

async function createRubro(req,res){
  let [err,rubro]=await get(models.Rubro.create({
      id_estado: req.body.id_estado,
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo rubro.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(rubro==null) return res.status(404).json({message: `Rubros nulos`})
  res.status(200).json(rubro)
}

async function createAllRubro(req,res){
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
        accion_usuario: 'Creo un nuevo usuario rubro.',
      }, { transaction: t });
      
      const persona = await models.Persona.create({
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        celular: req.body.celular,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion_usuario: 'Creo una nueva persona rubro.',
        accion: 'I',
        ip: req.ip,
        usuario: 0
      }, { transaction: t });
  
      await models.Rubro.create({
        id_persona: persona.id,
        id_usuario: user.id,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion: 'I',
        accion_usuario: 'Creo un nuevo rubro.',
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

async function updateRubro(req,res){
  let [err,rubro]=await get(models.Rubro.update({
    id_estado: req.body.id_estado,
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    
    accion: 'U',
    accion_usuario: 'Edito un rubro.',
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
  if(rubro==null) return res.status(404).json({message: `Rubros nulos`})
  res.status(200).json(rubro)
}

async function deleteRubro(req,res){
  let [err,rubro]=await get(models.Rubro.update({
    estado: 'I',

    accion_usuario: 'Elimino un rubro.',
    accion: 'D',
    ip: req.ip
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(rubro==null) return res.status(404).json({message: `Rubros nulos`})
  res.status(200).json(rubro)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getRubros,
  getRubro,
  createRubro,
  createAllRubro,
  updateRubro,
  deleteRubro
}