import express from 'express'
import { getPostsBySearch, createPost, deletePost, getPosts,updatePost,likePost,getPostById ,commentPost} from '../controllers/posts.js';
 import auth from '../middleware/auth.js'
const router = express.Router(); 
router.get('/:id',auth, getPostById);
router.get('/',getPosts)
router.get('/search',getPostsBySearch)
router.post('/',auth,createPost)
router.patch('/:id',auth, updatePost);
router.delete('/:id',auth, deletePost);
router.patch('/:id/likes',auth, likePost);
router.patch('/:id/commentPost',auth, commentPost);

export default router ; 