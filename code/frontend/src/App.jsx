import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from  'react-router-dom';
import Register from './routes/Register/Register';
import Login from './routes/Login/login';
import Logout from "./routes/LogOut/logout"
import Header from './components/Header';
import Home from './routes/Home/home';
import AddTask from './routes/Home/add-task';
import ViewTask from './routes/Home/view-task';

function App() {
  return (
    <>
      <Router>
        {/* FIXME: Do not load the header in the login or registration pages */}
        <Header/>
        {/* <Register /> */} {/* TODO: Make login default */}
        <Routes>
          <Route path='/register' element={<Register/>}/>
          <Route path='/' element={<Login/>}/>
          <Route path='/logout' element={<Logout/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/add-task' element={<AddTask/>}/>
          <Route path='/task/:id' element={<ViewTask/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App