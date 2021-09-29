require('dotenv').config()
const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const {
  SERVER_PORT,
  HOST,
  USER,
  PASSWORD,
  DATABASE
} = process.env

const app = express()
app.use(cors())
app.use(express.json())

var db = mysql.createPool({
    host     : HOST,
    user     : USER,
    password : PASSWORD,
    database : DATABASE
  });

  app.get('/api/getpolist',(req,res)=>{
    db.query('SELECT * FROM po_list ORDER BY id DESC LIMIT 10;', function (err, results, fields) {
      if (err) throw err;
      res.status(200).send(results)
    });
  })

  app.post('/api/skusearch',(req,res)=>{
    db.query('SELECT * FROM sku_list WHERE SKU = ?',[req.body.SKU],function (err, results){
      if(err) throw err
      res.status(200).send(results)
    })
  })

  app.post('/api/addpo',(req,res)=>{
    const {po,sku,model,serial_number} = req.body
    db.query('INSERT INTO po_list (po,sku,model,serial_number) VALUES (?,?,?,?)',[po,sku,model,serial_number],function(err,results){
      if(err) throw err
      res.sendStatus(200)
    })
  })

   


  app.listen(SERVER_PORT, () => console.log(`All ears on port: ${SERVER_PORT}`)) 