//axios基于Promise的HTTP客户端，可以在node或浏览器中使用
//请求的相关功能，并支持Promise
import axios from 'axios';
export default function fetchComponentData(token = 'token'){
	const promises = [
	           axios.get('http://localhost:3000/api/books'), 
	           // axios.get('http://localhost:3000/api/authenticate?token=' + token)
	           ];
	return Promise.all(promises);
}
