import React, { useContext, useEffect, useState } from "react";

const Nongrad = () => {
  return (
    <div className="w-screen h-screen bg-bg-white flex flex-col-reverse gap-y-4 md:flex-row justify-center items-center" >
      <div className="comm2 ">
        <h1 id="cmtm" className="text-center mt-0">My Comments</h1>
        <p className="text-lg mt-48">Start Commenting on other people to view your comments here. <a href="/" className="hover:underline">Comment Now</a></p>
      </div>
      <div className="flex flex-col md:ml-12">
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