const express = require('express');
const router = require('./routes/routes');
const { dbConnect } = require('./config/database');


require('dotenv').config();
const PORT = process.env.PORT || 4000

const app = express();

app.use(express.json());
 
app.use('/api/v1', router);

app.listen(3000, ()=>{
    console.log("hello world");
})

dbConnect();