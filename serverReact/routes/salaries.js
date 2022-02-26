const express = require("express");
const router = express.Router();

const salaryController = require('../controllers/salaries');

router.get('/salaries',salaryController.getSalary);
router.post('/salaries',salaryController.createSalary);
router.delete('/salaries/:salaryId', salaryController.deleteSalary);

module.exports = router;