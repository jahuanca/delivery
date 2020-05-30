'use strict'
const express=require('express')
const router=express.Router()
const pedido=require('../controllers/pedido')
const auth=require('../middlewares/auth')

/**
 * @swagger
 * /Pedido/:
 *  get:
 *    tags: [Pedido]
 *    description: Obtiene todos los Pedidos.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',pedido.getPedidos)
router.get('/id/:id',pedido.getPedido)
router.post('/create',pedido.createPedido)
router.post('/createAllPedido',pedido.createAllPedido)
router.put('/update', pedido.updatePedido)
router.delete('/delete/:id', pedido.deletePedido)

module.exports=router
/** 
* @swagger
*definitions:
*  Pedido:           
*    type: object
*    required:
*      - cod_Pedido
*    properties:
*      cod_Pedido:
*        type: integer
*      nombre_Pedido:
*        type: string
*      clave_Pedido:
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