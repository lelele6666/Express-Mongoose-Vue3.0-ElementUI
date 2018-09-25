//login  && register
const express = require('express')
//实例化router  Router()是个方法
const router  = express.Router()
const bodyParser = require('body-parser')

//在这里写router才会接受到post的数据
router.use(bodyParser.urlencoded({extended:true}))
router.use(bodyParser.json())
//app.use(bodyParser.json())
//$route  GET api/users/test
// 返回请求的json数据
// public
router.get('/test',(req,res)=>{
    res.json({msg:'login works'})
})

//$route  POST api/users/test
// 返回请求的json数据
// public
//需要安装bodyParser

router.post('/register',(req,res) =>{
    
        console.log(req.body)
        res.json({
                    status: 200,
                    data: req.body
                })
    
})

module.exports = router
