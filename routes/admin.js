const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', isAuth.isAdmin, isAuth.isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get('/products', isAuth.isAuth, isAuth.isAdmin, adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', isAuth.isAuth, isAuth.isAdmin, adminController.postAddProduct);

router.get('/edit-product/:productId', isAuth.isAuth, isAuth.isAdmin, adminController.getEditProduct);

router.post('/edit-product', isAuth.isAuth, isAuth.isAdmin, adminController.postEditProduct);

router.post('/delete-product', isAuth.isAuth, isAuth.isAdmin, adminController.postDeleteProduct);

module.exports = router;
