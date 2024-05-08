import React from "react";

const EndHome = () => {
  return (
    <>
      {/* some classes are defined in fill details3 .css such as bgr */}

      <div className=" h-screen w-screen bg-bg-white bg-cover flex flex-col items-center justify-center px-4 text-center">
        <div className="text-4xl">
          The website has been killed on{" "}
          <span className="text-5xl text-[#d94d3c]">8th May 2024</span>
        </div>
        <div className="text-xl mt-3">
          Your data has been sent for designing
        </div>
        <div className="text-xl">
          Thank you for using the website. See you soon!
        </div>
        <div className="text-xl mt-3">
          PS: We got an amazing fan-made website!{" "}
          <a
            href="https://yearbook-iiti.netlify.app"
            className="hover:text-[#d94d3c] underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Click here to view it
          </a>
        </div>
        <div className="absolute bottom-8 left-8">
          <a href="/team" className="underline hover:text-[#d94d3c]">
            Team
          </a>
        </div>
        <div className="absolute bottom-8 right-8">
          <img
            src="/images/homepage/amongus.png"
            className="w-64 h-64"
            alt=""
          ></img>
        </div>
      </div>
    </>
  );
};

export default EndHome;
