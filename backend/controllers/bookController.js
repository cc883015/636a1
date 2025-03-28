const Book = require('../models/Book');


exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('reviews');
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('reviews');
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createBook = async (req, res) => {
  // 只有管理员可操作
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admin can create books' });
  }
  try {
    const { title, description, author, imageUrl } = req.body;
    const newBook = new Book({ title, description, author, imageUrl });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateBook = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admin can update books' });
  }
  try {
    const { title, description, author, imageUrl } = req.body;
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { title, description, author, imageUrl },
      { new: true }
    );
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admin can delete books' });
  }
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
