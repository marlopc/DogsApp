const { Router } = require('express');
const { addDog, deleteDog } = require('../controllers/dog');

const router = Router();

router.post('', addDog);
router.delete('', deleteDog);

module.exports = router;