const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

// Body parser middleware
app.use(bodyParser.json());

// MongoDB connection (local or cloud)
mongoose.connect('mongodb+srv://cerenbaykal:CerenBaykal0619@cerenbaykaloglu.snnawac.mongodb.net', {
 
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// User schema and model
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

// UserData schema and model
const userDataSchema = new mongoose.Schema({
    ip: String,
    browser: String,
    location: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const UserData = mongoose.model('UserData', userDataSchema);

// POST endpoint: Create new user
app.post('/api/users', async (req, res) => {
    const { email, password } = req.body;
    const newUser = new User({ email, password });

    try {
        await newUser.save();
        res.status(201).send('User created successfully');
    } catch (error) {
        res.status(400).send('Error creating user');
    }
});

// GET endpoint: Get all users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send('Error fetching users');
    }
});

// DELETE endpoint: Delete a user by ID
app.delete('/api/users/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).send('User not found');
        }
        res.status(200).send('User deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting user');
    }
});

// GET endpoint: Get all user data
app.get('/api/userdata', async (req, res) => {
    try {
        const userDatas = await UserData.find({});
        res.status(200).json(userDatas);
    } catch (error) {
        res.status(500).send('Error fetching users');
    }
});

// DELETE endpoint: Delete user data by ID
app.delete('/api/userdata/:id', async (req, res) => {
    const userDataId = req.params.id;

    try {
        const deletedUserData = await UserData.findByIdAndDelete(userDataId);
        if (!deletedUserData) {
            return res.status(404).send('UserData not found');
        }
        res.status(200).send('User deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting user');
    }
});

// POST endpoint: Record user data
app.post('/api/userdata', (req, res) => {
    const { ip, browser, location } = req.body;
    console.log('Received user data:', { ip, browser, location });
    // Burada bu verileri kaydetmek istediğiniz yere kaydedebilirsiniz
    res.status(200).send('User data received successfully');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
