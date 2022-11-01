const express = require("express")

const app = express()

app.get('/',(req,res)=>{
    console.log(req.query)
    console.log("hello")
    res.end()
})

app.listen(3000)