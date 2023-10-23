const db = require("../utils/db");
const { DataTypes } = require("sequelize");
/**
 * @swagger
 * components:
 *   schemas:
 *     GuardarArchivo:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Identificador único del archivo guardado.
 *         namefile:
 *           type: string
 *           description: Nombre del archivo.
 *         desencriptado:
 *           type: string
 *           description: Contenido desencriptado del archivo.
 *         encryptationKey:
 *           type: string
 *           description: Clave de encriptación utilizada para el archivo.
 *         direccion:
 *           type: string
 *           description: Dirección del archivo.
 *         value:
 *           type: integer
 *           description: Valor relacionado con el archivo.
 *         status:
 *           type: boolean
 *           description: Estado del archivo (verdadero o falso).
 *       example:
 *         id: 1
 *         namefile: "miarchivo.txt"
 *         desencriptado: "Contenido del archivo desencriptado."
 *         encryptationKey: "miclave123"
 *         direccion: "address"
 *         value: 42
 *         status: true
 */




const GuardarArchivo = db.define(
  "GuardarArchivo",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    namefile:{type:DataTypes.STRING,
        allowNull:false,
    
        },
    desencriptado: {
      type: DataTypes.STRING,
      allowNull: false,
   
    },
     encryptationKey:{type:DataTypes.STRING,
        allowNull:false,
    
        },
        direccion:{type:DataTypes.STRING,
          allowNull:false,
      
          },
          value:{type:DataTypes.INTEGER,
            allowNull:false,
        
            },
        status:{type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue: false,
        
            },
  

  },{
    timestamps: false
  });

  module.exports=GuardarArchivo;