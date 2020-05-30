'use strict'
const express=require('express')
const router=express.Router()
const medioComunicacion=require('../controllers/medioComunicacion')
const auth=require('../middlewares/auth')

/**
 * @swagger
 * /MedioComunicacion/:
 *  get:
 *    tags: [MedioComunicacion]
 *    description: Obtiene todos los MedioComunicacions.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',medioComunicacion.getMedioComunicacions)
router.get('/id/:id',medioComunicacion.getMedioComunicacion)
router.post('/create',medioComunicacion.createMedioComunicacion)
router.post('/createAllMedioComunicacion',medioComunicacion.createAllMedioComunicacion)
router.put('/update', medioComunicacion.updateMedioComunicacion)
router.delete('/delete/:id', medioComunicacion.deleteMedioComunicacion)

module.exports=router
/** 
* @swagger
*definitions:
*  MedioComunicacion:           
*    type: object
*    required:
*      - cod_MedioComunicacion
*    properties:
*      cod_MedioComunicacion:
*        type: integer
*      nombre_MedioComunicacion:
*        type: string
*      clave_MedioComunicacion:
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