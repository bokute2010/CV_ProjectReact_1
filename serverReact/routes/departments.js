const express = require('express');
const departmentController =  require('../controllers/departments');

const router = express.Router();

router.get('/departments', departmentController.getDepartments);

module.exports = router;