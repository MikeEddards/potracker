const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const port = 4000
const app = express()
app.use(cors())
app.use(express.json())

var db = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'po_tracker'
  });
  
    app.get('/api/getpolist',(req,res)=>{
      // connection.connect();
      db.query('SELECT * FROM po_list ORDER BY id DESC LIMIT 10;', function (error, results, fields) {
        if (error) throw error;
        res.status(200).send(results)
      });
      // connection.end();
  })
   



  app.listen(port, () => console.log(`All ears on port: ${port}`)) 