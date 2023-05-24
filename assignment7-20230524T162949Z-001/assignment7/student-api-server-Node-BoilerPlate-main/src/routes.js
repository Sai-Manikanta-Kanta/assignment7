const express = require('express');
const User = require('./model.js');
const router = express.Router();
function getUser(req, res, next) {
    const userId = req.params.id;
    // Fetch the user based on the userId
    User.findById(userId)
        .then(user => {
            if (!user) {
                // User not found, you can handle this case accordingly
                return res.status(404).json({ error: 'User not found' });
            }
            // Attach the user to the response object for further use
            res.user = user;
            next();
        })
        .catch(error => {
            // Handle any errors that occur during user retrieval
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
}

// Retrieve all users
router.get('/student', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Retrieve a user by ID
router.get('/student/:id', getUser, (req, res) => {
    res.json(res.user);
});
// Create a new user
router.post('/student', async (req, res) => {
    const user = new User({
        id: req.body.id,
        name: req.body.name,
        currentClass: req.body.currentClass,
        division: req.body.division,
    });
    try {
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// Update a user by ID
router.put('/student/:id', getUser, async (req, res) => {
    if (req.body.id) {
        res.user.id = req.body.id;
    }
    if (req.body.name) {
        res.user.name = req.body.name;
    }
    if (req.body.currentClass) {
        res.user.currentClass = req.body.currentClass;
    }
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// Delete a user by ID
router.delete('/student/:id', getUser, async (req, res) => {
    try {
        await User.findByIdAndDelete(res.user._id)
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})
module.exports = router