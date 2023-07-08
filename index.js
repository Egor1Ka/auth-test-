const express = require('express');
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000;
const authRouter = require('./authRouter')

const app = express();

app.use(express.json())
app.use('/auth',authRouter)

const  start = async()=>{
    try{
        await mongoose.connect('mongodb+srv://egorzozulia:B$gZ7NJtjctq-Di@cluster0.x8t46v7.mongodb.net/auth?retryWrites=true&w=majority');
        app.listen(PORT,()=>{
            console.log('serwer work on port ' + PORT)
        })
    }catch(e){
        console.log(e)
    }
}

start()