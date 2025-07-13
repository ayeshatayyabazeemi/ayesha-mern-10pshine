const express = require('express');
const router = express.Router();
const { signup, signin } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/signin', signin);
// router.post('/changepassword',changepassword)
module.exports = router;
