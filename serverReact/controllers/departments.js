const Department = require('../models/departments');

exports.getDepartments = async (req,res) =>{
    try {
        // const newDepartment = new Department({
        //     name: 'IT'
        // })

        // await newDepartment.save();
        const departments = await Department.find();
        res.status(200).json(departments);
    } catch (error) {
        console.log(error);
    }
}