const User = require('../models/user.model')

exports.findAll  = async(req,res)=>{
    console.log("Find all users products")

    try {
        const result = await User.find({},{
            _id:0,
            // "products._id":0,
            username:1,
            products:1,
            
        })
        res.status(200).json({data:result})
        console.log(`Reading all users products`)
    } catch (err) {
        res.status(400).json({data:err});
        console.log("Problem in reading users products")
    }
}

exports.findOne  = async(req,res)=>{
    console.log("Find products of one user")
    const username = req.params.username;

    try {
        const result = await User.findOne({username:username},
            {
            _id:0,
            // "products._id":0,
            username:1,
            products:1,
            
        })
        res.status(200).json({data:result})
        console.log(`Success in reading products of user: ${username}`)
    } catch (err) {
        res.status(400).json({data:err});
        console.log(`Problem in reading products of user: ${username}`)
    }
}

exports.create = async(req,res) => {
    console.log("Create a product for user");
    // console.log(req.body);
    const username = req.body.username;        
    const products = req.body.products;

    try {
        const result = await User.updateOne(
            {username:username},
            {
                $push:{
                    products:products
                }
            }
        )
        res.status(200).json({data:result})
        console.log("Success inserting products for user: ",username)
    } catch (err) {
        res.status(400).json({data:err});
        console.log(`Failed inserting products for user: ${username}`)
    }
    
}

exports.update = async(req,res) => {    
    // console.log(req.body);
    const username = req.params.username;
    const _id = req.body.product._id;
    const quantity = req.body.product.quantity;
    
    console.log("Update a product for user",username);
    
    try {
        const result = await User.updateOne(
            {username:username,"products._id":_id},
            {
                $set:{
                    "products.$.quantity":quantity
                }
            }
        )
        res.status(200).json({data:result})
        console.log(`Success updating product with id : ${_id}, for user: ${username}`);
    } catch (err) {
        res.status(400).json({data:err});
        console.log(`Failed updating products for user: ${username}`)
    }    
}


exports.delete = async(req,res) => {
    // console.log(req.body);
    const username = req.params.username;
    const _id = req.params._id;
    
    console.log("Delete a product for user",username);
    try {
        // updateOne because we do not want to delete a document
        const result = await User.updateOne(
            {username:username},
            {
                $pull:{
                    products:{
                        _id:_id
                    }
                }
            }
        )
        res.status(200).json({data:result})
        console.log(`Success deleting product with id : ${_id}, for user: ${username}`);
    } catch (err) {
        res.status(400).json({data:err});
        console.log(`Failed deleting product for user: ${username}`)
    }   
}
