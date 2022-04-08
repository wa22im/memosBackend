import mongoose from 'mongoose';
import PostMessage from "../models/postMessage.js"


export const getPostById =async(req ,res )=>{
    const {id} =req.params ;
  

    if ( !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("No post with that id")}
    try 
    {
    const post = await PostMessage.findById( id)

    res.status(200).json(post)
}catch(error) 
{    
    console.log(error)
    res.status(400).json('error when updating the post')


}
}
export const getPosts =async(req ,res )=>{
    const page = Number(req.query.page)===0 || req.query.page===undefined ? 1 : req.query.page ; 
 
        try {
        const postPerPage= 4 ;
        const startIndex = (Number(page)-1)*postPerPage ; 
        const total = await PostMessage.countDocuments({})
        const postMessages  = await PostMessage.find().sort({_id:-1}).limit(postPerPage).skip(startIndex)

        res.status(200).json({ data :postMessages , currentPage: Number(page) , numberOfPages : Math.ceil(total/postPerPage)})
    }catch ( error){
        console.log(error); 
        res.status(404).json({message:error.message})
    }

}

export const getPostsBySearch =async(req ,res )=>{
    const {searchQuery , tags } = req.query ; 

    try {

        const title = new RegExp(searchQuery ,'i')
        const postMessages  = await PostMessage.find({ $or :[{title} ,{tags:{$in : tags.split(',')}}]})
        res.status(200).json(postMessages)
    }catch ( error){
        console.log(error); 
        res.status(404).json({message:error.message})
    }

}

export const createPost = async (req, res)=>{
  const post = req.body ; 
  const newPost = new PostMessage({...post,creator:req.userId});

  try {
      await newPost.save();
      res.status(200).json(post)
  }
  catch (error){
      console.log(error)
  }
}
export const updatePost =async(req,res)=>{
    const {id} =req.params ;
    const post = req.body 

    if ( !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("No post with that id")}
    try 
    {
    await PostMessage.findByIdAndUpdate( {_id:id} , {...post} , {new:true})
    res.status(200).json(post)
}catch(error) 
{    
    console.log(error)
    res.status(400).json('error when updating the post')


}
}

export const deletePost =async(req,res)=>{
    const {id} =req.params ;
    

    if ( !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("No post with that id")}
    try 
    {
    await PostMessage.findByIdAndDelete( id)
    res.status(200).json({message:'deleted'})
}catch(error) 
{    
    console.log(error)
    res.status(400).json('error when deleting the post')


}
}

export const likePost = async( req,res)=>{
    const {id} =req.params ;
    const userId= req.userId
    if ( !userId) return res.json({message:'Unauthorised'})

    if ( !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("No post with that id")} 
        try {
            const post = await PostMessage.findById(id)
            const index = post.likes.findIndex((id)=>id===String(userId))
           if ( index ===-1){
            post.likes.push(userId)
           } else{
               post.likes.splice(index, 1)
           }
            

            const updatedPost =await  PostMessage.findByIdAndUpdate(id ,post,{new:true})
            res.status(200).send(updatedPost)
        }catch(error){
            res.status(400).json('error when deleting the post')
        }
}


export const commentPost = async( req,res)=>{
    const {id} =req.params ;
    const {value}= req.body
    

    if ( !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("No post with that id")} 
        try {
            const post = await PostMessage.findById(id)
             post.comments.push(value)
        
            

            const updatedPost =await  PostMessage.findByIdAndUpdate(id ,post,{new:true})
            res.status(200).json(updatedPost)
        }catch(error){
            res.status(400).json('error when deleting the post')
        }
}
