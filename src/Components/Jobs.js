import React, { useEffect, useState } from "react";
import firebase from "firebase";
import "./main.scss";
import { withRouter } from "react-router-dom";

function Jobs(props) {

  return props.ComapanyData.map((a, i) => {
    console.log(a);
    return (
      <div
        onClick={() => [
          props.jobdata(a),
          props.history.push("/main/job/detail"),
        ]}
        className="Student"
      >
        <h4 className="Name">
          <i class="fas fa-building"></i>
          {a.name}
        </h4>
        <p className="College">
          <i class="fas fa-briefcase"></i>
          {a.jobType}
        </p>
        <p className="Field">
          <i class="fas fa-money-bill"></i>
          {a.salary}
        </p>
        <p className="Degree">
          <i class="fas fa-user-cog"></i>
          {a.exp}
        </p>
      </div>
    );
  });
}

export default withRouter(Jobs);
