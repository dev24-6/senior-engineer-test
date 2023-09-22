import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

function Tasks() {
  const baseURL = `${import.meta.env.VITE_SERVER_URL}/api/tasks`;
  // Create a state to store the data
  const [data, setData]           = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError]         = useState(null);

  const [sorted, setSorted]       = useState(false);

  // Maximum number of characters to display
  const MAX_CHARACTERS = 20;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseURL);

        if(!response.ok) {
          throw new Error("Failed to fetch data.");
        }

        const data = await response.json();
        setData(data);
        setIsLoading(false);
        
      } catch (error) {
        setError("Error fetching data.");
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const onSort = (e, sortKey) => {
    const tempData = [...data];

    if (sorted) {
      setData(tempData.sort((a, b) => a[sortKey].localeCompare(b[sortKey])));
    } else {
      setData(tempData.sort((a, b) => b[sortKey].localeCompare(a[sortKey])));
    }
    setSorted(!sorted); // Toggle the sorted value

    // Switch the class to flip the sort button
    e.target.className==='sort-button-reverse' ? 
      e.target.className='sort-button' :
      e.target.className='sort-button-reverse';
  };

  return (
    <div>
      {/* Show the loading message or an error message, otherwise, the data will be displayed */}
      { isLoading ? (<p>Loading...</p>) : error ? (<p>{error}</p>) : (
        <div className='task-list-container'>          
          <div className='table-list-container'>
            <table className="table">
              <thead>
                <tr>
                  <th key={1}>Title
                    <button className='sort-button' onClick={(e) => onSort(e, "title")}>▲</button>
                  </th>
                  <th key={2}>Description</th>
                  <th key={3}>Due Date
                    <button className='sort-button' onClick={(e) => onSort(e, "duedate")}>▲</button>
                  </th>
                  <th key={4}>Priority
                    <button className='sort-button' onClick={(e) => onSort(e, "priority")}>▲</button>
                  </th>
                  <th key={5}>Status
                    <button className='sort-button' onClick={(e) => onSort(e, "status")}>▲</button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Go over every record in the array to create the row elements */}
                {data.map(function (task, index) {
                  return (
                    <tr key={index}>
                      <td data-title="title">
                        <Link to={ `/task/${task._id}` }>{ task.title }</Link>                        
                      </td>
                      {/* If the description is too long, display just part of it */}
                      <td data-title="description">
                        { task.description.length > MAX_CHARACTERS 
                          ? `${task.description.substring(0, MAX_CHARACTERS)}...`
                          : task.description
                        }
                      </td>
                      <td data-title="duedate">{task.duedate}</td>
                      <td data-title="priority">{task.priority}</td>
                      <td data-title="status">{task.status}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className='table-footer'>
                <tr>
                  <td colSpan={5} className='table-footer-cell'>Total task(s) {data.length}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default Tasks