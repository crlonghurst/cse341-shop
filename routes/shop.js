const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/instruments', shopController.getInstruments);

router.get('/music', shopController.getMusic);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', isAuth.isAuth, shopController.getCart);

router.post('/cart', isAuth.isAuth, shopController.postCart);

router.post('/cart-delete-item', isAuth.isAuth, shopController.postCartDeleteProduct);

router.post('/create-order', isAuth.isAuth, shopController.postOrder);

router.get('/orders', isAuth.isAuth, shopController.getOrders);

module.exports = router;
