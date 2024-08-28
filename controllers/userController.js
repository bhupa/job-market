// userController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const logger = require('../config/logger'); 


// Register a new user

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};

// Get user by email
exports.getUserByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the user exists
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
 
        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d' // Token expires in 1 day
        });

        res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};
