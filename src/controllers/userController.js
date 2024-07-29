const User = require('../models/user');
const Joi = require('joi');

const userSchema = Joi.object({
    name: Joi.string().min(1).required()
});

exports.getUsers = async (req, res) => {
    const users = await User.findAll();
    res.json(users);
};

exports.createUser = async (req, res) => {
    try {
        const user = await User.create({ name: req.body.name });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getUser = async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.json(user);
};
