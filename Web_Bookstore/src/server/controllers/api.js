import express from 'express';
import sql from 'mssql';
import config from '../config';

const app = express();
const apiRoutes = express.Router();


//登录请求
// apiRoutes.get('/login',function(req,res){
//   let account = req.query.username;
//   let password = req.query.password;
//   new sql.Request().query('select * from Account where username =' + accountName).then(function(user){
//     if(!user){
//     	res.json({success:false,message:'登陆失败，没有该用户！'});
//     }else if(user){
//     	if(user[0].accountPsd != password ){
//     		res.json({success:false,message:'登陆失败，密码错误！'})
//     	}
//     }else{
//     	res.json({
//     		success:true,
//     		message:'登录成功',
//     		userId:user[0].accountID
//     	});
//     }
//   }).catch(function(err){
//   	  console.log(err);
//   });
// });
//获取所有书籍信息
apiRoutes.get('/books',(req,res) => {
  sql.connect(config,function(err){
    new sql.Request().query('select * from Book',function(err,books){
            if (err) console.log(err)
            // send records as a response
            // res.send(recordset);
            res.status(200).json(books);
    })
  })
})
apiRoutes.get('/BookImg',(req,res)=>{
  es.status(200).json('')
})
export default apiRoutes;