const express=require('express');
const app=express();
const {TransferRoutes}=require('./routes');
const db = require("./utils/db");
const bodyParser = require('body-parser');
const initModels = require("./models/initModel");
const cors=require('cors');
require("dotenv").config();
app.use(express.json());
app.use(cors());
db.authenticate()
  .then(() => console.log("Autenticac..ión exitosa"))
  .catch((error) => console.log(error));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json()); 
db.sync({ force: false })
  .then(() => console.log("Base de datos sincronizada"))
  .catch((error) => console.log(error));

initModels();

app.use("/api/v1",TransferRoutes);


app.get("/", (req, res) => {
    res.send("Hello World!");
    
    res.end();
  });



module.exports=app;