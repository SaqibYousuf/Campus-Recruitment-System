import React, { useEffect, useState } from "react";
import firebase from "firebase";
import "./main.scss";
import { withRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

function JobDetail(props) {
  console.log(props);
  useEffect(() => {
    firebase
      .database()
      .ref("Student")
      .on("value", function (data) {
        if (data.val()) {
          setData(Object.values(data.val()));
        } else {
          setData([]);
        }
      });
  }, []);
  let [data, setData] = useState("");
  useEffect(() => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].uid === props.User.uid) {
        setCv(data[i]);
      }
    }
  }, [data]);
  let [cv, setCv] = useState("");
  console.log(props.companyDetail.Jobkey);

  let [applied, setApplied] = useState("");
  useEffect(() => {
    firebase
      .database()
      .ref("Apply")
      .on("value", function (data) {
        if (data.val()) {
          setApplied(Object.values(data.val()));
        }
      });
  }, []);
  console.log(applied);
  console.log(props.resumeDetail);
  function applyNow() {
    // for(let i= 0 ; i < applied.length; i++){
    //   if(applied[i].studentUid === props.User.uid && applied[i].companyUid === props.companyDetail.uid){
    //     alert("Already Applied")
    //     return
    //   }
    // }
    for (let i = 0; i < Object.values(props.ComapanyData).length; i++) {
      if (
        Object.values(props.ComapanyData)[i].uid === props.companyDetail.uid
      ) {
        var applyObj = {
          studentUid: props.User.uid,
          companyUid: props.companyDetail.uid,
          name: props.User.displayName,
          college: cv.college,
          degree: cv.degree,
          experience: cv.experience,
          field: cv.field,
          introduction: cv.introduction,
          language: cv.language,
          service: cv.service,
          skills: cv.skills,
        };
      }
    }
    firebase.database().ref("Apply").push(applyObj);

    // console.log(Object.values(props.ComapanyData)[0].uid)
    // console.log(props.User)
  }
  // console.log(applied)
  console.log(cv);
  let [Admin, setAdmin] = useState("");
  useEffect(() => {
    firebase
      .database()
      .ref("Admin")
      .on("value", function (data) {
        setAdmin(Object.values(data.val()));
      });
  }, []);
  let [type, setType] = useState("");
  useEffect(() => {
    for (let i = 0; i < Admin.length; i++) {
      if (Admin[i].uid === props.User.uid) {
        setType(Admin[i].userType);
      }
    }
  }, [Admin]);
  console.log(type);
  function remove() {
    firebase.database().ref("Jobs").child(props.companyDetail.Jobkey).remove();
    console.log(props.companyDetail.Jobkey);
  }
  return (
    <div className="ProfileBody">
      <h2 className="heading">{props.companyDetail.name} </h2>
      <div className="dpDiv">
        <div className="dp"></div>
        <div className="Name">
          <h2></h2>
        </div>
        <div className="BasicInfo">
          <div className="proDetail Intro">
            <h4>
              <i class="fas fa-info"></i>Job Description
            </h4>

            <p>{props.companyDetail.jobdes}</p>
          </div>
          <div className="proDetail Degree">
            <h4>
              <i class="fas fa-graduation-cap"></i>Job Title
            </h4>
            <p>{props.companyDetail.jobType}</p>
          </div>
          <div className="proDetail Degree">
            <button onClick={() => applyNow()}>Apply Now</button>
            {type === "Admin" ? (
              <button onClick={() => remove()}>Remove</button>
            ) : null}
          </div>
        </div>
      </div>
      <div className="proDetail UpdateResume">
        <h5>Job Requirement & Details</h5>
        <div className="InputDiv">
          <div className="proDetail College">
            <h4>
              <i class="fas fa-university"></i>Salary
            </h4>
            <p>{props.companyDetail.salary}</p>
          </div>

          <div className="proDetail Field">
            <h4>
              <i class="fas fa-book-open"></i>Experience Required
            </h4>
            <p>{props.companyDetail.exp}</p>
          </div>
          <div className="proDetail Experience">
            <h4>
              <i class="fas fa-tools"></i>Phone Number
            </h4>
            <p>{props.companyDetail.phoneNumber}</p>
          </div>

          <div className="proDetail Skill">
            <h4>
              <i class="fas fa-cogs"></i>Post
            </h4>
            <p>{props.companyDetail.post}</p>
          </div>

          <div className=" proDetail Communication">
            <h4>
              <i class="fas fa-hands-helping"></i>Time
            </h4>
            <p>{props.companyDetail.time}</p>
          </div>

          <div className="proDetail Service">
            <h4>
              <i class="fas fa-tasks"></i>Requiremnts
            </h4>
            <p>{props.companyDetail.req}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetail;
