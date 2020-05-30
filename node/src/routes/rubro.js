'use strict'
const express=require('express')
const router=express.Router()
const rubro=require('../controllers/rubro')
const auth=require('../middlewares/auth')

/**
 * @swagger
 * /Rubro/:
 *  get:
 *    tags: [Rubro]
 *    description: Obtiene todos los Rubros.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',rubro.getRubros)
router.get('/id/:id',rubro.getRubro)
router.post('/create',rubro.createRubro)
router.post('/createAllRubro',rubro.createAllRubro)
router.put('/update', rubro.updateRubro)
router.delete('/delete/:id', rubro.deleteRubro)

module.exports=router
/** 
* @swagger
*definitions:
*  Rubro:           
*    type: object
*    required:
*      - cod_Rubro
*    properties:
*      cod_Rubro:
*        type: integer
*      nombre_Rubro:
*        type: string
*      clave_Rubro:
*        type: string
*      esta_logueado:
*        type: boolean
*      fecha_registro:
*        type: date
*      responsable:
*        type: string
*      observaciones:
*        type: string
*      estado:
*        type: string
*      cambio_clave:
*        type: integer
*/