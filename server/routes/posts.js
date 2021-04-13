const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const auth = require('../middleware/auth')
const { response } = require('express')

//Add a post
router.post("/", auth, (req, res) => {
    const  post = new Post()
    post.title = req.body.title
    post.body = req.body.body
    post.author = req.user.id
    post.save()

    return res.json({msg: "Post added successfully", post})
    
    // res.send('This is the add post endpoint')
})

//View all posts
router.get("/", async(req, res) => {
    // Post.find({}, (err, posts) => {
    //     return res.json(posts)
    // })

    //ASYNC WAIT
    const posts = await Post.find()
    return res.json(posts)
})

//Get all the post by just you created
router.get("/myposts", auth, async(req, res) => {
    try{
        const getPosts = await Post.find({author:req.user.id})
        return res.json(getPosts)
    } catch(err) {
        return res.json(err)
    }
})

//Update the post
router.put("/:id", auth, async(req,res) => {
    //You need ot delete the post with the id matching with the url and you can delete the post only if you are the author of that post
    try {
        //First find that post
        const post = await Post.find(req.params.id)
        //Check if there is indeed a post
        if(!post) return res.json({msg: "Post not found"})
        //Check id the user who is logged owns that post
        if(post.author.toString() !== req.user.id) {
            return res.status(401).json({msg: "Unauthorized"})
        } 
        
        post.title = req.body.title
        post.body = req.body.body

        await Post.updateOne({_id: req.params.id}, post)
		await post.save()
		return res.json({
			msg: "Post updated successfully",
			post
		})

        }catch(err) {
        return res.json(err)
    }
})


//Delete the post
router.delete("/:id", auth, async(req,res) => {
    //You need ot delete the post with the id matching with the url and you can delete the post only if you are the author of that post
    try {
        //first find that post
        const post = await Post.findById(req.params.id)

        //check if there is indeed a post
        if(!post) return res.json({msg: "Post not found"})

        //check if the user who is logged owns that post
        if(post.author.toString() !== req.user.id) {
            return res.status(401).json({msg: "Unauthorized"})
        }

        await post.remove()
        return res.json({msg: "Post is removed"})
    } catch(err) {
        return res.json(err)
    }
})

//View all by id 
router.get("/:id", auth, async(req, res) => {
    // Post.findById(req.params.id, (err, post) => {
    //     if(!err) return res.json(post)
    // })
    const findPosts = await Post.findById(req.params.id)
    return res.json(findPosts)
})

module.exports = router