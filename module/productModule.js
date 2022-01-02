const Product=require("../model/Product")
const Joi=require("joi")

exports.postProduct = async (req,res,next) => {         
                    const schema = Joi.object({ productName:Joi.string().alphanum().max(25).required(), 
                        quantity: Joi.number().required(), 
                        price: Joi.number().required(), 
                         description: Joi.string().max(250), 
                         userquantity: Joi.number().required() 
                    })
 var {error} = await schema.validate(req.body);  
if(error) {
    const msg = error.details.map(el => el.message).join(',')
    return res.status(400).send(msg); 
} 

const product=new Product({
    productName:req.body.productName,
    quantity:req.body.quantity,
    price:req.body.price,
    description:req.body.description,
    userquantity:req.body.userquantity 
})
try{
    var response=await product.save()
    res.send(response) 
}
catch(e){
    res.status(400).send(e)
}

}


exports.getProduct = async (req,res,next) => {   

var response=await Product.find();
res.send(response)
}

exports.updateProduct=async (req,res,next) => {   
    const {productId}=req.params
    var response=await Product.findByIdAndUpdate(productId,{
        userquantity:req.body.userquantity
    },{new:true})
    res.send(response)
}


exports.deleteProduct=async (req,res,next) => {   
    const {productId}=req.params
    var response=await Product.findByIdAndRemove(productId)
    res.send(response)
}