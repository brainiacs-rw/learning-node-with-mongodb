const jwt=require('jsonwebtoken');
const { Student } = require('../models/student.model');
exports.protect=async(req,res,next)=>{
    let token;
    //check if we have token in authorization header and if it starts with Bearer
    if(req.headers.authorization){
        //get the token from the header and split it to get the token only
        token=req.headers.authorization.split(' ')[1];
    }
    else{
        //if no token in
        return res.status(401).send({
            message:'You must be logged in to access this route'
        });
    }
    try{
        //verify token by decoding it
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        //check if the student exists
        const student=await Student.findById(decoded.id);
        if(!student){
            return res.status(404).send({
                message:'Student not found'
            });
        }
        //set the student to the req object
        req.user=student;
        console.log(req.user);
        //call the next middleware
        next();
    }
    catch(error){
        console.log(error);
        return res.status(401).send({
            message:'Not authorized'
        });
    }
}
exports.role=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).send({
                message:'You are not allowed to access this route'
            });
        }
        next();
    }
}