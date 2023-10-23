
const { composeAPI, generateAddress,prepareTransfers,Converter, sendTrytes,createPrepareTransfers, createSendTransfer,getBalances } = require('@iota/core');
//const { composeAPI, generateAddress, prepareTransfers, sendTrytes } = require('iota.js');
const { asciiToTrytes } = require('@iota/converter');
const Iota = require('@iota/core');
const fs = require('fs/promises');
const path = require('path'); 
const CryptoJS = require('crypto-js');
const crypto = require('crypto');
const {GuardarArchivo}=require('../models');
//const generateSeed = require('iota-generate-seed');

// Genera una semilla aleatoria de 81 caracteres


//const iota = Iota.composeAPI({
//provider: 'https://nodes.devnet.thetangle.org:443'
 //});
 const iota=Iota.composeAPI({
  //provider: 'https://nodes.devnet.thetangle.org:443'
  provider: 'https://node.tangle.works:443'
  //provider: 'https://n1.iota.nu:443'
//provider: 'https://iota.dance/'
  })
  
   iota
  .getNodeInfo()
  .then(response => console.log(response))
  .catch(err => {
  console.error(err)
  })

const seed = "YDHCHPMDQHWVVVLFMISSAPOWR9QAJAR99SSQEZPGMS9KRVXAJWTHEGTTUXMPOWSUNWTHMKHTZD9GXF9VR";  


const guardarDatos=(datos)=>{
  
  const archivo= GuardarArchivo.create({
    namefile: datos.namefile,
    desencriptado:datos.desencriptado,
    encryptationKey:datos.encryptationKey,
    direccion: datos.direccion,
    value:datos.value,
    status:datos.status,
  });

return archivo;


}
 function generateAddresses(seed,index) {
  const Address =  generateAddress(seed, index);
    return Address;
}
const generateAddres = (req,res) => {

 const address=  generateAddresses(seed,0);
 
 return res.status(200).json(address);
};


const encryptarArchivo=(req,res)=>{

const { file,encryptionKey } = req.body;

if (file) {
 
  
  // Crear un objeto de cifrado
  const cifrador = crypto.createCipher('aes-256-cbc', encryptionKey);

// Cifrar los datos
let encrypted = cifrador.update(file, 'utf8', 'hex');
encrypted += cifrador.final('hex');
//




  return res.status(200).json(encrypted);
} else {
  // Handle the case where 'file' is not defined.
  return res.status(400).json({ error: 'File is missing or undefined' });
}

}

const redTangle= async (req,res)=>{
  const { address,encryptionKey,encrypted,file } =req.body;
  console.log(encryptionKey);

 
  if (seed) {




const options = {
  inputs: [
  
      {
        address: 'XB9IBINADVMP9K9FEIIR9AYEOFUU9DP9EBCKOTPSDVSNRRNVSJOPTFUHSKSLPDJLEHUBOVEIOJFPDCZS9',
        balance: 1500,
        keyIndex: 0,
        security: 3
    }, {
        address: 'W9AZFNWZZZNTAQIOOGYZHKYJHSVMALVTWJSSZDDRVEIXXWPNWEALONZLPQPTCDZRZLHNIHSUKZRSZAZ9W',
        balance: 8500,
        keyIndex: 7,
        security: 2
    }
],
  remainderAddress:address
};

try {



// const iota = composeAPI({
  //provider: 'https://nodes.devnet.iota.org', // Cambia a la red principal cuando sea necesario
  //});
  const prepareTransfers = await Iota.createPrepareTransfers();
  const transfers  =await prepareTransfers(seed,  [{ address: address,
    value: 1 ,
    message:asciiToTrytes(encrypted)}] ,options);
    trytes=iota.sendTrytes(transfers, 3, 9).then(bundle=>{

  const transfer=  bundle.map(transaction  => {
    
    return{
      address: transaction.address,
      value: transaction.value,
      message: transaction.signatureMessageFragment
    };
    console.log(transfer);
  });

    res.json('Transfers (transferencias) en el bundle:', transfer).status(200);


iota.getBundle(trytes)
  .then(bundleObjects => {
    if (bundleObjects.length > 0) {
      const primerBundleHash = bundleObjects[0].hash;
     return res.status(200).json('Hash de la primera transacción del bundle:', primerBundleHash);
    } else {
      return res.status(500).json('No se encontraron transacciones para el bundle especificado.');
    }
  })
  .catch(err => {
    console.error('Error al obtener el bundle:', err);
  });



})
const descifrador = crypto.createDecipher('aes-256-cbc', encryptionKey);
let datosDescifrados = descifrador.update(encrypted, 'hex', 'utf8');
datosDescifrados += descifrador.final('utf8');

console.log('Datos descifrados:', datosDescifrados)
  console.log(datosDescifrados);
 
const datos = {
  namefile: file,
  desencriptado: datosDescifrados,
  encryptationKey: encryptionKey,
  direccion: address,
  value: 1,
  status: true, // O false según tus necesidades
};
 const s=guardarDatos(datos);
  return res.status(200).json({ message: 'Transacción enviada con éxito', trytes,s });
} catch (error) {
  return res.status(500).json({ message: 'Error al procesar la solicitud', error: error.message });
}  
  
  }

  

}






const desencritarArchivo= async (req,res)=>{
  const ciphertext = "hola mundo" // Datos cifrados enviados en el cuerpo de la solicitud
  const key = 'TuClaveDeCifrado'; // Reemplaza con tu clave de cifrado

  // Descifrar los datos
  const bytes = CryptoJS.AES.decrypt(ciphertext, key);
  const datosDescifrados = bytes.toString(CryptoJS.enc.Utf8);

  // Crear una respuesta JSON y enviarla con un estado de 200 OK
  res.status(200).json({ datosDescifrados });

 



}
const recibirArchivo= async (req,res)=>{
try{
 const archivo= await GuardarArchivo.findAll();
 return res.json(archivo).status(200);
}catch(err){
console.log("error",err);

}


}
const eliminar = async (req, res) => {
  const  {id}= req.params;
  const { ids } = req.body;
 console.log(ids);
  try {
    await GuardarArchivo.destroy({
      where: {
       id
      }
    });
    res.status(200).json({ message: "Archivo eliminado con éxito" });
  } catch (error) {
 
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const eliminarByCheckbox = async (req, res) => {

  const { ids } = req.body;
 console.log(ids);
  try {
    await GuardarArchivo.destroy({
      where: {
       id:ids,
      }
    });
    res.status(200).json({ message: "Archivo eliminado con éxito" });
  } catch (error) {
 
    res.status(500).json({ error: "Error interno del servidor" });
  }
};



module.exports={generateAddres,redTangle,desencritarArchivo,encryptarArchivo,recibirArchivo,eliminar,eliminarByCheckbox}