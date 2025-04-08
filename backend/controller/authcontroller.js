const User = require('../model/auth');

exports.signup = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Create a new user and save it to the database
        const newUser = new User({ username, password });

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
        // Use the correct field (username instead of email)
        const user = await User.findOne({ username });  // Changed from 'email' to 'username'

        if (!user || user.password !== password) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        res.status(200).json({ msg: 'Login successful' });
    } catch (err) {
        console.error('Error during login:', err);

        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};
