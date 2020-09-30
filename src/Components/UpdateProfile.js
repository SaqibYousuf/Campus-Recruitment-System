import React, { useEffect, useState } from "react";
import firebase from "firebase";
import "./main.scss";
import { withRouter } from "react-router-dom";
import Student from "./Student";

function UpdateProfile(props) {
  let [data,setData] = useState("")
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // console.log(user);
      }
    })
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
  // console.log(type);
  // console.log(props.User.uid);

  // console.log(User);
  let [experience, setExperience] = useState("");
  let [Skills, setSkills] = useState("");
  let [Language, setLanguage] = useState("");
  let [Service, setService] = useState("");
  let [Introduction, setIntroduction] = useState("");
  let [College, setCollege] = useState("");
  let [ComapanyName, setComapanyName] = useState("");
  let [Field, setField] = useState("");
  let [Degree, setDegree] = useState("");

  function update() {
    props.setupdate(true);
    props.setSignUp(false);
    var studentObj = {
      name: props.User.displayName,
      phoneNumber: props.User.phoneNumber,
      uid: props.User.uid,
      userType: type.userType,
      experience: experience,
      skills: Skills,
      language: Language,
      service: Service,
      introduction: Introduction,
      college: College,
      comapanyName: ComapanyName,
      field: Field,
      degree: Degree,
    };
    // if(props.student){
    firebase
      .database()
      .ref()
      .child(type.userType)
      .child(props.User.uid)
      .update(studentObj).then(()=>{
        props.history.push('/profile')
      });
    // firebase
    //   .database()
    //   .ref("Colleges")
    //   .child(College)
    //   .child(props.User.uid)
    //   .set(studentObj);
    // // }else
    // if (props.Company) {
    //   firebase
    //     .database()
    //     .ref("Comapanies")
    //     .child(ComapanyName)
    //     .child(props.User.uid)
    //     .set(studentObj);
    // }
  }
  // console.log(props.User.uid)
  // console.log(props.Company + "  sadas");
  return (
    <div className="ProfileBody">
      <h2 className="heading">Update Your Profile</h2>
      <div className="dpDiv">
        <div className="dp"></div>
        <div className="Name">
          <h2>{props.User.displayName}</h2>
        </div>
        {/* <div className="BasicInfo">
          <p className="College">
            <i class="fas fa-university"></i>Abc technology College
          </p>
          <p className="Field">
            <i class="fas fa-book-open"></i>Field
          </p>
          <p className="Degree">
            <i class="fas fa-graduation-cap"></i>Degree
          </p>
        </div> */}
      </div>
      <div className="UpdateResume">
        <h5>Your Further Information For Your Resume</h5>
        <div className="InputDiv">
          <input
            onChange={(event) => {
              setComapanyName(event.target.value);
            }}
            className="ResumeInput"
            type="text"
            placeholder="Company Name"
          />
          <input
            onChange={(event) => {
              setCollege(event.target.value);
            }}
            className="ResumeInput"
            type="text"
            placeholder="College Name"
          />
           {/* <input
            onChange={(event) => {
              setCollege(event.target.value);
            }}
            className="ResumeInput"
            type="text"
            placeholder="College Name"
          />
           <input
            onChange={(event) => {
              setCollege(event.target.value);
            }}
            className="ResumeInput"
            type="text"
            placeholder="College Name"
          />
           <input
            onChange={(event) => {
              setCollege(event.target.value);
            }}
            className="ResumeInput"
            type="text"
            placeholder="College Name"
          />
           <input
            onChange={(event) => {
              setCollege(event.target.value);
            }}
            className="ResumeInput"
            type="text"
            placeholder="College Name"
          /> */}
          <input
            onChange={(event) => {
              setField(event.target.value);
            }}
            className="ResumeInput"
            type="text"
            placeholder="Field"
          />
          <input
            onChange={(event) => {
              setDegree(event.target.value);
            }}
            className="ResumeInput"
            type="text"
            placeholder="Degree"
          />
          <input
            onChange={(event) => {
              setExperience(event.target.value);
            }}
            className="ResumeInput"
            type="text"
            placeholder="Experience"
          />
          <input
            onChange={(event) => {
              setSkills(event.target.value);
            }}
            className="ResumeInput"
            type="text"
            placeholder="Skills"
          />
          <input
            onChange={(event) => {
              setLanguage(event.target.value);
            }}
            className="ResumeInput"
            type="text"
            placeholder="Communication Languages"
          />
          <input
            onChange={(event) => {
              setService(event.target.value);
            }}
            className="ResumeInput"
            type="text"
            placeholder="Services"
          />
          <textarea
            onChange={(event) => {
              setIntroduction(event.target.value);
            }}
            className="ResumeInput YourIntro"
            type="text"
            placeholder="Your Introduction"
          />
          {/* <input className="ResumeInput YourIntro" type="text" placeholder="YourIntro"/> */}
          {/* <input className="ResumeInput" type="text" placeholder=""/> */}
        </div>
        <div className="UpdateBtn">
          <button onClick={() => update()}>Update</button>
        </div>
      </div>
    </div>
  );
}

export default withRouter(UpdateProfile);
