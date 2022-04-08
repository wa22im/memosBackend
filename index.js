import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'
import 'dotenv/config'
const app = express () ; 

app.use(bodyParser.json({limit :'30mb' , extended:true}))
app.use(bodyParser.urlencoded({limit :'30mb' , extended:true}))
app.use(cors()) ; 
app.use('/posts',postRoutes) 
app.use('/users',userRoutes) 
app.get('/',(req,res)=>{
  res.send("APP IS WORKING")
})
const connection_url = `mongodb+srv://${process.env.userNameDB}:${process.env.mongoosePwdUser0}@cluster0.2ftmg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const PORT = process.env.PORT|| 5002;

mongoose.connect(connection_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);
