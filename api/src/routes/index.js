const { Router } = require('express');

const dogRouter = require('./dog.js');
const dogsRouter = require('./dogs.js');
const temperamentRouter = require('./temperament.js')

const router = Router();

router.use('/dog', dogRouter);
router.use('/dogs', dogsRouter);
router.use('/temperament', temperamentRouter);

module.exports = router;
