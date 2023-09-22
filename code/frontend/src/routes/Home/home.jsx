import React from 'react'
import Tasks from '../../components/Tasks'

function Home() {
  return (
    <div className='homepage-title-container'>
        <h2 className='homepage-title'>TASK LIST</h2>
        <Tasks/>
    </div>
  )
}

export default Home