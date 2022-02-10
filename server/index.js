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

    db.query('SELECT distinct po from po_list ORDER BY po DESC LIMIT 10;', function (err, results, fields) {

      // Some function to filter dup results
      
   
    

      // if (err) throw err;
      res.status(200).send(results)
    });
  })

  app.post('/api/skusearch',(req,res)=>{
    db.query('SELECT * FROM sku_list WHERE SKU = ?',[req.body.SKU],function (err, results){
      if(err) throw err
      if(results.length > 0){
        res.status(200).send(results)
      }else if(!results.length){
        res.status(200).send('No SKU')
      }
    })
  })

  app.post('/api/addpo',(req,res)=>{
    let {po,sku,parts,line} = req.body
    parts = JSON.stringify(parts)
    db.query('INSERT INTO po_list (po,sku,parts,line) VALUES (?,?,?,?)',[po,sku,parts,line],function(err,results){
      if(err) console.log(err)
      res.sendStatus(200)
    })
  })

  app.post('/api/getpo',(req,res)=>{
    const {po} =req.body
   
    db.query('SELECT * FROM po_list WHERE po = ?;',[po],(err,results)=>{
      if(err) throw err
      if(results.length == 0){
        res.status(200).send('Not Listed')
      }else{
        res.status(200).send(results)
      }
    })
  })

  app.post('/api/checkpo',(req,res)=>{
    const {po} = req.body
    db.query('SELECT * FROM po_list WHERE po = ?',[po],(err,results)=>{
      if(err) throw err
      if(results.length == 0){
        res.status(200).send(false)
      }else{
        res.status(200).send(true)
      }
    })
  })

  app.post('/api/snsearch',(req,res)=>{
    const {sn} = req.body
    db.query("SELECT * from po_list where JSON_SEARCH(parts, 'all',?);",[sn],(err,results)=>{
      if(err) throw err
      if(results.length == 0){
        res.status(200).send('Not Listed')
      }else{
        res.status(200).send(results)
      }
    })
  })

  app.post('/api/deletesku',(req,res)=>{
    const {id,po} = req.body
    db.query("DELETE FROM po_list WHERE id = ?;",[id],(err,results)=>{
      if(err) throw err
      db.query("SELECT * FROM po_list WHERE po = ?;",[po],(err,results)=>{
        if(err) throw err
        res.status(200).send(results)
      })
    })
  })

  app.post('/api/printso', async (req,res)=>{
    const {soList} = req.body
    let returningSo = []
   await soList.forEach(so=>{
      console.log(so)
      db.query("SELECT * FROM po_list WHERE po = ?",[so],(err,results)=>{
        // console.log(results)
        // results.forEach(part=>{
        //   // console.log(part)
        //   returningSo = [...returningSo,part]
        //   console.log(returningSo)
        // })
        returningSo = [...returningSo,results]
      
      })
    })
    // res.send(returningSo)
  })
   


  app.listen(SERVER_PORT, () => console.log(`All ears on port: ${SERVER_PORT}`)) 