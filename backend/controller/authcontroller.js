const User = require('../model/auth');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ msg: 'Username already taken' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user and save it to the database
        const newUser = new User({
            username,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ msg: 'User created' });
    } catch (err) {
        // Log the full error stack to help with debugging
        console.error('Error during signup:', err);

        // Respond with a more detailed error message
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Send back the user data (don't send the password)
        res.status(200).json({ 
            msg: 'Login successful', 
            user: { username: user.username } 
        });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};