var express=require("express")
var router= express.Router()
var Reg=require("../module/registerModule")
router.post("/register",Reg.register)
router.post("/login",Reg.login)

module.exports=router; 