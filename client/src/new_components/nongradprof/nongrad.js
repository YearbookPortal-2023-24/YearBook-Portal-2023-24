import React, { useContext, useEffect, useState } from "react";
import "./ng.css";

const Nongrad = () => {
  return (
    <div className="flex flex-col md:flex-row md:justify-center" style={{ maxWidth: '9500px', margin: '0 auto', marginTop: '40px', marginLeft:'150px' }}>
      <div className="comm2">
        <h1 id="cmtm" className="text-center mt-0">My Comments</h1>
      </div>
      <div className="flex flex-col mx-4 md:mx-0 md:w-1/2 " style={{marginLeft: '60px'}}>
        <div className="name3 mt-4 md:mt-8">
          <h3>Name:</h3>
        </div>
        <div className="name3 mt-4 md:mt-8">
          <h3>Email:</h3>
        </div>
      </div>
    </div>
  );
};


export default Nongrad;