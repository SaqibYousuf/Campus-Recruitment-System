import React, {useEffect,useState} from "react";
import firebase from "firebase";
import "./main.scss";

function Detail(props) {
  let [Admin,setAdmin]=useState("")
  useEffect(()=>{
    firebase.database().ref('Admin').on("value",function(data){
      setAdmin(Object.values(data.val()))
      
    })
  },[])
  let [type,setType]=useState("")
  useEffect(()=>{
    for(let i = 0; i < Admin.length; i++){
      if(Admin[i].uid === props.User.uid){
        setType(Admin[i].userType)
      }
    }

  },[Admin])
  console.log(type)
  function remove(){
  //   admin.auth().deleteUser(uid)
  // .then(function() {
  //   console.log('Successfully deleted user');
  // })
  // .catch(function(error) {
  //   console.log('Error deleting user:', error);
  // });
    firebase.database().ref('Students').child(props.studentDetail.uid).remove()
    console.log(props.studentDetail)
  }
  return (
 
      <div className="ProfileBody">
      <h2 className="heading">{props.studentDetail.name}'s Profile </h2>
      <div className="dpDiv">
        <div className="dp"></div>
        <div className="Name">
          <h2></h2>
        </div>
        <div className="BasicInfo">
          <div className="proDetail Intro">
            <h4>
              <i class="fas fa-info"></i>Introduction
            </h4>
            
            <p>{props.studentDetail.introduction}</p>
          </div>
          <div className="proDetail Degree">
          {type === "Admin"?
          <button 
          onClick={()=>remove()}
          >Remove</button>
          :null}
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
            <p>{props.studentDetail.college}</p>
          </div>

          <div className="proDetail Field">
            <h4>
              <i class="fas fa-book-open"></i>Field
            </h4>
            <p>{props.studentDetail.field}</p>
          </div>

          <div className="proDetail Degree">
            <h4>
              <i class="fas fa-graduation-cap"></i>Degree
            </h4>
  <p>{props.studentDetail.degree}</p>
          </div>

          <div className="proDetail Experience">
            <h4>
              <i class="fas fa-tools"></i>Experience
            </h4>
  <p>{props.studentDetail.experience}</p>
          </div>

          <div className="proDetail Skill">
            <h4>
              <i class="fas fa-cogs"></i>Skills
            </h4>
  <p>{props.studentDetail.skills}</p>
          </div>

          <div className=" proDetail Communication">
            <h4>
              <i class="fas fa-hands-helping"></i>Communication Languages
            </h4>
  <p>{props.studentDetail.language}</p>
          </div>

          <div className="proDetail Service">
            <h4>
              <i class="fas fa-tasks"></i>Services
            </h4>
  <p>{props.studentDetail.service}</p>
          </div>
        </div>
      </div>
    </div>


  );
}

export default Detail;
