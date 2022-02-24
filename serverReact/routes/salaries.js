const express = require("express");
const router = express.Router();

const salaryController = require('../controllers/salaries');

router.get('/salaries',salaryController.getSalary);
router.post('/salaries',salaryController.createSalary);

module.exports = router;