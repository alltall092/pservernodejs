const express=require('express');
const app=express();
const {TransferRoutes}=require('./routes');
const cors=require('cors');
require("dotenv").config();
app.use(express.json());
app.use(cors());


app.use("/api/v1",TransferRoutes);


app.get("/", (req, res) => {
    res.send("Hello World!");
    
    res.end();
  });



module.exports=app;