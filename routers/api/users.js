//login  && register
const express = require('express')
//实例化router  Router()是个方法
const router  = express.Router()
const bodyParser = require('body-parser')
const gravatar = require('gravatar');
 
//引入加密的包给password进行加密
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const secret = require('../../config/keys').secretOrKey
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

//$route  POST api/users/login
// 返回token jwt passport
// public

router.post('/login',(req,res) => {
    const email = req.body.email
    const password = req.body.password
//查询数据库，如果user不存在返回状态码404
    User.findOne({email})
        .then((user)=>{
            if(!user){
                return res.status(404).json({email:'用户不存在'})
            }

            //密码匹配
            //第一个是前端发送过来的，第二个是数据库里的，
            bcrypt.compare(password,user.password)
                    .then(isMatch => {
                        if(isMatch){
                            //我们要返回token，jsonwebtoken即为jwt
                            jwt.sign('规则','加密名字','过期时间是个对象','箭头函数')
                            jwt.sign(rule,secret,{expiresIn:3600},(err,token)=>{
                                if(err){
                                    throw err
                                }else{
                                    res.json({
                                        success:true,
                                        token:'zhangyu'+token
                                    })
                                }
                            })
                            const rule = {id:user.id,name:user.name}
                            res.json({msg:'success'})
                        }else{
                            return res.status(400).json({password:'密码错误'})
                        }
                    })
        })
})

module.exports = router
