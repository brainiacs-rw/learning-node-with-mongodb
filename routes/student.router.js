const express = require('express');
const { getAllStudents, createStudent, getStudentById, getStudentByName, updateStudent, deleteStudent, studentLogin } = require('../controllers/student.controller');

const router = express.Router();

router.get("/", getAllStudents);
router.post("/", createStudent);
router.get("/:id", getStudentById);
router.get("/name/:name", getStudentByName);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);
router.post("/login",studentLogin);
// router.route("/")
//     .get(getAllStudents)
//     .post(createStudent);
// router.route("/:id")
//     .get(getStudentById)
//     .put(updateStudent)
//     .delete(deleteStudent);
// router.route("/name/:name")
//     .get(getStudentByName);


module.exports.studentRouter = router;