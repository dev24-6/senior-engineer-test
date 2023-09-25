require("dotenv").config(); // MongoDB connection string
const cors = require("cors"); //Allows React to reach the server
const express = require("express"); //Create an Express app, facilitate interaction with the server
const connectDB = require("./connectDB");
const bcrypt = require("bcryptjs");
const Tasks = require("./models/Tasks");
const User = require("./models/User");

const app = express();
const PORT = process.env.PORT || 8000 // Use the default port or the specified one as fallback

// initialize cors to allow data sharing
app.use(cors());

app.use(express.urlencoded({ extended: true }));
// Encode data in the requests in JSON format
app.use(express.json());

connectDB();

// Register new user
app.post("/api/register", (req, res) => {    
    try {
        const { username, email, password } = req.body;

        bcrypt.hash(password, 10)
        .then(hashedPassword => {
            User.create({ username, email, hashedPassword })
            .then(userData => res.json(userData))
            .catch(err => res.json(err));
        }).catch(err => console.log(err.message))
    } catch (error) {
        res.status(500).json({ error: "Unexpected error creating user."}) //TODO: 
    }
});

app.post("/api/login", (req, res) => {
    try {
        const { email, password } = req.body;

        User.findOne({ email })
        .then(userData => {    
            if(!userData) { 
                // Incorrect credentials
                res.json("IC");
            } else {
                bcrypt.compare(password, userData.hashedPassword, (err, result) => {
                    if(result) { res.json(userData.id) } else { res.json("IC") }
                })
            }
        })
    } catch (error) {
        res.status(500).json({ error: "Unexpected error retrieving user data."}) //TODO: 
    }
});

// Fetch all tasks (asynchronously)
app.get("/api/taskslist/:ownerid", async (req, res) => {
    
    try {
        const ownerID = req.params.ownerid;

        const taskData = await Tasks.find({ "ownerid" : ownerID });

        if(!taskData) { throw new Error("Error retrieving tasks.") }

        // All good so far, pass the retrieved data.
        res.status(200).json(taskData);
    } catch (error) {
        res.status(500).json({ error: "Unexpected error."})
    }
});

// Fetch task by ID (asynchronously)
app.get("/api/tasks/:id", async (req, res) => {
    try {
        // Get the ID from the URl params
        const taskID = req.params.id;

        const taskData = await Tasks.findById(taskID);

        if(!taskData) { throw new Error("Error retrieving the task.") }

        // All good so far, pass the retrieved data.
        res.status(200).json(taskData);
    } catch (error) {
        res.status(500).json({ error: "Unexpected error retreiving the task."}) //TODO: 
    }
});

// Create a new task
app.post("/api/tasks", async (req, res) => {
    try {
        const { ownerid, title, description, duedate, status, priority } = req.body;

        const taskData = await Tasks.create({ ownerid, title, description, duedate, status, priority });

        if(!taskData) { throw new Error("Error creating the new task.") }

        res.status(200).json(taskData);
    } catch (error) {
        res.status(500).json({ error: "Unexpected error creating task."}) //TODO: 
    }
});

// Update a task by ID
app.put("/api/tasks/:id", async (req, res) => {
    try {
        const taskID = req.params.id;
        const { title, description, duedate, status, priority } = req.body;

        // Find the document(record) using the ID from the URL and update the task with the data from the body
        const taskData = await Tasks.findByIdAndUpdate(taskID, { title, description, duedate, status, priority });

        if(!taskData) { throw new Error("Error updating the task.") }

        res.status(200).json(taskData);
    } catch (error) {
        res.status(500).json({ error: "Unexpected error updating task."}) //TODO: 
    }
});

// Delete a task by ID
app.delete("/api/tasks/:id", async (req, res) => {
    try {
        const taskID = req.params.id;

        // Find the document(record) using the ID from the URL and delete it
        const taskData = await Tasks.findByIdAndDelete(taskID);

        if(!taskData) { throw new Error("Error deleting task.") }

        res.status(200).json(taskData);
    } catch (error) {
        res.status(500).json({ error: "Unexpected error deleting task."}) //TODO: 
    }
});

// Create a basic route in the current directory
app.get("/", (req, res) => {
    res.json("Testing");
});

// Route for non-existing pages (404)
app.get("*", (req, res) => {
    res.sendStatus("404");
});

app.listen(PORT, () => {
    console.info(`Server running on port: ${PORT} :-)`);
});