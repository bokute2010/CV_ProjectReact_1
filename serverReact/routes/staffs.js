const express = require('express');

const router = express.Router();

const staffController = require('../controllers/staffs');

router.get('/', staffController.getStaffs);

router.get('/staffs', staffController.getStaffs);

router.post('/staffs', staffController.createStaff);

router.delete('/staffs/:staffId', staffController.deleteStaff);

router.put('/staffs',staffController.updateStaff);

module.exports = router