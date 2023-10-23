const db = require("../utils/db");
const { DataTypes } = require("sequelize");




const ArchivoDecencriptado = db.define(
  "ArchivoDecencriptado",
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
        transacionHash: {
          type: DataTypes.STRING,
          allowNull: false,
       
        },
         clavencryptacion:{type:DataTypes.STRING,
            allowNull:false,
        
            },
            status:{type:DataTypes.BOOLEAN,
                allowNull:false,
                defaultValue: true,
            
                },

  },{
    timestamps: false
  });

  module.exports=ArchivoDecencriptado;