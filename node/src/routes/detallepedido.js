'use strict'
const express=require('express')
const router=express.Router()
const detallePedido=require('../controllers/detallePedido')
const auth=require('../middlewares/auth')

/**
 * @swagger
 * /DetallePedido/:
 *  get:
 *    tags: [DetallePedido]
 *    description: Obtiene todos los DetallePedidos.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',detallePedido.getDetallePedidos)
router.get('/id/:id',detallePedido.getDetallePedido)
router.post('/create',detallePedido.createDetallePedido)
router.post('/createAllDetallePedido',detallePedido.createAllDetallePedido)
router.put('/update', detallePedido.updateDetallePedido)
router.delete('/delete/:id', detallePedido.deleteDetallePedido)

module.exports=router
/** 
* @swagger
*definitions:
*  DetallePedido:           
*    type: object
*    required:
*      - cod_DetallePedido
*    properties:
*      cod_DetallePedido:
*        type: integer
*      nombre_DetallePedido:
*        type: string
*      clave_DetallePedido:
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