const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const propertyRoutes = require('./routes/properties');
const blogRoutes = require('./routes/blogs');

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json()); 

app.use('/api/auth', authRoutes);  
app.use('/api/properties', propertyRoutes);  
app.use('/api/blogs', blogRoutes); 


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
