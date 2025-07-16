const express = require('express');
const router = express.Router();

const {
  create,
 
} = require('../controllers/noteController');

const authNote = require('../middleware/auth');
console.log(typeof authNote); 

router.use(authNote);

router.post('/create', create);
// router.delete('/remove', remove);
// router.put('/update', updateNote);
// router.get('/search', search);
// router.get('/read', read);

module.exports = router;
