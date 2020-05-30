'use strict'
const models=require('../models')

async function getDeliverys(req,res){
  let [err,deliverys]=await get(models.Delivery.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(deliverys==null) return res.status(404).json({message: `Deliverys nulos`})
  res.status(200).json(deliverys)
}

async function getDelivery(req,res){
  let [err,delivery]=await get(models.Delivery.findOne({
    where:{id: req.params.id, estado: 'A'}
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(delivery==null) return res.status(404).json({message: `Deliverys nulos`})
  res.status(200).json(delivery)
}

async function createDelivery(req,res){
  let [err,delivery]=await get(models.Delivery.create({
      id_persona: req.body.id_persona,
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo delivery.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(delivery==null) return res.status(404).json({message: `Deliverys nulos`})
  res.status(200).json(delivery)
}

async function createAllDelivery(req,res){
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
        accion_usuario: 'Creo un nuevo usuario delivery.',
      }, { transaction: t });
      
      const persona = await models.Persona.create({
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        celular: req.body.celular,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion_usuario: 'Creo una nueva persona delivery.',
        accion: 'I',
        ip: req.ip,
        usuario: 0
      }, { transaction: t });
  
      await models.Delivery.create({
        id_persona: persona.id,
        id_usuario: user.id,
        descripcion: req.body.descripcion,
        observacion: req.body.observacion,
        
        accion: 'I',
        accion_usuario: 'Creo un nuevo delivery.',
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

async function updateDelivery(req,res){
  let [err,delivery]=await get(models.Delivery.update({
    id_persona: req.body.id_persona,
    updatedAt: Date.now(),
    
    accion: 'U',
    accion_usuario: 'Edito un delivery.',
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
  if(delivery==null) return res.status(404).json({message: `Deliverys nulos`})
  res.status(200).json(delivery)
}

async function deleteDelivery(req,res){
  let [err,delivery]=await get(models.Delivery.update({
    estado: 'I',

    accion_usuario: 'Elimino un delivery.',
    accion: 'D',
    ip: req.ip
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `Error en el servidor ${err}`})
  if(delivery==null) return res.status(404).json({message: `Deliverys nulos`})
  res.status(200).json(delivery)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getDeliverys,
  getDelivery,
  createDelivery,
  createAllDelivery,
  updateDelivery,
  deleteDelivery
}