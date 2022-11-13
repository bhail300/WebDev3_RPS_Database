// Database 
const express = require("express")
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db');



db.run('CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, name varchar(15) UNIQUE, password varchar(255), wins int)')

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
    password = req.query.pass
    console.log(password)
    //update instead
    db.run(`INSERT OR IGNORE INTO users (name, password, wins) values (?, ?, ?)`, [user, password, 0])
    
    db.all("SELECT * from users ORDER BY wins DESC", (err, row)=>{
 
    })
    db.all("SELECT * from users WHERE name=? AND password=?", [user, password], (err, row)=>{
            console.log(row)
            
            if (row == []) {
                res.json(" ")
                
            }else{res.json(row)}
        })

})

app.get('/load-scores',(req,res)=>{
    db.all("SELECT * from users ORDER BY wins DESC", (err, row)=>{
        res.json(row)
    })
    
})  

app.get('/add-point',(req,res)=>{
    user = req.query.id
    console.log(user)
    db.run(`UPDATE users SET wins = wins + .5 WHERE id=?`, [user] )
    res.end()
})  

app.listen(3001)