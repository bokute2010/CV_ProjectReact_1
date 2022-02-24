const express = require('express');
const app = express();
const mongoose = require('mongoose');
const uri = 'mongodb+srv://funix:funix@cluster0.xox99.mongodb.net/Project_1_React';

const staffRoute = require('./routes/staffs');
const departmentRoute = require('./routes/departments');
const salaryRoute = require('./routes/salaries');
const cors = require('cors');
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json())
// app.use(express.urlencoded({ extended: false }))

app.use(cors());
app.use(staffRoute);
app.use(departmentRoute);
app.use(salaryRoute);

mongoose.connect(uri).then(() => {
    console.log('Connected to DB!')
    app.listen(5000, () => {
        console.log(`Server is running on port 5000`);
    })
})
    .catch(err => {
        console.log(err)
    })

