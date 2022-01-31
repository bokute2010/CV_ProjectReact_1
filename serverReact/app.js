const express = require('express');
const app = express();


app.use('/hi',(req,res)=>{
    console.log('Hi')
})

app.listen(3000)