const express = require('express');

require("./db/index.js")

const app = express();

app.use(express.json());

const { Student } = require("./db/student.model.js");

// GET /students
app.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).send({ data: students })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
});

app.post('/students', async (req, res) => {
    try {
        const { name, age, gender } = req.body;
        // validations
        const student = new Student({
            name,
            age,
            gender
        })

        await student.save(); // save the data

        res.status(201).send({ data: student });
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// GET /students/:id
app.get('/students/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const student = await Student.findById(id);

        if (student == null)
            return res.status(404).send({ message: 'Student not found' });

        res.status(201).send({ data: student });
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
});

// GET /students/name/:name
app.get('/students/name/:name', async (req, res) => {
    try {
        const name = req.params.name;

        const students = await Student.find({
            name,
        });

        res.status(201).send({ data: students });
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
});

// PUT /students/:id
app.put('/students/:id', async (req, res) => {
    try {
        /*
        const id = req.params.id;
        const { name, age, gender } = req.body;
// Firts way: finding the user and updating manually
        // get the user we want to update
        const student = await Student.findById(id);
        // const student = await Student.findOne({
        //     id
        // });

        if (student == null)
            return res.status(404).send({ message: 'Student not found' });

        student.name = name;
        student.age = age;
        student.gender = gender;

        await student.save();
        */
        // only update what we need

        const id = req.params.id;
        const student = await Student.findByIdAndUpdate(
            id, req.body);

        if (student == null)
            return res.status(404).send({ message: 'Student not found' });

        res.status(200).send({ data: student });
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
});

// // DELETE /students/:id

// app.delete('/students/:id', (req, res) => {
//     const id = req.params.id;

//     for (let i=0; i<students.length; i++) {
//         if (students[i].id == id) {
//             students.splice(i, 1);
//             return res.send({message: 'Student deleted successfully'});
//         }
//     }

//     res.status(404).send({message: 'Student not found'});
// });

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
