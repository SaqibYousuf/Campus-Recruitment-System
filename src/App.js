import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import firebase from "firebase";
import { firebaseConfig } from "./config";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./Components/Login/Login";
import Main from "./Components/Main";
// import Jobpost from "./Components/job/Job";
firebase.initializeApp(firebaseConfig);

function App(props) {
  // console.log(firebase)
  // let [student, setStudent] = useState("");
  // let [Company, setCompany] = useState("");
  // let [Admin, setAdmin] = useState("");
  let [signUp, setSignUp] = useState("");
  let [signIn, setSignIn] = useState("");
  // login js se li hein states
  let [FirstName, setFirstName] = useState("");
  let [LastName, setLastName] = useState("");
  let [Email, setEmail] = useState("");
  let [Password, setPassword] = useState("");
  let [userType, setUserType] = useState("");
  let [PhoneNumber, setPhoneNumber] = useState("");
  
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/main">
            <Main
              // student={student}
              // Company={Company}
              // Admin={Admin}
              signUp={signUp}
              signIn={signIn}
              setSignUp={setSignUp}
              FirstName={FirstName}
              LastName={LastName}
              Email={Email}
              Password={Password}
            />
          </Route>
          {/* <Route path="/postjob">
            <Jobpost />
          </Route> */}
          <Route path="/">
            <Login
              // setStudent={setStudent}
              // student={student}
              // setCompany={setCompany}
              // Company={Company}
              // setAdmin={setAdmin}
              // Admin={Admin}
              setSignIn={setSignIn}
              setSignUp={setSignUp}
              signUp={signUp}
              setFirstName={setFirstName}
              setLastName={setLastName}
              setEmail={setEmail}
              setPassword={setPassword}
              FirstName={FirstName}
              LastName={LastName}
              Email={Email}
              Password={Password}
              setPhoneNumber={setPhoneNumber}
              PhoneNumber={PhoneNumber}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
