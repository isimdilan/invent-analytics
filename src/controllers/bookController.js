const Book = require('../models/book');
const Joi = require('joi');

const bookSchema = Joi.object({
    name: Joi.string().min(1).required()
});

// Kitapları listele
exports.getBooks = async (req, res) => {
    const books = await Book.findAll();
    res.json(books);
};

// Kitap oluştur
exports.createBook = async (req, res) => {
    const { error } = bookSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const book = await Book.create({ name: req.body.name });
    res.status(201).json(book);
};

// Kitap bilgilerini al
exports.getBook = async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).send('Book not found');
    res.json(book);
};
