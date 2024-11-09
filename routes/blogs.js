const express = require('express');
const {
    createBlog,
    getBlogs,
    updateBlog,
    deleteBlog,
} = require('../controllers/blogController');

const router = express.Router();

router.get('/', getBlogs);  
router.post('/', createBlog);  
router.put('/:id', updateBlog);  
router.delete('/:id', deleteBlog);  

module.exports = router;
