import './App.css';
import Login from './Login';
import StudentForm from './StudentForm';
import StudentRecords from './StudentRecords';
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  const [user, setUser] = useState([]);
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/">
            {/* Admin Login */}
            {!user[0] ? (
              <Login setter={setUser}/>
            ) : (
              <StudentRecords user={user}/>
            )}
          </Route>
          <Route exact path="/form">
            {/* QR Code Form Page */}
            <StudentForm/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
