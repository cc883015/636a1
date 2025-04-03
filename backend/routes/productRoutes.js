const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

// 所有人可查看
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// 管理员可写
router.post('/', authMiddleware, createProduct);
router.put('/:id', authMiddleware, updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

module.exports = router;
// const express = require('express');
// const { protect, isAdmin } = require('../middleware/authMiddleware');

// const {
//   getAllProducts,
//   getProductById,
//   createProduct,
//   updateProduct,
//   deleteProduct,
// } = require('../controllers/productController');

// const router = express.Router();

// // 公共路由 - 所有人可访问
// router.get('/', getAllProducts);
// router.get('/:id', getProductById);

// // 管理员路由 
// router.post('/', protect, isAdmin, createProduct);
// router.put('/:id', protect, isAdmin, updateProduct);
// router.delete('/:id', protect, isAdmin, deleteProduct);

// module.exports = router;
