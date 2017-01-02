import express from 'express';
import sql from 'mssql';
import config from '../config';
import uuid from 'uuid';

const app = express();
const apiRoutes = express.Router();


//登录请求
apiRoutes.post('/login',function(req,res){
  let account = req.body.username;
  let password = req.body.password;
   sql.query`select * from Account where accountName =${account}`.then(function(user){
    console.log(user);
    if(user.length == 0){
    	res.status(200).json({success:false,message:'登陆失败，没有该用户！'});
    }else if(user.length!=0){
    	if(user[0].accountPsd != password ){
    		res.status(200).json({success:false,message:'登陆失败，密码错误！'})
    	}else{
      res.status(200).json({
        success:true,
        message:'登录成功',
        userId:user[0].accountID,
        accountRight:user[0].accountRight
      });
    }
    }
  }).catch(function(err){
  	  console.log(err);
  });
});
//获取所有书籍信息
apiRoutes.get('/books',(req,res) => {
    new sql.Request().query('select * from Book',function(err,books){
            if (err) console.log(err)
            // send records as a response
            // res.send(recordset);
            res.status(200).json(books);
    })
});
//获取书店信息
apiRoutes.get('/getBookstoreInfo',(req,res) => {
    new sql.Request().query('select * from Bookstore_Inf',function(err,bookstoreInfo){
            if (err) console.log(err)
            res.status(200).json(bookstoreInfo);
    })    
});
apiRoutes.post('/register',(req,res) => {
  const accountName = req.body.accountName;
  const accountPsd = req.body.accountPsd;
  const accountSex = req.body.accountSex;
  const accountTele = req.body.accountTele;
  const accountRight = 3;//3表示用户
  console.log(accountSex)
  sql.connect(config,function(err){
   const request = new sql.Request();
     // request.on('info',function(info){
     //  console.dir(info);
     // });
     // request.query("insert into Account values('寒冰',123,'女',3,123456777)",function(err,recordset){
     //  if(err) {
     //    console.log(err)
     //    res.status(500).json({success:false,message:'保存用户信息失败！'})
     //  }else{
     //    console.log(recordset)
     //   res.status(200).json({success:true})
     //  }
     // })
     request
    .input('accountName',sql.NVarChar(50),accountName)
    .input('accountPsd',sql.VarChar(20),accountPsd)
    .input('accountRight',sql.Char(1),accountRight)
    .input('accountSex',sql.NVarChar(2),accountSex)
    .input('accountTele',sql.VarChar(16),accountTele)
    .execute('addUser',function(err,recordsets,returnValue){
      console.log(recordsets);
      console.log(returnValue);
      if(err) {
        console.log(err)
        res.status(500).json({success:false,message:'保存用户信息失败！'})
      };
      res.status(200).json({success:true})
    })
  })
})
export default apiRoutes;
