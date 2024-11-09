const Blog = require('../models/Blog');

exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.createBlog = async (req, res) => {
    const { title, content, date,morecontent } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
    }

    try {
        const blogDate = date ? new Date(date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];

        const blog = new Blog({ title, content, date: blogDate,morecontent });
        await blog.save();
        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, content, date,morecontent } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
    }

    try {
        const formattedDate = date ? new Date(date).toISOString().split('T')[0] : undefined;

        const updatedBlog = await Blog.findByIdAndUpdate(id, 
            { 
                title, 
                content, 
                date: formattedDate || undefined, 
                morecontent
            }, 
            { new: true });

        
        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


exports.deleteBlog = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBlog = await Blog.findByIdAndDelete(id);

        
        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
