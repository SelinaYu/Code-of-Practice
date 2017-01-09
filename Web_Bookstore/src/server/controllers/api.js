import express from 'express';
import jwt from 'jsonwebtoken';
import sql from 'mssql';
import config from '../config';
import uuid from 'uuid';

const app = express();
const apiRoutes = express.Router();
app.set('superSecret',config.secret);

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
      const token = jwt.sign({username:account},app.get('superSecret'),{
        expiresIn: 60*60  //one hour
      });  
      res.status(200).json({
        success:true,
        message:'登录成功',
        userId:user[0].accountID,
        accountRight:user[0].accountRight,
        tel:user[0].accountTele,
        sex:user[0].accountSex,
        token:token
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
//route中间件验证token
apiRoutes.use((req,res,next) => {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if(token){
    jwt.verify(token,app.get('superSecret'),(err,decoded)=>{
      if(err){
        console.log(err);
        return res.json({success:false,message:'token 授权认证失败'})
      }else{
        req.decoded = decoded;
        next(); 
      }
    })
  }else{
    return res.status(403).send({
      success:false,
      message:'No token provided'
    })
  }
});
//确认认证是否成功
apiRoutes.get('/authenticate',(req,res)=>{
  res.json({
    success:true,
    message:'认证成功'
  })
})

apiRoutes.post('/register',(req,res) => {
  const accountName = req.body.accountName;
  const accountPsd = req.body.accountPsd;
  const accountSex = req.body.accountSex;
  const accountTele = req.body.accountTele;
  const accountRight = 3;//3表示用户
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

});
//修改密码
apiRoutes.put('/changePassword',(req,res)=> {
    const accountID = req.body.accountID;
    const newPassword = req.body.newPassword;
    sql.query`update  Account set accountPsd=${newPassword} where accountID =${accountID}`
    .then(function(recordset){
     res.status(200).json({success:true});
    }).catch(function(err){
      console.log(err);
      res.status(500).json({success:false,message:'修改密码失败！'})
  });
});
// apiRoutes.post('/getUserInfo',(req,res) => {
//   const accountID = req.body.accountID;
//    sql.query`select * from Account where accountID =${accountID}`.then(function(user){
//     console.log(user)
//      const tel = user[0].accountTele;
//      const sex = user[0].accountSex;
//      res.status(200).json({
//       success:true,
//       tel:tel,
//       sex:sex
//      })
//    }).catch(function(error){
//     console.log(error);
//     res.status(500).json({success:false,message:'获取数据失败'})
//    });  
// })
//修改个人信息
apiRoutes.post('/changePersonalInfo',(req,res) => {
  const username = req.body.username;
  const sex = req.body.sex;
  const tel = req.body.tel;
  const accountID = req.body.accountID;
  sql.query`update  Account set accountName=${username},accountSex=${sex},accountTele=${tel} where accountID =${accountID}`
  .then(function(recordset){
    res.status(200).json({success:true})
  })
  .catch(function(err){
    console.log(err);
    res.status(500).json({success:false,message:'修改个人信息失败'});
  })
})

export default apiRoutes;
