//Server Packages
import express from 'express';
import sql  from 'mssql';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import config from './config';
//Client Packages
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import React from 'react';
import Immutable, { fromJS } from 'immutable';
import { Provider } from 'react-redux';
import { RouterContext, match } from 'react-router';
import { renderToString } from 'react-dom/server';
//Common Packages
import routes from '../common/routes';
import fetchComponentData from '../common/utils/fetchComponentData';
import configureStore from '../common/store/configureStore';
import webpackConfig from '../../webpack.config';
import apiRoutes from './controllers/api.js';


const app = express();
const port =  process.env.PORT || 3000;

// const connectPool = sql.connect(config);
sql.connect(config);
app.set('env','production');
//设定静态资源
//使用 /static 作为前缀来加载 public 文件夹下的文件了
//例如图片http://localhost:3000/static/BookImg/20150117011711.jpg
app.use('/static',express.static(__dirname+'/public'));
//可以获取cookie信息
app.use(cookieParser());
//解析请求体
//bodyParser.urlencoded 模块用于解析req.body的数据，解析成功后覆盖原来的req.body，如果解析失败则为 {}
//extended选项允许配置使用querystring(false)或qs(true多层)来解析数据
app.use(bodyParser.urlencoded({ extended: false }));//只解析key:value
app.use(bodyParser.json());
//日志请求中间件，在控制台输入请求
app.use(morgan('dev'));//dev日志格式

//接受到请求后的处理函数
const handleRender = (req,res) => {
  console.log(req.url)
	match({routes,location:req.url},(error, redirectLocation, renderProps) => {
		if(error){
			res.status(500).send(err.message);
		}else if(redirectLocation){//重定向
            res.redirect(302,redirectLocation.pathname+redirectLocation.search);
		}else if(renderProps == null){
			res.status(404).send('Not Found');
		}
		fetchComponentData(req.cookies.token).then((response) => {
			let isAuthorized = false;
			// if(response[1].data.success === true){
			// 	isAuthorized = true;
			// }else{
			// 	isAuthorized = false;
			// }
			const initialState = fromJS({
               user:{
                username:'',
                password:'',
                tel:'',
                sex:'',
                isAuthorized:false,
                accountID:''
               },
               book:{
                  books:response[0].data,
                  book:{
                    bookID:'',
                    bookName:'',
                    bookWriter:'',
                    bookUrl:'',
                    bookPublisher:'',
                    bookNo:'',
                    bookPrice:''
                  }
               }
			});
			//server端渲染
			const store = configureStore(initialState);
        const initView = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps}/>
          </Provider>
        );
        let state = store.getState();
        
        let page = renderFullPage(initView,state);
        return res.status(200).send(page);
		})
		.catch(err => res.end(err.message));
	})
}
const renderFullPage = (html,preloadedState) => {
  return ` 
  <!doctype html>
    <html>
      <head>
        <title>当淘网</title>
        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
        <!-- Optional theme -->
         <!-- <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css">-->
         <!-- <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootswatch/3.3.7/journal/bootstrap.min.css">-->
      <body>
        <div id="app">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>`
}
//设置热加载
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler,{ noInfo:true,publicPath:webpackConfig.output.publicPath}));
app.use(webpackHotMiddleware(compiler));
//发送请求先经过这里
//localhost:3000/api/...
app.use('/api',apiRoutes);// baseUrl是/api
// //React Server Render
app.use(handleRender);
app.listen(port,(error) => {
	if(error){
		console.error(error)
	}else{
		console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
	}
});
