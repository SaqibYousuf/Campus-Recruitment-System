import React, { useEffect, useState } from "react";
import firebase from "firebase";
import "./main.scss";

function Colleges(props) {
  return (
    props.CollegeData &&
    props.CollegeData.map((a, i) => {
      return (
        <div onClick={() => props.collegeFn(a)} className="Colleges">
          <h4>
            <i class="fas fa-university"></i>
            {a.college}
          </h4>
        </div>
      );
    })
  );
}

export default Colleges;
