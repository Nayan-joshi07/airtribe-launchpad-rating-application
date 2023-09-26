var express = require('express');
const port = 3000;
var app = express();
app.get('/', (req, res) => {
    res.status(200).send("Hello World");
});
app.listen(port, (error) => {
    if (error) {
        console.log("Something went wrong while starting the server");
    } else {
        console.log("Server is running on port 3000");
    }
});