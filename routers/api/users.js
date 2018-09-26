//login  && register
const express = require('express')
//实例化router  Router()是个方法
const router  = express.Router()
const bodyParser = require('body-parser')
const gravatar = require('gravatar');
 
//引入加密的包给password进行加密
const bcrypt = require('bcrypt');
const User = require('../../models/User')

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

    //查询数据库里是否有这个邮箱
    User.findOne({email:req.body.email})
        .then((user) => {
            if(user){
                return res.status(400).json({email:'邮箱已经被注册！'})
            }else{
                const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});

                const newUser = new User({
                    name:req.body.name,
                    email:req.body.email,
                    password:req.body.password,
                    avatar
                })

                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newUser.password, salt, function(err, hash) {
                        // Store hash in your password DB.
                        if(err) throw err;

                        newUser.password = hash;
                        //调用存储方法
                        newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err))
                    });
                });
            }
        })
    
        // console.log(req.body)
        // res.json({
        //             status: 200,
        //             data: req.body
        //         })
    
})

module.exports = router
