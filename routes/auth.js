const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// REGISTER
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hashSync(password, salt)
        const newUser = new User({ username, email, password: hashedPassword })
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    } catch (error) {
        res.status(500).json({ error: error.message })  // Use 'error' instead of 'err'
    }
})

//LOGIN

router.post("/login", async (req, res) => {
    try {
        // Find the user by email
        const user = await User.findOne({ email: req.body.email });
       
        // If user not found, return 404
        if (!user) {
            return res.status(404).json("User not found!");
        }

        // Compare the passwords
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
            return res.status(401).json("Wrong credentials!");
        }

        // Generate a JWT token (make sure process.env.SECRET is set)
        const token = jwt.sign({ _id: user._id , username:user.username, email:user.email}, process.env.SECRET || "defaultSecret", { expiresIn: "3d" });


        // Convert Mongoose document to plain object and exclude password
        const userObj = user.toObject();
        const { password, ...info } = userObj;

        // Set token in a cookie and return user info
        res.cookie("jwtToken", token).status(200).json(info);

    } catch (err) {
        // Log the error to see what is going wrong
        console.error("Error during login:", err);
        res.status(500).json({ error: err.message });
    }
});

//LOGOUT

router.get('/logout',async (req,res) => {
    try {
        res.clearCookie("jwtToken", {sameSite:"none",secure:true}).status(200).send("User logged out successfully!")
    }
    catch(error) {
        res.status(500).json(error)
    }
})


//REFETCH USER
router.get("/refetch", (req,res)=>{
    const token=req.cookies.jwtToken
    jwt.verify(token,process.env.SECRET,{},async (err,data)=>{
        if(err){
            return res.status(404).json(err)
        }
        res.status(200).json(data)
    })
})


module.exports = router
