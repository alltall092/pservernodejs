
const { composeAPI, generateAddress,prepareTransfers, sendTrytes,getBalances } = require('@iota/core');
//const { composeAPI, generateAddress, prepareTransfers, sendTrytes } = require('iota.js');

const fs = require('fs/promises');
const path = require('path'); 
const crypto = require('crypto');
const generateSeed = require('iota-generate-seed');

// Genera una semilla aleatoria de 81 caracteres



// Configurar la dirección del nodo
const iota = composeAPI({
  provider: 'https://nodes.thetangle.org:443' // Usar un nodo público de IOTA
});



const generateAddres = (req,res) => {
  //ingesar tu seed 
  const seed = req.body;
  if (seed) {
    const iota = composeAPI({
      provider: 'https://nodes.iota.org:443', // Cambia a tu proveedor de nodos IOTA preferido
    });

    const options = {
      index: 0, // El índice de la dirección que deseas generar
      security: 2, // Nivel de seguridad (1, 2, o 3)
    };

    generateAddress(iota, seed, options)
      .then((address) => {
        const response = {
          message: 'Dirección generada exitosamente',
          address: address,
        };
        res.status(200).json(response);
      })
      .catch((error) => {
        const response = {
          message: 'Error al generar la dirección',
          error: error,
        };
        res.status(500).json(response);
      });
  } else {
    const response = {
      message: 'Ingresa un seed válido',
    };
    res.status(400).json(response);
  }
};

const redTangle= async (req,res)=>{
  const { file, address, encryptionKey } = req.body;

  if (!file || !address || !encryptionKey) {
    return res.status(400).json({ message: 'Faltan datos necesarios en la solicitud.' });
  }

  try {
    const fileContent = Buffer.from(file, 'base64').toString();
    const encrypted = CryptoJS.AES.encrypt(fileContent, encryptionKey).toString();

    const iota = composeAPI({
      provider: 'https://nodes.devnet.iota.org', // Cambia a la red principal cuando sea necesario
    });

    const transfers =  prepareTransfers([encrypted], [{ address, value: 0 }]);
    const trytes = await sendTrytes(iota, transfers, 3, 9);

    return res.status(200).json({ message: 'Transacción enviada con éxito', trytes });
  } catch (error) {
    return res.status(500).json({ message: 'Error al procesar la solicitud', error: error.message });
  }

}






const desencritarArchivo= async (req,res)=>{
  const { encryptedFile, encryptionKey } = req.body;
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedFile, encryptionKey);
    const decryptedFile = bytes.toString(CryptoJS.enc.Utf8);
    // Aquí puedes guardar o manipular el archivo desencriptado
    console.log('Archivo desencriptado:', decryptedFile);
    res.send('Archivo desencriptado con éxito');
  } catch (error) {
    console.error('Error al desencriptar el archivo:', error);
    res.status(500).send('Error al desencriptar el archivo');
  }
 



}
const recibirArchivo= async (req,res)=>{

  try {
    const bundleHash = req.body.bundleHash; // El bundle hash proporcionado en el cuerpo de la solicitud

    const response = await iota.findTransactionObjects({ bundles: [bundleHash] });

    if (response.length === 0) {
      res.status(404).json({ error: 'No se encontraron transacciones para el bundle hash proporcionado.' });
      return;
    }

    // Recorre las transacciones y descifra los trytes
    response.forEach((tx) => {
      const mensajeCifrado = tx.signatureMessageFragment;

      if (mensajeCifrado) {
        const trytes = mensajeCifrado.replace(/9+$/, ''); // Elimina trytes de relleno
        const mensajeDescifrado = iota.utils.fromTrytes(trytes);

        try {
          const objetoJSON = JSON.parse(mensajeDescifrado);
          res.status(200).json(objetoJSON); // Responder con el JSON descifrado y código 200
        } catch (error) {
          res.status(400).json({ error: 'No se pudo parsear el JSON.' });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al recibir y descifrar los datos.' });
  }


}

module.exports={generateAddres,redTangle,desencritarArchivo,recibirArchivo}