const {
    Student
} = require("../models/student.model.js");
const brcypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).send({
            data: students
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
};

exports.createStudent = async (req, res) => {
    try {
        const {
            name,
            age,
            gender,
            email,
            password
        } = req.body;
        const hashedPassword = await brcypt.hash(password, 10);
        // validations
        const student = new Student({
            name,
            age,
            gender,
            email,
            password: hashedPassword
        })

        await student.save(); // save the data

        res.status(201).send({
            data: student
        });
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
};

exports.getStudentById = async (req, res) => {
    try {
        const id = req.params.id;

        const student = await Student.findById(id);

        if (student == null)
            return res.status(404).send({
                message: 'Student not found'
            });

        res.status(201).send({
            data: student
        });
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
};

exports.getStudentByName = async (req, res) => {
    try {
        const name = req.params.name;

        const students = await Student.find({
            name,
        });

        res.status(201).send({
            data: students
        });
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
};

exports.updateStudent = async (req, res) => {
    try {

        // only update what we need
        const id = req.params.id;
        const student = await Student.findByIdAndUpdate(
            id, req.body);

        if (student == null)
            return res.status(404).send({
                message: 'Student not found'
            });

        res.status(200).send({
            data: student
        });
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
};

exports.deleteStudent = async (req, res) => {
    try {
        const id = req.params.id;
        const student = await Student.findByIdAndDelete(id);

        if (student == null)
            return res.status(404).send({
                message: 'Student not found'
            });

        res.status(200).send({
            message: "Student was deleted successfully"
        });

    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
};
exports.studentLogin = async (req, res) => {
    //get user input
    const {
        email,
        password
    } = req.body;
    //check if student exists with this email
    const student = await Student.findOne({
        email
    })
    //if student not found
    if (student == null) {
        return res.status(404).send({
            message: "Incorrect credentials"
        });
    }
    //compare the password
    const isMatch = await brcypt.compare(password, student.password);
    if (!isMatch) {
        return res.status(404).send({
            message: "Incorrect credentials"
        });
    }
    //generate jwt token
    const token = jwt.sign({
        email: student.email,
        id: student._id
    }, process.env.JWT_SECRET, {
        expiresIn: "1h"
    });
    res.status(200).send({
        message: "Login successful",
        token
    });
}