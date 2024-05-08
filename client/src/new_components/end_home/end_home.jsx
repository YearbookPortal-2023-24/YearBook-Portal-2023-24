import React from "react";

const End_home = () => {
  return (
    <>
      {/* some classes are defined in fill details3 .css such as bgr */}

      <div className=" h-screen w-screen bg-cover flex flex-col items-center justify-center px-4">
        <div className="text-4xl text-center">
          The website has been killed on{" "}
          <span className="text-5xl text-[#d94d3c]">8th May 2024</span>
        </div>
        <div className="text-xl mt-3">Your data has been sent for printing</div>
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
        <div className="absolute bottom-8 right-8">
          <img src="/images/homepage/amongus.png" className="w-64 h-64"></img>
        </div>
      </div>
    </>
  );
};

export default End_home;
