const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3000;

// Body parser middleware
app.use(bodyParser.json());

// MongoDB connection (local or cloud)
// mongoose.connect('mongodb+srv://cerenbaykal:CerenBaykal0619@cerenbaykaloglu.snnawac.mongodb.net', {});
mongoose.connect('mongodb+srv://cerenbaykal:CerenBaykal0619@cerenbaykaloglu.snnawac.mongodb.net/test?ssl=true&authSource=admin&w=majority', {});





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

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
