# README

---

<h3>基于 Token 的验证</h3>
使用基于 Token 的身份验证方法，在服务端不需要存储用户的登录记录。
大概的流程：

1. 客户端使用用户名跟密码请求登录，提交到服务器处理
2. 服务端收到请求，去验证用户名与密码
3. 如果验证通过后，服务端会签发一个 Token，再把这个 Token 发送给客户端
4. 客户端收到 Token 以后可以把它存储起来，比如放在 Cookie 里或者 Local Storage 里
5. 客户端每次向服务端请求资源的时候需要带着服务端签发的 Token
6. 服务端收到请求，然后去验证客户端请求里面带着的 Token，如果验证成功，就向客户端返回请求的数据


在这里，我在客户成功登录之后，签发了token，并返回给客户端，客户端把token存在cookie里,服务器端在服务器渲染页面之前通过route中间件验证token。
```
//签发token
 const token = jwt.sign({username:account},app.get('superSecret'),{
        expiresIn: 60*60  //one hour
  }); 
```
controller/api.js
```
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
```
<h3>Higher Order Components</h3>
CheckAuth组件,利用了**Higher Order Components**的思想，准确来说，CheckAuth并不是组件，而是一个方法，将传进来的组件进行扩展然后返回扩展后的component。
```
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { browserHistory } from 'react-router';

export default function requireAuthentication(Component,type){
  class AuthenticatedComponent extends React.Component{
  componentWillMount(){
    this.checkAuth();
  }
  componentWilReceiveProps(nextProps){
        this.checkAuth();
  }
  checkAuth(){
    if(type =='auth'){
      if(!this.props.isAuthorized){
        this.props.router.push('/login');
      }
      }
    }
  render() {
    return (
        <div>
          <Component {...this.props } /> 
        </div>
   )
  }
  };
const mapStateToProps = (state) => ({
  isAuthorized: state.getIn(['user','isAuthorized'])
});
return connect(mapStateToProps)(withRouter(AuthenticatedComponent));
}
```
因为页面有一些是需要登录才能进入，这里通过`type`和`isAuthorized`来确认用户进入页面是否需要验证和用户是否已经登录，若没有登录，则进入修改密码和修改账号信息的页面会跳转到登录页面，否则若已经登入，则会进入相应的页面。





