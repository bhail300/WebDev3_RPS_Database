const express = require("express")
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db');

db.run('CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, name varchar(15),streak int)')

const app = express()

app.get('/',(req,res)=>{
    // db.each("SELECT * from users", (err, row)=>{
    //     res.send(row)
        
    // })
    res.end()
})  

app.get('/add-user',(req,res)=>{
    const name = req.query.name
    const streak = req.query.streak
    //update instead
    db.run(`INSERT INTO users (name,streak) values (?,?)`, [name, streak])

    db.each("SELECT * from users", (err, row)=>{
        console.log(row)
    })
    res.end()
})

app.get('/load-scores',(req,res)=>{
    res.json(db)
})  

app.listen(3001)