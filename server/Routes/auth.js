const router = require("express").Router();
const User = require("../Model/User");
const bcrypt = require("bcrypt");


// Register
router.post("/register", async (req,res)=>{
    console.log("Register route hit");
    console.log(req.body);
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        res.status(200).json(user);

    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});

// Login
router.post("/login", async(req,res)=>{
    try{
        const user = await User.findOne({email:req.body.email});
        if(!user){
            return res.status(400).json("Wrong Credentials");
        }
        const hashedPassword = await bcrypt.compare(req.body.password, user.password);
        if(!hashedPassword){
            return res.status(400).json("Wrong Credentials");
        }
        res.status(200).json(user);
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;