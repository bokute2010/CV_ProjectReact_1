const Department = require('../models/departments');
const Staff = require('../models/staffs');

exports.deleteDepartment = async (req,res) =>{
    try { 
        //Receive department from request
        const departmentId = req.params.departmentId;

        //Filter all employee in that department and delete.
        await Staff.deleteMany({departmentId: departmentId});
        
        //Delete department
        await Department.findByIdAndDelete(departmentId);

        const departments = await Department.find()
        return res.status(200).json(departments);
    } catch (error) {
        console.log(error);
    }
}


exports.createDepartment = async (req,res) =>{
    try {
        const department = req.body;
        const newDepartment = new Department(department);
        await newDepartment.save();

        const departments = await Department.find()
        return res.status(200).json(departments);
        
    } catch (error) {
        console.log(error);
    }
}



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
