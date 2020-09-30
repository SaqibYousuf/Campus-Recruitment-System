import React, { useEffect, useState } from "react";
import firebase from "firebase";
import "./login.scss";
import { withRouter } from "react-router-dom";
import Main from "../Main";
import Student from "../Student";

function Login(props) {
  let [userType, setUserType] = useState("");
  let [Company, setCompany] = useState("");
  let [Admin, setAdmin] = useState("");
  let [SignUp, setSignUp] = useState("");
  let [SignIn, setSignIn] = useState("");

  let [signedEmail, setSignedEmail] = useState("");
  let [SignedPassword, setSignedPassword] = useState("");
  let [userId, setUserID] = useState("");
  // console.log(student);
  // console.log(Company);
  // console.log(Admin);
  function StudentLogin() {
    setUserType("Student");
  }
  function AdminLogin() {
    setUserType("Admin");
  }
  function CompanyLogin() {
    setUserType("Company");
  }
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        props.history.push("/main");
        // setUser()
      }
    });
  }, []);
  // function LoginAs() {
  //   console.log("function");
  //   // if (student || Company || Admin){
  //   //   document.getElementById('LoginAs').style.display="none"
  //   // }
  // }
  function singUpFn() {
    if (
      props.FirstName === "" ||
      props.LastName === "" ||
      props.Email === "" ||
      props.Password === "" ||
      props.PhoneNumber === ""
    ) {
      alert("All Fields Are Required To Sign Up");
      return;
    }
    let email = props.Email;
    let password = props.Password;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function (result) {
        firebase
          .database()
          .ref()
          .child(userType)
          .child(result.user.uid)
          .set({
            uid: result.user.uid,
            displayName: `${props.FirstName} ${props.LastName}`,
            phoneNumber: props.PhoneNumber,
            userType: userType,
          }).then(()=>{
            props.history.push("/main/UpdateProfile")
          });
        return result.user
          .updateProfile({
            displayName: `${props.FirstName} ${props.LastName}`,
            phoneNumber: props.PhoneNumber,
            userType: userType,
          })
          .then((re) => {
            // console.log(re);
          });
      })
      // .then((re) => {
      //   props.history.push("/main");
      // })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // console.log(errorMessage);
        // ...
      });
    props.setSignUp(true);
  }
  function SignInFn() {
    if (signedEmail === "" || SignedPassword === "") {
      alert("Enter a valid Email Or Password");
      return;
    }
    let email = signedEmail;
    let password = SignedPassword;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)  
      .then((re) => {
        props.history.push("/main");
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        // console.log(errorMessage);
        // ...
      });
    props.setSignIn(true);
  }
  // useEffect(()=>{
  // console.log(userType);
  // },[userType])

  return (
    <div>
      <div className="header">
        <h3>Campus Recruitment System</h3>
      </div>
      <div className="LoginBody">
        <div className="Image"></div>
        {userType ? null : (
          <div id="LoginAs" className="logInAs">
            <h5> You Are </h5>
            <button onClick={() => StudentLogin()}>A Student</button>
            <button onClick={() => CompanyLogin()}>The Company</button>
            <button onClick={() => AdminLogin()}>An Admin</button>
          </div>
        )}

        {SignUp ? null : userType ? (
          <div className="SignInForm">
            <h5>
              Sign In <br /> <span>With Your Existing Account</span>
            </h5>
            <input
              type="email"
              placeholder="Email Address"
              onChange={(event) => {
                setSignedEmail(event.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(event) => {
                setSignedPassword(event.target.value);
              }}
            />
            <div className="btnDiv">
              {userType === 'Admin' ? null : (
                <p className="register">
                  Not Registered Yet?
                  <span onClick={() => setSignUp(true)}> Register Now </span>
                </p>
              )}
              <button className="signInBtn" onClick={() => SignInFn()}>
                SignIn Now
              </button>
            </div>
          </div>
        ) : null}

        {SignIn ? null : SignUp ? (
          <div className="SignUpBody">
            <h5>
              Sign UP <br /> <span>Register Your Account</span>
            </h5>
            <div className="NameDiv">
              <input
                onChange={(event) => {
                  props.setFirstName(event.target.value);
                }}
                className="Name"
                type="text"
                placeholder="First Name"
              />
              <input
                onChange={(event) => {
                  props.setLastName(event.target.value);
                }}
                className="Name"
                type="text"
                placeholder="Last Name"
              />
            </div>
            <input
              onChange={(event) => {
                props.setEmail(event.target.value);
              }}
              className="input"
              id="email"
              type="email"
              placeholder="Email Address"
            />
            <input
              onChange={(event) => {
                props.setPassword(event.target.value);
              }}
              className="input"
              id="password"
              type="password"
              placeholder="Password"
            />
            <input
              onChange={(event) => {
                props.setPhoneNumber(event.target.value);
              }}
              className="input"
              type="text"
              placeholder="Phone Number"
            />

            <div className="btnDiv">
              <p className="register">
                Already Registered?
                <span onClick={() => setSignIn(true)}>SignIn Now</span>
              </p>
              <button className="signUpBtn" onClick={() => singUpFn()}>
                SignUp Now
              </button>
            </div>
          </div>
        ) : null}
      </div>
      {/* <Main /> */}
    </div>
  );
}

export default withRouter(Login);
