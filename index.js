const express = require('express');

const app = express();

app.use(express.json());

const students = [{
    id: 1,
    name: 'Lilian Kibathi',
    age: 24,
    gender: 'female'
}, {
    id: 2,
    name: 'Bella Wanjiku',
    age: 25,
    gender: 'male'
}];

// GET /students
app.get('/students',(req, res) => {
    res.send(students)
})

// GET /students/:id
app.get('/students/:id', (req, res) => {
    const id = req.params.id;
    
    for (let i=0; i<students.length; i++) {
        if (students[i].id == id) {
            return res.send(students[i]);
        }
    }

    res.status(404).send({message: 'Student not found'});
});

app.post('/create', (req, res)=>{
    try { // important when using db connection
        const data = req.body;
        res.status(201).send(data);
    } catch (error) {
        res.status(500).send({message: error.message})
    }
})

// POST /students
app.post('/students', (req, res) => {
    const student = req.body;
    students.push(student);
    res.status(201).send(student);

    // improvements:
    // - auto id using the students length
});

// PUT /students/:id
app.put('/students/:id', (req, res) => {
    const id = req.params.id;
    const student = req.body;

    for (let i=0; i<students.length; i++) {
        if (students[i].id == id) {
            students[i] = student;
            return res.send(student);
        }
    }

    res.status(404).send({message: 'Student not found'});
});

// DELETE /students/:id

app.delete('/students/:id', (req, res) => {
    const id = req.params.id;

    for (let i=0; i<students.length; i++) {
        if (students[i].id == id) {
            students.splice(i, 1);
            return res.send({message: 'Student deleted successfully'});
        }
    }

    res.status(404).send({message: 'Student not found'});
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
