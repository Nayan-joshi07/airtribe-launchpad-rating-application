var express = require('express');
const courseData = require('./courses.json');
const validators = require('./helpers/validators').default.default;
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

app.post('/courses/', (req, res) => {
    const userProvidedDetails = req.body;
    let writePath = path.join(__dirname, '..', courses.json);
    if (validators.validateCourseInfo(userProvidedDetails).status == true) {
        let courseDataModified = JSON.parse(JSON.stringify(courseData));
        courseDataModified.airtribe.push(userProvidedDetails);
        fs.writePath(writePath, JSON.stringify(courseDataModified), { encoding: 'utf8', flag: 'w' }, (err, data) => {
            if (err) {
                return res.status(500).send("Something went wrong while creating the course");
            } else {
                return res.status(201).send(validators.validateCourseInfo(userProvidedDetails).message);
            }
        });
    } else {
        res.status(400).json(validators.validateCourseInfo(userProvidedDetails));
    }
});
app.listen(port, (error) => {
    if (error) {
        console.log("Something went wrong while starting the server");
    } else {
        console.log("Server is running on port 3000");
    }
});