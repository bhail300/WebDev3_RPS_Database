const express = require("express")
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db');



db.run('CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, name varchar(15), wins int)')

const app = express()
app.use(cors())

var user=""

var scores=[]

app.get('/',(req,res)=>{
    res.end()
}) 



app.get('/add-user',(req,res)=>{
    user = req.query.name
    wins = req.query.win
    //update instead
    db.run(`INSERT INTO users (name, wins) values (?, ?)`, [user, wins])
    db.all("SELECT * from users ORDER BY wins DESC", (err, row)=>{
            console.log(row)
        })
    res.end()
})

app.get('/load-scores',(req,res)=>{
    db.all("SELECT * from users ORDER BY wins DESC", (err, row)=>{
        console.log(row)
        res.json(row)
    })
    
})  

app.listen(3001)