const express = require('express');
const router = express.Router();

const CatController = require('../controllers/CatController');

router.get('/findAll', CatController.findAll);
router.post('/createCat',  CatController.createCat);
router.get('/findCat/:_id', CatController.findCat);
router.put('/updateCat/:_id', CatController.updateCat);
router.delete('/deleteCat/:_id', CatController.deleteCat)

module.exports = router