const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");

//to post you must use bodyParser

app.use(express.static("assets"));
app.use(bodyParser.json)
app.get("/", (req, res) => {
  res.end(fs.readFileSync("./instruction.html"));
});

//implement your api here
//follow instruction in http://localhost:8000/

const saved = require("./myCourses");


app.get("/courses", (req, res) => {
  res.json({
    success: true,
    data: saved
  })

});

app.get("/courses/:id", (req, res) => {
  const idCheck = (saved.courses.find(e => e.courseId == req.params.id));
  if(idCheck){
    res.status(200).json({
    success: true,
    data: idCheck
    })
  }else{
    res.status(404).json({
      success: false,
      data: null
      })
  }
  

});

app.delete("/courses/:id", (req, res) => {
  let len = saved.courses.length
  saved.courses = (saved.courses.filter(e => e.courseId != req.params.id));
  if(saved.courses.length < len ){
    res.json({
      success: true,
      data: saved.courses
    })
  }else{
    res.json({
      success: false,
      data: saved.courses
    })
  }

});

app.post("/addCourse", (req, res) => {
  const {courseId,courseName,credit,gpa} = req.body
  console.log(req.body)
  if(courseId !== undefined && courseName !== undefined && credit !== undefined && gpa !== undefined){
    const course = {courseId: courseId , courseName: courseName, credit: credit, gpa:gpa }
    saved.courses.push(course)
    res.status(201).json({
      success: true,
      data: course
    })
  }else{
    res.status(422).json({
      success: false,
      error: "ใส่ข้อมูลไม่ครบ"
    })
  }

});









const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server started on port:${port}`));
