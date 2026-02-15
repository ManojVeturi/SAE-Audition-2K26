import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Formsubmitted.css';

const Formsubmitted = () => {
const navigate = useNavigate();
  return (
    <div className="container">
      <div className="subcontainer">
        <div className="submithead">

          <h1 style={{ color: "#fff" }}>
            {" "}
            <span style={{ color: "red" }}>
              {" "}
              Congratulations !{" "}
            </span>
            
          </h1>
          <h2>You have been registered successfully.</h2>
        </div>

        <a onClick={()=>{
          navigate('/')
        }} target="_blank">
          Homepage
          <span> </span>
          <span> </span>
          <span> </span>
          <span> </span>
        </a>
      </div>
    </div>
  );
}

export default Formsubmitted
