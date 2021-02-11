const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const { body } = require('express-validator/check');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product',
[
  body('title')
    .isString()
    .isLength({ min: 3 })
    .trim(),
  body('price').isFloat(),
  body('description')
    .isLength({ min: 5, max: 400 })
    .trim()
], isAuth.isAdmin, isAuth.isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get('/products', isAuth.isAuth, isAuth.isAdmin, adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', isAuth.isAuth, isAuth.isAdmin, adminController.postAddProduct);

router.get('/edit-product/:productId', isAuth.isAuth, isAuth.isAdmin, adminController.getEditProduct);

router.post('/edit-product',[
    body('title')
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body('imageUrl').isURL(),
    body('price').isFloat(),
    body('description')
      .isLength({ min: 5, max: 400 })
      .trim()
  ], isAuth.isAuth, isAuth.isAdmin, adminController.postEditProduct);

router.post('/delete-product', isAuth.isAuth, isAuth.isAdmin, adminController.postDeleteProduct);

module.exports = router;
