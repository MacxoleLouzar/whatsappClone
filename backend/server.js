//importing
import  express  from "express";
import mongoose from 'mongoose';
import Messages from "./DbMessages.js";
import Pusher from 'pusher';

//app config
const app = express();
const port = process.env.PORT || 8000

const pusher = new Pusher({
    appId: "1555527",
    key: "7490e84e7b5eac61be24",
    secret: "34a05e246036d6accbe1",
    cluster: "eu",
    useTLS: true
  });

  const db = mongoose.connection;
  db.once('open', ()=>{
    console.log('Db connected');

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch()

    changeStream.on("change", (change)=>{
        console.log('a change occured',change);

        if(change.operationType === 'insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger("message","insert", {
                name: messageDetails.name,
                message: messageDetails.message,
            });
        }
        else{
            console.log("Error triggered Pusher")
        }
    });
  });


//middleware
app.use(express.json())

//DB config
const connect_url = 'mongodb+srv://admin:P123456789@cluster0.fsjw8bb.mongodb.net/whatsappDb?retryWrites=true&w=majority'
mongoose.connect(connect_url,{
   // useCreateIndex: true,
   // useNewUrlParse:true,
    useUnifiedTopology: true,
});

//???

//api routes
app.get('/',(req, res)=>res.status(200).send("Hello world"));

app.get('/api/message/sync',(req, res)=>{
    Messages.find((err, data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})

app.post('/api/message',(req, res) =>{
    const addMessage = req.body;

    Messages.create(addMessage, (err, data)=>{
        if(err){
            res.status(500).send(err)
        }else{
           res.status(201).send(data) 
        }
    })
});
//app listen
app.listen(port, () => console.log(`Listening on localhost:${port}`));










// require(`dotenv`).config()
// const express = require('express')
// const app = express()
// const cors = require('cors')
// const PORT = process.env.PORT = 8000

// app.use(cors())
// app.use(express.json())

// app.use('/', ()=>{
//     console.log('server is running!')
// })

// app.listen(PORT, ()=>{
//     console.log(`server is working http://localhost:${PORT}`)
// })