const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// "orphan": A very simplistic way to filter tasks without user ID

const TaskSchema = new Schema({
    ownerid: {
        type: String,
        default: "orphan"
    },
    title: {
        type: String,
        default: "Untitled task"
    },
    description: {
        type: String,
        default: ""
    },
    duedate: {
        type: String,
        default: ""
    },
    priority: {
        type: String,
        default: "Normal"
    },
    status: {
        type: String,
        default: "Open"
    }
});

module.exports = mongoose.model("Task", TaskSchema); // DB name and schema to use