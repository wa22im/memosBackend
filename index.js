import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import  api from"./api/index.js"
import auth from './middleware/auth.js'
import 'dotenv/config'
import SwaggerParser from 'swagger-parser';
import { connector } from 'swagger-routes-express';
import { documentation } from './middleware/documentation.js';
import logger from './middleware/logger.js';
const app = express () ; 



const parser = new SwaggerParser()

const apiDefinitionLocation = "./api/api.yaml"
const apiDescription = await parser.validate(apiDefinitionLocation) //parse
app.use(documentation)
app.use(bodyParser.json({limit :'30mb' , extended:true}))
app.use(bodyParser.urlencoded({limit :'30mb' , extended:true}))
app.use(cors()) ; 
app.use(logger)
app.use(auth)
const connect = connector(api, apiDescription)

app.get('/',(req,res)=>{
  res.send("APP IS WORKING")
})
connect(app)
const connection_url = `mongodb+srv://${process.env.userNameDB}:${process.env.mongoosePwdUser0}@cluster0.2ftmg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const PORT = process.env.PORT|| 5002;

mongoose.connect(connection_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);


