require('dotenv').config()
const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const {PORT,HOST,USER,PASSWORD,DATABASE} = process.env

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
      // connection.connect();
      db.query('SELECT * FROM po_list ORDER BY id DESC LIMIT 10;', function (error, results, fields) {
        if (error) throw error;
        res.status(200).send(results)
      });
      // connection.end();
  })
   



  app.listen(PORT, () => console.log(`All ears on port: ${PORT}`)) 