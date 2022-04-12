const express = require('express');
const router = express.Router();
const imageHandler = require('./handler/image-courses');

router.post('/',imageHandler.create);
router.delete('/:id',imageHandler.destroy);



module.exports = router;
