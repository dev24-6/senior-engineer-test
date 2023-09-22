import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import dateFormat from 'dateformat';

function UpdateTask() {
    // Timeout duration in milliseconds
    const TIMEOUT_MILLIS = 2000;

    const { id } = useParams(); // Grab the ID from the URL

    const navigate = useNavigate();

    const baseURL = `${import.meta.env.VITE_SERVER_URL}/api/tasks/${id}`;

    const [isLoading, setIsLoading]     = useState(true);
    const [error, setError]             = useState(null);

    const [title, setTitle]             = useState("");
    const [description, setDescription] = useState("");
    const [duedate, setDueDate]         = useState("");
    const [priority, setPriority]       = useState("");
    const [status, setTaskStatus]       = useState("");

    const [submitted, setSubmitted]     = useState(false);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(baseURL);
    
            if(!response.ok) {
              throw new Error("Failed to fetch data.");
            }
    
            const data = await response.json();
            setTitle(data.title);
            setDescription(data.description);
            setDueDate(data.duedate);
            setPriority(data.priority);
            setTaskStatus(data.status);

            setIsLoading(false);
            
          } catch (error) {
            setError("Error fetching data.");
            setIsLoading(false);
          }
        }
        fetchData();
    }, []); 

    const updateTask = async(e) => {
        e.preventDefault(); // Prevent the form to refresh/redirect on submit

        try {
            const response = await fetch(baseURL, {
                method: "PUT",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify({
                    title, description, duedate, priority, status
                }),
            })

            if(response.ok) {
                setSubmitted(true);

                // Set submitted to false after TIMEOUT_MILLIS
                setTimeout(() => setSubmitted(false), TIMEOUT_MILLIS);
            } else {
                console.log("Failed to update task.");
            }

        } catch (error) {
            console.log(error);
        }
    }

    const deleteTask = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(baseURL, {
                method: "DELETE"
            });

            if (response.ok) {
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const formatDate = (e) => {
        const dateFormatted = dateFormat(e.target.value, "mm-dd-yyyy", true, false);
        setDueDate(dateFormatted);
    }

    const changeTaskPriority = (e) => {
        setPriority(e.target.value);
    }

    const changeTaskStatus = (e) => {
        setTaskStatus(e.target.value);
    }

    return (
        <div>
            <div className="breadcrumb-nav">
                <button onClick={deleteTask} className='button-delete'>Delete task</button>
            </div>
            <div className='form-container'>
            <form onSubmit={updateTask}>
                <div className="single-task">
                    <div>
                        <input 
                            type='text'
                            placeholder='Title'
                            className='form-input'
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
                        <span className='radio-label'>Priority:</span>
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
                        <span className='radio-label'>Status:</span>
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
                            value={submitted ? "Updating task..." : "Update task" }
                        />

                        <div className='text-center'>
                            { submitted && <div className='success-message'><h2>Task updated!</h2></div> }
                        </div>
                    </div>
                </div>
            </form>
            </div>
        </div>
    )
}

export default UpdateTask