const {Router }=require('express');
const router=Router();
const multer = require('multer');
const upload = multer();

const {generateAddres,redTangle,recibirArchivo,desencritarArchivo,encryptarArchivo,eliminar,eliminarByCheckbox}=require('../controllers');

  /**
 * @swagger
 * /generateAddress:
 *   get:
 *     summary: Genera una dirección.
 *     responses:
 *       200:
 *         description: Dirección generada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
 */


  /**
/**
 * @swagger
 * /encryptado:
 *   post:
 *     summary: Cifrar un archivo utilizando una clave de cifrado.
 *     description: Cifra un archivo utilizando el algoritmo AES-256-CBC.
 *     tags:
 *       - Archivo
 *     parameters:
 *       - name: file
 *         in: body
 *         required: true
 *         schema:
 *           type: string
 *         description: Contenido del archivo a cifrar.
 *       - name: encryptionKey
 *         in: body
 *         required: true
 *         schema:
 *           type: string
 *         description: Clave de cifrado utilizada para cifrar el archivo.
 *     responses:
 *       200:
 *         description: Archivo cifrado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       400:
 *         description: Parámetros incorrectos o faltantes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
/**


/**
 * @swagger
 * /eliminar:
 *   delete:
 *     summary: Eliminar un archivo por su ID.
 *     parameters:
 *       - in: body
 *         name: id
 *         required: true
 *         description: ID del archivo a eliminar.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: El archivo se eliminó con éxito.
 */
/**
 * @swagger
 * /api/eliminar:
 *   delete:
 *     summary: Delete files based on selected IDs.
 *     tags:
 *       - File Management
 *     parameters:
 *       - in: body
 *         name: requestBody
 *         description: The request body containing an array of 'ids' to be deleted.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             ids:
 *               type: array
 *               items:
 *                 type: integer
 *               description: An array of file IDs to be deleted.
 *     responses:
 *       200:
 *         description: Files have been deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: An error message.
 */
/**
 * @swagger
 * /redTangle:
 *   post:
 *     summary: Enviar una transacción a la red Tangle y desencriptar datos.
 *     description: Envía una transacción a la red Tangle y luego desencripta datos con una clave de cifrado.
 *     tags:
 *       - Transacciones
 *     parameters:
 *       - name: address
 *         in: body
 *         required: true
 *         schema:
 *           type: string
 *         description: Dirección de la cartera a la que se enviará la transacción.
 *       - name: encryptionKey
 *         in: body
 *         required: true
 *         schema:
 *           type: string
 *         description: Clave de cifrado utilizada para desencriptar los datos.
 *       - name: encrypted
 *         in: body
 *         required: true
 *         schema:
 *           type: string
 *         description: Datos cifrados que se desencriptarán.
 *       - name: file
 *         in: body
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del archivo asociado a la transacción.
 *     responses:
 *       200:
 *         description: Transacción enviada con éxito y datos desencriptados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 trytes:
 *                   type: string
 *       500:
 *         description: Error al procesar la solicitud.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
/**
 * @swagger
 * /recibir:
 *   get:
 *     summary: Obtener la lista de archivos almacenados.
 *     description: Recupera la lista de archivos almacenados.
 *     responses:
 *       200:
 *         description: Lista de archivos almacenados.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   nombre:
 *                     type: string
 *                   tamaño:
 *                     type: number
 *                   fechaCreacion:
 *                     type: string
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */



router.get('/recibir',recibirArchivo);
router.post('/decryptFile',desencritarArchivo);
router.post('/generateAddress',generateAddres);
router.post('/redTangle',redTangle);
router.post('/encryptado',encryptarArchivo);
router.get('/eliminar/:id',eliminar);
router.delete('/eliminar',eliminarByCheckbox);
module.exports=router;