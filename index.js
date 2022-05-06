const express = require('express');
const app= express()
const port=process.env.PORT||5000
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

app.use(cors())
app.use(express.json())

const uri = "mongodb+srv://Pdb1:7gAbK86jTSLoX2Hn@cluster1.jrwtv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
 try{
   client.connect()

  const userInforamtion=client.db("Practice").collection("users")
  app.listen(port,(req,res)=> {
    console.log(' this is a port of',port)
  })
  ///// for get a new data from the user
  app.post('/user', async(req, res)=>{
          const newUser= req.body
          const result= await userInforamtion.insertOne(newUser)
          console.log(result)
          res.send(result)
  })
  ///for getting a exiting user
  app.get('/user', async(req,res)=>{
    const query={}
    const cursor= userInforamtion.find(query)
    const users = await cursor.toArray()
    res.send(users)
  })
  // for deletiting a user
  app.delete('/user/:id', async(req,res)=>{
    const id=req.params.id
    const query={_id:ObjectId(id)}
    const result = await userInforamtion.deleteOne(query)
    res.send(result)
  })
 }
 finally{

 }
}

run().catch(console.dir)