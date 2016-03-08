# README

标签（空格分隔）： nodejs

---


<h3>使用HTTP构建一个简单的网站</h3>
1. 引入http模块用于创建服务器和fs模块，用来读取文件
2. 检查请求是GET并且URL以/images开始，.jpg结束，如果URL为'/'的话，响应index.html，否则发送404
3. 检查文件存在，若错误，发送404，否则发送图片。
效果如图：
![使用HTTP构建一个简单的网站][1]
`Connect`是一个基于服务器的工具集，它提供了一种新的组织代码的方式来与请求、响应对象进行交互，称为中间件。

基于http模块API上的**Connect**,提供了一些工具方法能让这些重复性的处理便于实现，以至于让开发者更加专注在应用本身，很好的体现了'DRY模式'（Don't repeat Yourself!）

static 中间件：允许任意一个URL匹配到文件系统中任意一个目录
logger 中间件： 将发送进来 的请求信息和发送出去的响应信息打印在终端。
      
      提供四种日志格式：
      - default
      - dev
      - short
      - thiny
body parser中间件：在http中我们使用qs模块来解析POST请求的消息体。Connect提供了bodyParser,另一个功能使用formidable模块,可以让你处理用户上传的文件。
cookieParser中间件 ：可以访问Cookie头信息中
methodOverride中间件：早起不支持PUT,DELETE,PATCH这样的请求，常见解决方法是在GET或POST请求加上一个_method变量来模拟上述请求，为了让后台的处理程序觉得是这些请求，可以使用methodOverride
basicAuth中间件： 对客户端进行基本的身份验证。
**<h3>通过Connect实现一个简单的网站</h3>**
通过中间件来实现，结果如下：
![connect登录表单][2]



  [1]: http://7xq2ky.com1.z0.glb.clouddn.com/httpserver.png (使用HTTP构建一个简单的网站)
  [2]: http://7xq2ky.com1.z0.glb.clouddn.com/connect4.png
 