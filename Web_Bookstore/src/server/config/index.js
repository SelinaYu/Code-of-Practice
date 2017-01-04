// export default({
// 	"user":"sa",
// 	"password":"root",
// 	"server":"localhost",
// 	"database":"mssql://sa:root@localhost/Web_Bookstore"
// });
const config = {
  user: 'sa',
  password: 'root',
  server: 'localhost',
  database: 'Web_Bookstore',
  options:{
  	encrypt:true
  }
}

export default config;