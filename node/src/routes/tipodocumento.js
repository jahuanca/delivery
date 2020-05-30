'use strict'
const express=require('express')
const router=express.Router()
const tipoDocumento=require('../controllers/tipoDocumento')
const auth=require('../middlewares/auth')

/**
 * @swagger
 * /TipoDocumento/:
 *  get:
 *    tags: [TipoDocumento]
 *    description: Obtiene todos los TipoDocumentos.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',tipoDocumento.getTipoDocumentos)
router.get('/id/:id',tipoDocumento.getTipoDocumento)
router.post('/create',tipoDocumento.createTipoDocumento)
router.post('/createAllTipoDocumento',tipoDocumento.createAllTipoDocumento)
router.put('/update', tipoDocumento.updateTipoDocumento)
router.delete('/delete/:id', tipoDocumento.deleteTipoDocumento)

module.exports=router
/** 
* @swagger
*definitions:
*  TipoDocumento:           
*    type: object
*    required:
*      - cod_TipoDocumento
*    properties:
*      cod_TipoDocumento:
*        type: integer
*      nombre_TipoDocumento:
*        type: string
*      clave_TipoDocumento:
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