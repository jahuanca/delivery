'use strict'
const express=require('express')
const router=express.Router()
const pago=require('../controllers/pago')
const auth=require('../middlewares/auth')

/**
 * @swagger
 * /Pago/:
 *  get:
 *    tags: [Pago]
 *    description: Obtiene todos los Pagos.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',pago.getPagos)
router.get('/id/:id',pago.getPago)
router.post('/create',pago.createPago)
router.post('/createAllPago',pago.createAllPago)
router.put('/update', pago.updatePago)
router.delete('/delete/:id', pago.deletePago)

module.exports=router
/** 
* @swagger
*definitions:
*  Pago:           
*    type: object
*    required:
*      - cod_Pago
*    properties:
*      cod_Pago:
*        type: integer
*      nombre_Pago:
*        type: string
*      clave_Pago:
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