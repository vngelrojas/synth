import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose'

const app = require('express')();
dotenv.config();


// Mongoose setup
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL,
{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>
{
    app.listen(PORT,() => console.log(`Server running on port ${PORT}`));
}).catch((error) => console.log(`${error}`));