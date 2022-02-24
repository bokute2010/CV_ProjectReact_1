const express = require('express');
const departmentController =  require('../controllers/departments');

const router = express.Router();

router.get('/departments', departmentController.getDepartments);
router.post('/departments', departmentController.createDepartment);
router.delete('/departments/:departmentId', departmentController.deleteDepartment);

module.exports = router;