import React, { useEffect, useState } from "react";
import firebase from "firebase";
import "./main.scss";
import Navbar from "./Navbar";
import Colleges from "./Colleges";
import Student from "./Student";
import Detail from "./Detail";
import { Route, BrowserRouter as Router, withRouter } from "react-router-dom";
import UpdateProfile from "./UpdateProfile";
import StudentProfile from "./StudentProfile";
import Jobpost from "./postJob";
import Jobs from "./Jobs";
import JobDetail from "./jobDetail";
import Resumes from "./resumes";

function Main(props) {
  // console.log(props);
  let [User, setUser] = useState("");
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // props.history.push("/main");
        // console.log(user);
        setUser(user);
        // firbase.database().
      }
    });
    // console.log(user)
  }, []);
  let [update, setupdate] = useState("");
  let [edit, setEdit] = useState("");
  let [jobs, setJobs] = useState("");
  // console.log(props.Company)
  useEffect(() => {
    firebase
      .database()
      .ref("Student")
      .on("value", function (data) {
        if (data.val()) {
          setCollegeData(Object.values(data.val()));
        } else {
          setCollegeData([]);
        }
      });
    firebase
      .database()
      .ref("Jobs")
      .on("value", function (data) {
        if (data.val()) {
          setCompanyData(Object.values(data.val()));
        } else {
          setCompanyData([]);
        }
      });
  }, []);
  let [CollegeData, setCollegeData] = useState("");
  let [ComapanyData, setCompanyData] = useState("");
  function StudentData(a) {
    setStudentDetail(a);
  }
  function jobdata(a) {
    // console.log(a)
    setCompanyDetail(a);
  }
  let [studentDetail, setStudentDetail] = useState("");
  let [companyDetail, setCompanyDetail] = useState("");
  useEffect(() => {
    firebase
      .database()
      .ref("Apply")
      .on("value", function (data) {
        if (data.val()) {
          setApplyState(Object.values(data.val()));
        }
      });
  }, []);
  let [applystate, setApplyState] = useState("");
  // console.log(applystate)
  // useEffect(()=>{
  //   for (var i = 0; i < applystate.length; i++) {
  //     if (
  //       applystate[i].companyUid === CollegeData[i].uid
  //       // applystate[i].studentUid === props.studentDetail.uid
  //       ) {console.log(CollegeData[i])

  //       }
  //     }
  //   },[CollegeData,applystate])
  // console.log(CollegeData)

  // console.log(CollegeData)

  // console.log(jobs)
  // console.log(props.signUp);
  // console.log(User)
  let [resumeDetail,setResumeDetail] = useState("")
  function resumes(a){
    setResumeDetail(a)

  }
  return (
    <div className="webbody">
      <Router>
        <div className="sideNav">
          <Navbar
            // student={props.student}
            // Company={props.Company}
            // Admin={props.Admin}
            setJobs={setJobs}
            User={User}
          />
        </div>
        <Route
          path="/profile"
          exact
          component={() => {
            return (
              <div className="UpadateProfile">
                <StudentProfile User={User} Company={props.Company} />
              </div>
            );
          }}
        />
        <Route
          path="/main/job"
          component={() => {
            return (
              <div className="Middle">
                <div className="studentsDiv">
                  {ComapanyData.length ? (
                    <Jobs
                      ComapanyData={ComapanyData}
                      jobdata={jobdata}
                      User={User}
                    />
                  ) : null}
                </div>
              </div>
            );
          }}
        ></Route>
        <Route
          path="/main/job/detail"
          component={() => {
            return (
              <div className="Detail">
                {/* <Detail studentDetail={studentDetail} /> */}
                {companyDetail || ComapanyData ? (
                  <JobDetail
                    companyDetail={companyDetail}
                    User={User}
                    ComapanyData={ComapanyData}
                    resumeDetail = {resumeDetail}
                  />
                ) : null}
              </div>
            );
          }}
        />
        <Route
          path="/main/student"
          component={() => {
            return (
              <div className="Middle">
                <div className="studentsDiv">
                  {CollegeData.length ? (
                    <Student
                      CollegeData={CollegeData}
                      StudentData={StudentData}
                      ComapanyData={ComapanyData}
                      User={User}
                      studentDetail={studentDetail}
                    />
                  ) : null}
                </div>
              </div>
            );
          }}
        ></Route>
        <Route
          path="/main/student/detail"
          component={() => {
            return (
              <div className="Detail">
                {studentDetail?
                <Detail studentDetail={studentDetail} User={User} />
              :null}
                {/* <JobDetail companyDetail={companyDetail} /> */}
              </div>
            );
          }}
        />
        <Route
          path="/main/postjob"
          component={() => {
            return (
              <div className="Jobpost">
                <Jobpost User={User} />
              </div>
            );
          }}
        />
        <Route
          path="/main/UpdateProfile"
          exact
          component={() => {
            return (
              <div className="UpadateProfile">
                <UpdateProfile
                  // student={props.student}
                  // Company={props.Company}
                  // FirstName={props.FirstName}
                  LastName={props.LastName}
                  Email={props.Email}
                  Password={props.Password}
                  College={props.College}
                  // ComapanyName={props.ComapanyName}
                  Field={props.Field}
                  Degree={props.Degree}
                  setUser={setUser}
                  User={User}
                  setupdate={setupdate}
                  setSignUp={props.setSignUp}
                />
              </div>
            );
          }}
        />
        <Route
          path="/main/resume"
          component={() => {
            return (
              <div className="Resumes">
                {applystate.length ? (
                  <Resumes
                    User={User}
                    applystate={applystate}
                    studentDetail={studentDetail}
                    resumeDetail = {resumeDetail}
                  />
                ) : null}
              </div>
            );
          }}
        />
      </Router>
      {/* after signup */}
      {/* {props.signUp ? (
        <div className="UpadateProfile">
          <UpdateProfile
            // student={props.student}
            // Company={props.Company}
            // FirstName={props.FirstName}
            LastName={props.LastName}
            Email={props.Email}
            Password={props.Password}
            College={props.College}
            // ComapanyName={props.ComapanyName}
            Field={props.Field}
            Degree={props.Degree}
            setUser={setUser}
            User={User}
            setupdate={setupdate}
            setSignUp={props.setSignUp}
          />
        </div>
      ) : null} */}
      {/* <div className="UpadateProfile">
        <StudentProfile User={User} Company={props.Company} />
      </div>
      <div className="Jobpost">
        <Jobpost User={User} />
      </div>

      <div className="Middle">
        <div className="studentsDiv">
          {CollegeData.length ? (
            <Student CollegeData={CollegeData} StudentData={StudentData} />
            ) : null}
        </div>
        <div className="studentsDiv">
          {ComapanyData.length ? (
            <Jobs ComapanyData={ComapanyData} jobdata={jobdata} />
            ) : null}
        </div>
      </div>
    */}
    </div>
  );
}

export default withRouter(Main);

{
  /* 
      <div className="PlatForm">
        <h4 className="heading">Colleges</h4>
        <Colleges CollegeData={CollegeData} />
      </div> */
}
