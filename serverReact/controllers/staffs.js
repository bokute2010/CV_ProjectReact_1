const Staff = require('../models/staffs');
const Department = require('../models/departments');

exports.getStaffs = async (req, res) => {
    try {
        const staffs = await Staff.find();
        res.status(200).json(staffs);
    } catch (error) {
        console.log(error);
    }
}

exports.createStaff = async (req, res) => {
    try {
        const department = await Department.findOne({ name: req.body.department });
        const staff = req.body;
        const newStaff = new Staff({
            name: staff.name,
            doB: new Date(staff.doB),
            salaryScale: staff.salaryScale,
            startDate: new Date(staff.startDate),
            departmentId: department._id,
            image: '/asset/images/alberto.png',
            annualLeave: staff.annualLeave
        })
        await newStaff.save();

        await Staff.find()
            .then(staffs => {
                return res.status(200).json(staffs)
            })
            .catch(error => {
                console.log(error)
            })
    } catch (error) {
        console.log(error)
    }
}

exports.deleteStaff = async (req, res) => {
    try {
        const staffId = req.params.staffId;

        await Staff.deleteOne({ _id: staffId })

        const staffs = await Staff.find();

        res.status(200).json(staffs);
        // await Staff.findById(staffId)
        //     .then(staff => {
        //         staff.remove();
        //     })
    } catch (error) {

    }
}

exports.updateStaff = async (req, res) => {
    // console.log(req.body.id)
    try {

        const department = await Department.findOne({name: req.body.department});

        await Staff.findOneAndUpdate(
            { _id: req.body.id },
            {
                name: req.body.name,
                doB: req.body.doB,
                salaryScale: req.body.salaryScale,
                startDate: req.body.startDate,
                departmentId: department,
                annualLeave: req.body.annualLeave
            },
            { new: true }
        )
        const staffs = await Staff.find()
        res.status(200).json(staffs);
    } catch (error) {

    }
}

