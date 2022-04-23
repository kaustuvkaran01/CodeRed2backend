const router = require('express').Router();

router.get(('/auth'),async (req,res)=>{
    res.send("Kyu aaye tum yahaan?")
});

router.post(('/auth'),async (req,res)=>{
    res.send("Kyu aaye tum yahaan?")
});

module.exports = router;