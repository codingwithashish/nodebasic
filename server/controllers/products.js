const productModel = require('../models/products');

const addProduct = async (req, res) =>{
    try{
        const objData = {
            productname : req.body.productname,
            productdesc : req.body.description,
            image : req.body.image,
            color : req.body.color,
            weight : req.body.weight
        }
        return res.status(200).json({ status: '200', message: 'api Working' })
    } catch (err) {
        console.log(err);
        return res.status(200).json({ status: '500', message: 'Something went wrong' })
    }
}

module.exports = { addProduct }