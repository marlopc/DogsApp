const { Router } = require('express');
const { addDog } = require('../controllers/dog');

const router = Router();

router.post('', addDog);

module.exports = router;