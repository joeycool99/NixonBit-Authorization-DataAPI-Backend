var express = require('express');
var router = express.Router();
var productModule=require("../module/productModule")
/* GET home page. */

router.post('/saveproduct', productModule.postProduct)
router.get('/getproduct', productModule.getProduct)
router.patch('/updateproduct/:productId', productModule.updateProduct)
router.delete('/deleteproduct/:productId', productModule.deleteProduct)
module.exports = router;
 