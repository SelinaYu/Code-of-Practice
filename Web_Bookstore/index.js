var express = require('express');
var app = express();
var router = express.Router();
//截取Get请求方式的url中含有/login的请求
router.get('/login', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'sa',
        password: 'root',
        server: 'localhost', 
        database: 'Web_Bookstore' 
    };
    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);
        console.log(req.query);
        console.log(req.body);
        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        // request.query('select * from Book ', function (err, recordset) {
            
        //     if (err) console.log(err)

        //     // send records as a response
        //     res.send(recordset);
        //     // res.status(200).json(recordset);
            
        // });
    const accountID = 80;
    const newPassword = 123;
    sql.query`update  Account set accountPsd=${newPassword} where accountID =${accountID}`
    .then(function(recordset){
     console.log(recordset);
     res.status(200).json({success:true});
    }).catch(function(err){
      console.log(err);
      res.status(500).json({success:false,message:'修改密码失败！'})
  });
    });
});
app.use('/login',router);

var server = app.listen(5000, function () {
    console.log('Server is running..');
});