const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/bookController');

// 所有人可查看
router.get('/', getAllBooks);
router.get('/:id', getBookById);

// 管理员可写
router.post('/', authMiddleware, createBook);
router.put('/:id', authMiddleware, updateBook);
router.delete('/:id', authMiddleware, deleteBook);

module.exports = router;
