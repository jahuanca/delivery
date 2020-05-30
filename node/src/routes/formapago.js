'use strict'
const express=require('express')
const router=express.Router()
const formaPago=require('../controllers/formaPago')
const auth=require('../middlewares/auth')

/**
 * @swagger
 * /FormaPago/:
 *  get:
 *    tags: [FormaPago]
 *    description: Obtiene todos los FormaPagos.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',formaPago.getFormaPagos)
router.get('/id/:id',formaPago.getFormaPago)
router.post('/create',formaPago.createFormaPago)
router.post('/createAllFormaPago',formaPago.createAllFormaPago)
router.put('/update', formaPago.updateFormaPago)
router.delete('/delete/:id', formaPago.deleteFormaPago)

module.exports=router
/** 
* @swagger
*definitions:
*  FormaPago:           
*    type: object
*    required:
*      - cod_FormaPago
*    properties:
*      cod_FormaPago:
*        type: integer
*      nombre_FormaPago:
*        type: string
*      clave_FormaPago:
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