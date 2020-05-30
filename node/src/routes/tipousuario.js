'use strict'
const express=require('express')
const router=express.Router()
const tipoUsuario=require('../controllers/tipoUsuario')
const auth=require('../middlewares/auth')

/**
 * @swagger
 * /TipoUsuario/:
 *  get:
 *    tags: [TipoUsuario]
 *    description: Obtiene todos los TipoUsuarios.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',tipoUsuario.getTipoUsuarios)
router.get('/id/:id',tipoUsuario.getTipoUsuario)
router.post('/create',tipoUsuario.createTipoUsuario)
router.post('/createAllTipoUsuario',tipoUsuario.createAllTipoUsuario)
router.put('/update', tipoUsuario.updateTipoUsuario)
router.delete('/delete/:id', tipoUsuario.deleteTipoUsuario)

module.exports=router
/** 
* @swagger
*definitions:
*  TipoUsuario:           
*    type: object
*    required:
*      - cod_TipoUsuario
*    properties:
*      cod_TipoUsuario:
*        type: integer
*      nombre_TipoUsuario:
*        type: string
*      clave_TipoUsuario:
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