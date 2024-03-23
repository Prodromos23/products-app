const User = require('../models/user.model')


exports.findAll = async(req,res)=>{
    console.log("Find all users");
    
    try {
        const result = await User.find()
        res.status(200).json({data:result});
    } catch (err){
        console.log(`Problem in reading users ${err}`)
    }
    // res.status(200).send("Hello world");   
}

exports.findOne = async(req,res) => {
    console.log("Find a user");
    const username = req.params.username;
    try {
        const result = await User.findOne({username:username})
        res.status(200).json({data:result});
    } catch (err) {
        console.log(`Problem in reading user, ${err}`)
    }
}

exports.create = async(req,res) => {
    console.log("Create/ Insert a user");
    console.log(req.body);
    
    const newUser = new User({
        username:req.body.username,
        password:req.body.password,
        name:req.body.name,
        surname:req.body.surname,
        email:req.body.email,
        address:req.body.address,
        phone:req.body.phone,
        products:req.body.products
    });
    try {
        const result = await newUser.save();
        res.status(200).json({data:result});
    } catch (err) {
        console.log(`Problem in inserting user, ${err}`)
        res.status(400).json({data:err});
    }
}

exports.update = async(req,res) => {
    console.log("Update a user with username");
    console.log(req.body);
    const username = req.params.username;

    const updateUser = {
        // password:req.body.password,
        name:req.body.name,
        surname:req.body.surname,
        email:req.body.email,
        address:req.body.address,
        phone:req.body.phone
        // products:req.body.products
    };

    try {
        const result = await User.findOneAndUpdate(
            {username:username},
            updateUser,
            {new:true} //new:true to create the user if does not exist
        )
        res.status(200).json({data:result});
    } catch (err) {
        console.log(`Problem in updating user, ${username}`)
        res.status(400).json({data:err});
    }
}

exports.delete = async(req,res) => {
    console.log("Delete a user with username");
    const username = req.params.username;
    try {
        const result = await User.findOneAndDelete({username:username})
        res.status(200).json({data:result});
        console.log(`Success in deleting user, ${username}`)
    } catch (err) {
        console.log(`Problem in updating user, ${username}`)
        res.status(400).json({data:err});
    }
}
