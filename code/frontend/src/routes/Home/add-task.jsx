import React, { useState, useEffect } from 'react';
import dateFormat from 'dateformat';

function AddTask() {
    // Timeout duration in milliseconds
    const TIMEOUT_MILLIS = 2000;

    const baseURL = `${import.meta.env.VITE_SERVER_URL}/api/tasks`;

    const [title, setTitle]             = useState("");
    const [description, setDescription] = useState("");
    const [duedate, setDueDate]         = useState("");
    const [priority, setPriority]       = useState("Normal");
    const [status, setTaskStatus]       = useState("Open");

    const [submitted, setSubmitted]     = useState(false);

    const addTask = async(e) => {
        e.preventDefault(); // Prevent the form to refresh/redirect on submit

        try {            
            const response = await fetch(baseURL, {                
                method: "POST",
                headers: { "Content-Type" : "application/json; charset=utf-8" },                
                body: JSON.stringify({
                    title, description, duedate, priority, status
                }),
            })

            if(response.ok) {
                // Clear/reset the form's input fields so it's ready to create another taks
                setTitle("");
                setDescription("");
                setDueDate("");
                setPriority("Normal");
                setTaskStatus("Open");
                setSubmitted(true);

                // Set submitted to false after TIMEOUT_MILLIS
                setTimeout(() => setSubmitted(false), TIMEOUT_MILLIS);
            } else {
                console.log("Failed to create new task.");
            }

        } catch (error) {
            console.log(error);
        }
    }

    const formatDate = (e) => {
        const dateFormatted = dateFormat(e.target.value, "mm-dd-yyyy", true, false);
        console.log(dateFormatted); // TODO: Remove. Dev time only
        setDueDate(dateFormatted);
    }

    const changeTaskPriority = (e) => {
        setPriority(e.target.value);
        console.log(e.target.value); // TODO: Remove. Dev time only
    }

    const changeTaskStatus = (e) => {
        setTaskStatus(e.target.value);
        console.log(e.target.value); // TODO: Remove. Dev time only
    }

    return (
        <div>
            <div className='form-container'>
            <form onSubmit={addTask}>
                <div className="single-task">
                    <div>
                        <input 
                            type='text'
                            className='form-input'
                            placeholder='Title'
                            value={ title }
                            onChange={ (e) => setTitle(e.target.value) }
                            required
                        />
                    </div>
                    <div>
                        <textarea
                            className='description-input'
                            value={ description }
                            onChange={ (e) => setDescription(e.target.value) }
                            placeholder='Description'
                            rows='4'
                            cols='50'
                        >
                        </textarea>
                    </div>
                    <div>
                        <input
                            type='date'
                            className='form-input'
                            value={ duedate }
                            onChange={ (e) => setDueDate(e.target.value) }                           
                        />
                    </div>
                    <div>
                        <input 
                            type="radio" 
                            className='radio-input'
                            name="priority" 
                            value="High" 
                            checked={ priority === "High" } 
                            onChange={ changeTaskPriority }
                        /> <span className="radio-label">High</span>
                        <input 
                            type="radio" 
                            className='radio-input'
                            name="priority" 
                            value="Normal" 
                            checked={ priority === "Normal" } 
                            onChange={ changeTaskPriority }
                        /> <span className="radio-label">Normal</span>
                        <input 
                            type="radio" 
                            className='radio-input'
                            name="priority" 
                            value="Low" 
                            checked={priority === "Low"} 
                            onChange={ changeTaskPriority }
                        /> <span className="radio-label">Low</span>
                    </div>
                    <div>
                        <input 
                            type="radio" 
                            className='radio-input'
                            name="status" 
                            value="Open"
                            checked={ status === "Open" } 
                            onChange={ changeTaskStatus }
                        /> <span className="radio-label">Open</span>
                        <input 
                            type="radio" 
                            className='radio-input'
                            name="status" 
                            value="Completed" 
                            checked={ status === "Completed" } 
                            onChange={ changeTaskStatus }
                        /> <span className="radio-label">Completed</span>
                    </div>
                    <div>
                        <input 
                            type='submit' 
                            className='button-submit'
                            value={submitted ? "Creating task..." : "Create task" }
                        />

                        <div className='text-center'>
                            { submitted && <div className='success-message'><h2>Task created!</h2></div> }
                        </div>
                    </div>
                </div>
            </form>
            </div>
        </div>
    )
}

export default AddTask