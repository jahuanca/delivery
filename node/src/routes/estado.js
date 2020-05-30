'use strict'
const express=require('express')
const router=express.Router()
const estado=require('../controllers/estado')
const auth=require('../middlewares/auth')

/**
 * @swagger
 * /Estado/:
 *  get:
 *    tags: [Estado]
 *    description: Obtiene todos los Estados.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',estado.getEstados)
router.get('/id/:id',estado.getEstado)
router.post('/create',estado.createEstado)
router.post('/createAllEstado',estado.createAllEstado)
router.put('/update', estado.updateEstado)
router.delete('/delete/:id', estado.deleteEstado)

module.exports=router
/** 
* @swagger
*definitions:
*  Estado:           
*    type: object
*    required:
*      - cod_Estado
*    properties:
*      cod_Estado:
*        type: integer
*      nombre_Estado:
*        type: string
*      clave_Estado:
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