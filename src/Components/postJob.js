import React, { useEffect,useState } from "react";
import firebase from "firebase";
// import "./main.scss";
import { Link, Router, withRouter } from "react-router-dom";

function Jobpost(props) {
  let [data,setData] = useState("")
  let [jobdes,setJobdes] = useState("")
  let [jobType,setJobType] = useState("")
  let [salary,setSalary] = useState("")
  let [exp,setExp] = useState("")
  let [post,setPost] = useState("")
  let [time,setTime] = useState("")
  let [req,setReq] = useState("")
  useEffect(()=>{
  firebase.database().ref().on('value', function(data){
    // if (Object.keys(data.val()))
    setData(Object.values(data.val()))
  });
}, []);
useEffect(()=>{
  for (let i = 0; i < data.length; i++ ){
    if (Object.values(data)[i][props.User.uid]) {
      setType(Object.values(data)[i][props.User.uid]);
      
    }
  }
  
},[data])
let [type, setType] = useState("")
function postJob(){
  let key = firebase.database().ref('students').push().key
  var companyObj = {
    name: props.User.displayName,
    phoneNumber: props.User.phoneNumber,
    uid: props.User.uid,
    userType: type.userType,
    jobdes: jobdes,
    jobType: jobType,
    exp: exp,
    post: post,
    time: time,
    req: req,
    salary:salary,
    Jobkey: key
    // uid:props.User.uid
  };
  // console.log(companyObj)
  firebase
  .database()
  .ref("Jobs")
  // .child("Jobs")
  .child(key)
  .set(companyObj);

}
  console.log('heiuoulywhuie')
  return (
      <div className="postJob">
        <h2>Post A New Job</h2>
        <div className="InputDiv">
        <textarea
            onChange={(event) => {
              setJobdes(event.target.value);
            }}
            className="JobInput jobDes"
            type="text"
            placeholder="Job Description"
          />
          <input
            onChange={(event) => {
              setJobType(event.target.value);
            }}
            className="JobInput"
            type="text"
            placeholder="Comapany Name"
          />
          <input
            onChange={(event) => {
              setSalary(event.target.value);
            }}
            className="JobInput"
            type="number"
            placeholder="Salary"
          />
           <input
            onChange={(event) => {
              setExp(event.target.value);
            }}
            className="JobInput"
            type="text"
            placeholder="Experience"
          />
           <input
            onChange={(event) => {
              setPost(event.target.value);
            }}
            className="JobInput"
            type="text"
            placeholder="Post"
          />
           <input
            onChange={(event) => {
              setTime(event.target.value);
            }}
            className="JobInput"
            type="text"
            placeholder="Job Timing"
          />
           <input
            onChange={(event) => {
              setReq(event.target.value);
            }}
            className="JobInput"
            type="text"
            placeholder="Job Requirement"
          />
         </div>
         <div className="jobBtn">
          <button onClick={()=>postJob()}>Update</button>
        </div>

          
      </div>
    );
}

export default withRouter(Jobpost);