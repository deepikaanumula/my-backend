
const express = require('express');
const multer = require('multer');
const path = require('path');
const { createProperty, getProperties, updateProperty, deleteProperty } = require('../controllers/propertyController');

const router = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, 
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb('Error: Only image files are allowed!');
    }
});

router.get('/', getProperties); 
router.post('/', upload.single('image'), createProperty); 
router.put('/:id', upload.single('image'), updateProperty); 
router.delete('/:id', deleteProperty); 

module.exports = router;
