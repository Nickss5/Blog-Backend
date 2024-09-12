const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const bcrypt = require('bcryptjs');
const verifyToken = require('../verifyToken')

//CREATE 

router.post('/create',verifyToken, async (req, res) => {
    console.log("Received request to create post:", req.body); // Log the incoming request
    try {
        const newPost = new Post(req.body);
        console.log("Saving post...");
        const savedPost = await newPost.save();
        console.log("Post saved:", savedPost);
        res.status(200).json(savedPost);
    } catch (error) {
        console.error("Error while creating post:", error);  // Log the error
        res.status(500).json({ message: error.message });
    }
});


//UPDATE

router.put('/:id',verifyToken, async(req,res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedPost)
    }
    catch(error) {
        res.status(500).json(error)
    }

})

//DELETE 

router.delete('/:id',verifyToken, async(req,res) => {
    try {
        await Post.findByIdAndDelete(req.params.id)
        
        res.status(200).json("Post has been deleted!")
    }
    catch(error) {
        res.status(500).json(error)
    }
})

//GET POST DETAILS

router.get("/:id", async (req,res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    }
    catch(error) {
        res.status(500).json(error)
    }
})
module.exports = router

//GET ALL POSTS

router.get("/", async (req, res) => {
    const search = req.query.search; // Extract 'search' from query

    try {
        let posts;
        
        if (search) {
            // Apply regex filter to search the 'title'
            const searchFilter = {
                title: { $regex: search, $options: "i" }
            };
            posts = await Post.find(searchFilter);
        } else {
            // Return all posts if no search query is provided
            posts = await Post.find();
        }

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
});


//GET USER  POSTS

router.get("/user/:userId", async (req,res) => {
    try {
        const posts = await Post.find({userId: req.params.userId})
        res.status(200).json(posts)
    }
    catch(error) {
        res.status(500).json(error)
    }
})

module.exports = router