const { Router } = require('express');
const { getDogs, getDogById } = require('../controllers/dogs')

const router = Router();

router.get('/:id', getDogById);
router.get('', getDogs);

module.exports = router;