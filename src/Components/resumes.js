import React, { useEffect, useState } from "react";
import firebase, { app } from "firebase";
import "./main.scss";
import { withRouter } from "react-router-dom";

function Resumes(props) {
    return props.applystate.map((a,i) =>{
        console.log(props.studentDetail)

        return ( 
            ( (a.companyUid === props.User.uid) ?

                <div
                //   onClick={() => 
                    //     // props.StudentData(a),
        //   }
        className="Student"
        >
        <h4 className="Name">{a.name}</h4>
        <p className="College">
        <i class="fas fa-university"></i>
        {a.introduction}
        </p>
      <p className="Field">
      <i class="fas fa-book-open"></i>
      {a.college}
      </p>
      <p className="Degree">
      <i class="fas fa-graduation-cap"></i>
      {a.degree}
      </p>
      <p className="Degree">
      <i class="fas fa-graduation-cap"></i>
      {a.experience}
      </p>
      <p className="Degree">
      <i class="fas fa-graduation-cap"></i>
      {a.field}
      </p>
      <p className="Degree">
      <i class="fas fa-graduation-cap"></i>
      {a.language}
      </p>
      <p className="Degree">
        <i class="fas fa-graduation-cap"></i>
        {a.service}
        </p>

        <p className="Degree">
        <i class="fas fa-graduation-cap"></i>
        {a.skills}
        </p>
        </div>
    :null)
        );
    })
}

export default withRouter(Resumes);
