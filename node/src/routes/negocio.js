'use strict'
const express=require('express')
const router=express.Router()
const negocio=require('../controllers/negocio')
const auth=require('../middlewares/auth')

/**
 * @swagger
 * /Negocio/:
 *  get:
 *    tags: [Negocio]
 *    description: Obtiene todos los Negocios.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',negocio.getNegocios)
router.get('/id/:id',negocio.getNegocio)
router.post('/create',negocio.createNegocio)
router.post('/createAllNegocio',negocio.createAllNegocio)
router.put('/update', negocio.updateNegocio)
router.delete('/delete/:id', negocio.deleteNegocio)

module.exports=router
/** 
* @swagger
*definitions:
*  Negocio:           
*    type: object
*    required:
*      - cod_Negocio
*    properties:
*      cod_Negocio:
*        type: integer
*      nombre_Negocio:
*        type: string
*      clave_Negocio:
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