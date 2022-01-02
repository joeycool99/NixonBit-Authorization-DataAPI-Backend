const mongoose=require("mongoose")
const Schema=mongoose.Schema;


const prductSchema=new Schema({
    productName:{
type:String,
required:true,
 
maxLength:25,
enum:["TV","PC","mobile","pendrive"]

    },
    quantity:{
type:Number,
required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    userquantity:{
        type:Number,
        required:true
    }

})

const Product=mongoose.model("Product",prductSchema,"productcollection")
module.exports=Product;