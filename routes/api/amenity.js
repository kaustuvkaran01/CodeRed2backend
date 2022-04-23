const router = require('express').Router();
const Amenity = require('../../model/Amenity');

router.get(('/amenity'),async (req,res)=>{
    res.send("Kyu aaye tum yahaan?")
});

router.post(('/amenity'), async (req,res)=>{

    const amenityObject = {};

    Object.entries(req.body).forEach(([key, value]) => {
        amenityObject[`${key}`] = `${value}`;
    });

    const amenity = new Amenity(amenityObject);

    try{
        const savedAmenity = await amenity.save();
        console.log(savedAmenity);
        res.send({id : savedAmenity._id, storeName: savedAmenity.storeName,contact:savedAmenity.contact});

    }catch(err){
        res.status(200).send({errorData: err});
    }
});

module.exports = router;