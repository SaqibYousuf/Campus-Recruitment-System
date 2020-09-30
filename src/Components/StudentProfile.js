import React, { useEffect, useState } from "react";
import firebase from "firebase";
import "./main.scss";
import { withRouter } from "react-router-dom";
import Colleges from "./Colleges";

function StudentProfile(props) {
  let [collegedata, setCollegeData] = useState("");
  let [ProfileData, setProfileData] = useState("");
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // props.history.push("/main");
        // console.log(user);
      }
    });
  }, []);
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
  let [type, setType] = useState("");

  useEffect(() => {
    // console.log(Object.values(collegedata));
    for (let i = 0; i < collegedata.length; i++) {
      if (Object.values(collegedata)[i][props.User.uid]) {
        setProfileData(Object.values(collegedata)[i][props.User.uid]);
        // setProfileUid(String(Object.keys(collegedata[i])))
      }
    }
  }, [collegedata]);
  // console.log(ProfileData);
  // console.log(collegedata)
  // console.log(props.User.uid);
  function UpdatePath(){
    props.history.push("/main/UpdateProfile")
  }
  return (
    <div className="ProfileBody">
      <h2 className="heading">Your Profile</h2>
      <div className="dpDiv">
        <div className="dp"></div>
        <div className="Name">
          <h2>{type.name}</h2>
        </div>
        <div className="BasicInfo">
          <div className="proDetail Intro">
            <h4>
              <i class="fas fa-info"></i>Introduction
            </h4>
            <p>{type.introduction}</p>
          </div>
        </div>
      </div>
      <div className="proDetail UpdateResume">
        <h5>Your Resume</h5>
        <div className="InputDiv">
          <div className="proDetail College">
            <h4>
              <i class="fas fa-university"></i>College
            </h4>
            <p>{type.college}</p>
          </div>

          <div className="proDetail Field">
            <h4>
              <i class="fas fa-book-open"></i>Field
            </h4>
            <p>{type.field}</p>
          </div>

          <div className="proDetail Degree">
            <h4>
              <i class="fas fa-graduation-cap"></i>Degree
            </h4>
            <p>{type.degree}</p>
          </div>

          <div className="proDetail Experience">
            <h4>
              <i class="fas fa-tools"></i>Experience
            </h4>
            <p>{type.experience}</p>
          </div>

          <div className="proDetail Skill">
            <h4>
              <i class="fas fa-cogs"></i>Skills
            </h4>
            <p>{type.skills}</p>
          </div>

          <div className=" proDetail Communication">
            <h4>
              <i class="fas fa-hands-helping"></i>Communication Languages
            </h4>
            <p>{type.language}</p>
          </div>

          <div className="proDetail Service">
            <h4>
              <i class="fas fa-tasks"></i>Services
            </h4>
            <p>{type.service}</p>
          </div>
          <div className="proDetail Degree">
            <button
            onClick={()=>UpdatePath()}
            >
              Update Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(StudentProfile);
