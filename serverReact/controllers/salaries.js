const Salary = require('../models/salaries');
const Staff = require('../models/staffs');


exports.deleteSalary = async (req,res) =>{
    try {
        const salaryId = req.params.salaryId;

        await Salary.findByIdAndDelete(salaryId)
            .then(async (response)=>{
                await Salary.find({staffId:response.staffId})
                    .then(salaries=>{
                        return res.status(200).json(salaries);
                    })
            })
    } catch (error) {
        
    }
}

exports.getSalary = async (req,res) =>{
    try {
        await Salary.find()
            .then(salaries =>{
                return res.status(200).json(salaries);
            })
    } catch (error) {
        console.log(error);
    }
}

exports.createSalary = async (req,res) =>{
    try {
        const newSalary = new Salary(req.body);
        await newSalary.save();

        await Staff.find()
            .then(staffs=>{
                return res.status(200).json(staffs);
            })
    } catch (error) {
        console.log(error);
    }
    
}