import React, { useEffect, useState } from "react";
import firebase from "firebase";
import "./main.scss";
import { withRouter } from "react-router-dom";
import Student from "./Student";

function Navbar(props) {
  function SignOutFn() {
    firebase
      .auth()
      .signOut()
      .then(function () {
        props.history.push("/");
      })
      .catch(function (error) {
        // An error happened.
      });
      
  }
  useEffect(() => {
    firebase
      .database()
      .ref()
      .on("value", function (data) {
        // if (Object.keys(data.val()))
        setData(Object.values(data.val()));
      });
  }, []);
  let [data, setData] = useState("");
  useEffect(() => {
    for (let i = 0; i < data.length; i++) {
      if (Object.values(data)[i][props.User.uid]) {
        setType(Object.values(data)[i][props.User.uid]);
      }
    }
  }, [data]);
  let [type,setType]= useState("")
  // console.log(type)
  console.log(type)
  return (
    <nav>

        <div onClick={()=>{
          props.history.push('/profile')
        }} className="sideIcon">
        <i class="far fa-user-circle"></i>
        <p>Profile</p>
      </div>
      {type.userType === "Student"
      //  || type.userType === "Admin"
       ?
        <div onClick={() =>{
          props.history.push('/main/job')
        } } className="sideIcon">
        <i class="fas fa-briefcase"></i>
        <p>Jobs</p>
      </div>
    :null}
    {type.userType === "Company" || type.userType === "Admin"?
      <div  className="companyIcon">
        <div onClick={()=>{
        props.history.push('/main/student')
      }} className="sideIcon">
          <i class="fas fa-university"></i>
          <p>Students</p>
        </div>
        <div onClick={()=>{
          props.history.push('/main/postjob')
        }} className="sideIcon">
          <i class="fas fa-briefcase"></i>
          <p>Post A New Job</p>
        </div>
        <div onClick={()=>{
          props.history.push('/main/resume')
        }} className="sideIcon">
          <i class="fas fa-briefcase"></i>
          <p>Resumes</p>
        </div>
      </div>
      :null}
 
      <div className="sideIcon" onClick={() => SignOutFn()}>
        <i class="fas fa-sign-out-alt"></i>
        <p>Sign Out</p>
      </div>
    </nav>
  );
}

export default withRouter(Navbar);
