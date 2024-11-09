const Property = require('../models/Property'); 

const createProperty = async (req, res) => {
    try {
        const { title, description, price, location, bedrooms, bathrooms, area, contact } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null; 

        const newProperty = new Property({
            title,
            description,
            price,
            location,
            bedrooms,
            bathrooms,
            area,
            contact,
            image, 
        });

        await newProperty.save();
        res.status(201).json({ message: 'Property created successfully', property: newProperty });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating property', error: error.message });
    }
};


const getProperties = async (req, res) => {
    try {
        const properties = await Property.find();
        res.status(200).json(properties); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching properties', error: error.message });
    }
};


const updateProperty = async (req, res) => {
    try {
        const { id } = req.params; 
        const { title, description, price, location, bedrooms, bathrooms, area, contact } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        const updatedProperty = await Property.findByIdAndUpdate(
            id,
            {
                title,
                description,
                price,
                location,
                bedrooms,
                bathrooms,
                area,
                contact,
                image, 
            },
            { new: true } 
        );

        if (!updatedProperty) {
            return res.status(404).json({ message: 'Property not found' });
        }

        res.status(200).json({ message: 'Property updated successfully', property: updatedProperty });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating property', error: error.message });
    }
};

const deleteProperty = async (req, res) => {
    try {
        const { id } = req.params; 
        const deletedProperty = await Property.findByIdAndDelete(id);

        if (!deletedProperty) {
            return res.status(404).json({ message: 'Property not found' });
        }

        res.status(200).json({ message: 'Property deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting property', error: error.message });
    }
};

module.exports = {
    createProperty,
    getProperties,
    updateProperty,
    deleteProperty,
};
