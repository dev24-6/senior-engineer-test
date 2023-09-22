import React from 'react'
import Tasks from '../../components/Tasks'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='homepage-container'>
    <div className='homepage-title-container'>
        <div className='homepage-title'>
          <h2>TASK LIST</h2>
          <Link to={`/add-task`} className='add-button'>Add task</Link>
        </div>
        <Tasks/>
    </div>
    </div>
  )
}

export default Home