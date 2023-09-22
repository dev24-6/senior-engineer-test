import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from  'react-router-dom';
import Home from './routes/Home/home';
import Login from './routes/Login/login';
import AddTask from './routes/Home/add-task';
import ViewTask from './routes/Home/view-task';
import Header from './components/Header';

function App() {
  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/add-task' element={<AddTask/>}/>
          <Route path='/task/:id' element={<ViewTask/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App