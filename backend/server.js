const express=require("express");
const app=express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const cors=require("cors");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const authRoutes = require('./routes/auth');

const mongoose=require("mongoose");

mongoose.connect('mongodb+srv://20me02020:20me02020@cluster0.11ew6bg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.log(err));
app.use('/api/auth',authRoutes);
app.get('/',(req,res)=>{
    res.send("Hello World")
});
app.listen(5000,()=>{
    console.log("Server running on port 5000")
})