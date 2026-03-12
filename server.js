
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/studentCourseDB")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

const Student = require("./models/Student");

app.post("/register", async(req,res)=>{

 const {name,email,password}=req.body;

 const hash=await bcrypt.hash(password,10);

 const student=new Student({name,email,password:hash,courses:[]});

 await student.save();

 res.json({message:"Registration Successful"});

});

app.post("/login", async(req,res)=>{

 const {email,password}=req.body;

 const student=await Student.findOne({email});

 if(!student){
  return res.json({message:"User not found"});
 }

 const match=await bcrypt.compare(password,student.password);

 if(match){
  res.json({message:"Login Successful",studentId:student._id,name:student.name});
 }else{
  res.json({message:"Invalid Password"});
 }

});

app.post("/register-course", async(req,res)=>{

 const {studentId,course}=req.body;

 const student=await Student.findById(studentId);

 student.courses.push(course);

 await student.save();

 res.json({message:"Course Registered"});

});

app.get("/courses/:id", async(req,res)=>{

 const student=await Student.findById(req.params.id);

 res.json(student.courses);

});

app.listen(3000,()=>{
 console.log("Server running on port 3000");
});
