const express = require("express");
const router = express.Router();
const { createProduct, getProducts, getProductById, updateProduct } = require("../controllers/productController");
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// Public routes (no auth needed)
router.get("/", getProducts);
router.get("/:id", getProductById);

// Protected routes (auth needed)
router.use(auth);

// Admin only routes
router.post("/", adminAuth, createProduct);
router.put("/:id", adminAuth, updateProduct);

module.exports = router;
