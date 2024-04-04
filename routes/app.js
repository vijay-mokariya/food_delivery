const express=require('express');
const router=express();

router.use('/user',require('./user.routes'))

module.exports=router;