import React, { Component } from 'react'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Nabbar from './components/Nabbar'
import NoteState from './context/notes/NoteState'
import Alert from './components/Alert'
import Login from './components/Login'
import Signup from './components/Signup'
import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

 function App (){
  const [alert, setAlet] = useState(null);

  const showAlert  = (message, type)=>{
    setAlet({
      msg:message,
      type:type
    })
    setInterval(() => {
      setAlet(null);
    }, 5000);
  }
    return (
      <>
      <NoteState>
        <Router>
          <Nabbar showAlert={showAlert}/>
          <Alert alert={alert}/>
          <div className="container">
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert}/>}> </Route>
            <Route exact path="/about" element={<About />}> </Route>
            <Route exact path="/contact" element={<Contact />}> </Route>
            <Route exact path="/login" element={<Login showAlert={showAlert} />}></Route>
            <Route exact path="/signup" element={<Signup showAlert={showAlert}  />}></Route>
          </Routes>
          </div>
        </Router>
      </NoteState>
      </>
    )
}

export default App;