import React, { useEffect, useState } from "react";
import firebase, { app } from "firebase";
import "./main.scss";
import { withRouter } from "react-router-dom";

function Student(props) {
  
    // let [applies, setApplies] = useState("");
    // console.log(applies.uid)
  // console.log(props.studentDetail)
  // console.log(applystate)
  return props.CollegeData.map((a, i) => {
    return (
      <div
        onClick={() => [
          props.StudentData(a),
          props.history.push("/main/student/detail"),
        ]}
        className="Student"
      >
        <h4 className="Name">{a.name}</h4>
        <p className="College">
          <i class="fas fa-university"></i>
          {a.college}
        </p>
        <p className="Field">
          <i class="fas fa-book-open"></i>
          {a.field}
        </p>
        <p className="Degree">
          <i class="fas fa-graduation-cap"></i>
          {a.degree}
        </p>
  
      
      </div>
    );
  });
}

export default withRouter(Student);
