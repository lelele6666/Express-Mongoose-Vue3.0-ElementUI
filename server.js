//引入express 搭建一个本地的服务器
const express = require('express')
//实例化一个app
const app = express()

const mongoose = require('mongoose')

const users = require('./routers/api/users')

//db config数据库的地址
const db = require('./config/keys').mongoURI

//connect to mongodb
mongoose.connect(db)
    .then(()=>{console.log('mongo is running')})
    .catch(()=>{console.log(err)})

//每次更新代码的时候总会重启我们的端口，所以将会引用nodemon,全局安装
app.get('/',(req,res)=>{
    res.send('hello world')
})

//使用routes 
//访问接口是http://127.0.0.1:5000/api/users/test
app.use('/api/users',users)

// users.use(bodyParser.urlencoded({extended:true}))
// users.use(bodyParser.json())
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log('server running on port ')
})