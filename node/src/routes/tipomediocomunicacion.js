'use strict'
const express=require('express')
const router=express.Router()
const tipoMedioComunicacion=require('../controllers/tipoMedioComunicacion')
const auth=require('../middlewares/auth')

/**
 * @swagger
 * /TipoMedioComunicacion/:
 *  get:
 *    tags: [TipoMedioComunicacion]
 *    description: Obtiene todos los TipoMedioComunicacions.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',tipoMedioComunicacion.getTipoMedioComunicacions)
router.get('/id/:id',tipoMedioComunicacion.getTipoMedioComunicacion)
router.post('/create',tipoMedioComunicacion.createTipoMedioComunicacion)
router.post('/createAllTipoMedioComunicacion',tipoMedioComunicacion.createAllTipoMedioComunicacion)
router.put('/update', tipoMedioComunicacion.updateTipoMedioComunicacion)
router.delete('/delete/:id', tipoMedioComunicacion.deleteTipoMedioComunicacion)

module.exports=router
/** 
* @swagger
*definitions:
*  TipoMedioComunicacion:           
*    type: object
*    required:
*      - cod_TipoMedioComunicacion
*    properties:
*      cod_TipoMedioComunicacion:
*        type: integer
*      nombre_TipoMedioComunicacion:
*        type: string
*      clave_TipoMedioComunicacion:
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