const Borrow = require('../models/borrow');
const Book = require('../models/book');
const User = require('../models/user');
const Joi = require('joi');

const borrowSchema = Joi.object({
    userId: Joi.number().integer().required(),
    bookId: Joi.number().integer().required(),
});

exports.getBorrows = async (req, res) => {
    try {
        const borrows = await Borrow.findAll({ include: [User, Book] });
        res.json(borrows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createBorrow = async (req, res) => {
    const { error } = borrowSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const user = await User.findByPk(req.body.userId);
        const book = await Book.findByPk(req.body.bookId);

        if (!user) return res.status(404).send('User not found');
        if (!book) return res.status(404).send('Book not found');

        const borrow = await Borrow.create({
            userId: req.body.userId,
            bookId: req.body.bookId,
        });
        res.status(201).json(borrow);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getBorrow = async (req, res) => {
    try {
        const borrow = await Borrow.findByPk(req.params.id, { include: [User, Book] });
        if (!borrow) return res.status(404).send('Borrow record not found');
        res.json(borrow);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.returnBorrow = async (req, res) => {
    try {
        const borrow = await Borrow.findByPk(req.params.id);
        if (!borrow) return res.status(404).send('Borrow record not found');

        await borrow.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
