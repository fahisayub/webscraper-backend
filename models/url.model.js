const mongoose=require('mongoose');

const urlSchema=new mongoose.Schema({
    url:{type:String,required:true},
    links:{type:Array},
    media:{type:Array},
    count:{type:Number,required:true},
    favourite:{type:Boolean,default:false},
},{timestamps:true});

const UrlModel=mongoose.model('url',urlSchema);
module.exports={
    UrlModel,
}

