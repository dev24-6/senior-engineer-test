require("dotenv").config(); // MongoDB connection string
const cors = require("cors"); //Allows React to reach the server
const express = require("express"); //Create an Express app, facilitate interaction with the server
const connectDB = require("./connectDB");
const Tasks = require("./models/Tasks");

const app = express();
const PORT = process.env.PORT || 8000 // Use the default port or the specified one as fallback

connectDB();

// initialize cors to allow data sharing
app.use(cors());

app.use(express.urlencoded({ extended: true }));
// Encode data in the requests in JSON format
app.use(express.json());


// Fetch all tasks (asynchronously)
app.get("/api/tasks", async (req, res) => {
    try {
        const taskData = await Tasks.find({});

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
        const { title, description, duedate, status, priority } = req.body;

        const taskData = await Tasks.create({ title, description, duedate, status, priority });

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
    console.log(`Server running on port: ${PORT} :-)`);
});