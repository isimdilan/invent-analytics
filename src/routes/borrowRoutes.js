const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/borrowController');

router.get('/', borrowController.getBorrows);
router.post('/', borrowController.createBorrow);router.get('/:id', borrowController.getBorrow);
router.delete('/:id', borrowController.returnBorrow);

module.exports = router;
