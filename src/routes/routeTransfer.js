const {Router }=require('express');
const router=Router();
const {generateAddres,redTangle,recibirArchivo,desencritarArchivo}=require('../controllers');
/**
 * @swagger
 * /generateAddress:
 *   post:
 *     summary: Genera una dirección IOTA a partir de un seed
 *     description: Genera una dirección IOTA válida a partir de un seed proporcionado.
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             seed:
 *               type: string
 *         description: El seed IOTA para generar la dirección.
 *     responses:
 *       200:
 *         description: Dirección generada exitosamente.
 *       400:
 *         description: Faltan datos necesarios en la solicitud.
 *       500:
 *         description: Error al generar la dirección.
 */

  
/**
 * @swagger
 * /redTangle:
 *   post:
 *     summary: Encriptar y enviar un archivo a la red Tangle
 *     description: Encripta un archivo y lo envía a la red Tangle.
 *     parameters:
 *       - name: file
 *         in: body
 *         description: Archivo a encriptar y enviar.
 *         required: true
 *         schema:
 *           type: string
 *       - name: address
 *         in: body
 *         description: Dirección en la red Tangle.
 *         required: true
 *         schema:
 *           type: string
 *       - name: encryptionKey
 *         in: body
 *         description: Clave de encriptación.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transacción enviada con éxito.
 *       400:
 *         description: Faltan datos necesarios en la solicitud.
 *       500:
 *         description: Error al procesar la solicitud.
 */
/**
 * @swagger
 * /decryptFile:
 *   post:
 *     summary: Desencripta un archivo
 *     description: Desencripta un archivo utilizando una clave de encriptación proporcionada.
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             encryptedFile:
 *               type: string
 *             encryptionKey:
 *               type: string
 *         description: Los datos encriptados del archivo y la clave de encriptación.
 *     responses:
 *       200:
 *         description: Archivo desencriptado con éxito.
 *       500:
 *         description: Error al desencriptar el archivo.
 */

router.get('/recibir',recibirArchivo);
router.post('/decryptFile',desencritarArchivo);
router.post('/generateAddress',generateAddres);
router.post('/redTangle',redTangle);

module.exports=router;