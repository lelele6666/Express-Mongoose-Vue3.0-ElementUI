//创建数据模型
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//create Schema
const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    // 创建头像
    avatar:{
        type:String,
    },
    // // 创建日期
    // date:{
    //     type:Date,
    //     required:true
    // }
})

module.exports = User = mongoose.model('users', UserSchema)