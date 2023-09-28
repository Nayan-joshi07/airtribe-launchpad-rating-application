var express = require('express');
const courseData = require('./courses.json');
const port = 3000;
var app = express();
app.get('/', (req, res) => {
    res.status(200).send("Hello World");
});

app.get('/courses', (req, res) => {
    res.status(200).json(courseData);
});

app.get('/courses/:courseId', (req, res) => {
    let airtribeCourses = courseData.airtribe;
    let courseIdPassed = req.params.courseId;
    console.log("Req Params", req.params);
    let filteredCourse = airtribeCourses.filter(val => val.courseId === courseIdPassed);
    console.log("Filtered Course", filteredCourse);
    if (filteredCourse.length == 0) {
        return res.status(404).send("No Appropirate Course Id Found with that id");
    }
    return res.status(200).json(filteredCourse);
});
app.listen(port, (error) => {
    if (error) {
        console.log("Something went wrong while starting the server");
    } else {
        console.log("Server is running on port 3000");
    }
});