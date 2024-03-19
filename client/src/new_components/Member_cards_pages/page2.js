import React from "react";
import GOld from "./gold.jpeg";
import alumniData from "../Navbar/akumniData.json";
function page2() {
  const userDetails = JSON.parse(localStorage.getItem("profile"));
  console.log(userDetails.email);
  const loggedin = localStorage.getItem("loggedin");
  if (!loggedin) {
    window.location.href = "/login";
  } else if (userDetails === null || alumniData.includes(userDetails.email)) {
    window.location.href = "/";
  }
  return (
    <>
      {/* some classes are defined in fill details3 .css such as bgr */}

      <div className=" h-[100vh] w-[100vw] text-black bg-bg-white bg-cover ">
        <div class="h-60 relative top-[30px] flex flex-col items-center lg:top-[70px]  afl ">
          <div class="text-[18px] ml-2 top-10 relative font-bold sm:text-2xl md:text-3xl tracking-wide lg:mr-[100px]">
            Hmm, looks like you are
            <span class="text-red-700 text-2xl md:text-3xl lg:text-4xl">
              {" "}
              NOT{" "}
            </span>
            graduating this year
          </div>

          <p class="text-[18px] top-16 relative font-bold md:text-3xl sm:text-2xl lg:mt-4 tracking-wide lg:mr-[200px] mb-8">
            Thanks for signing up, anyway!
          </p>

          <p class="text-[18px] mb-16 top-12 relative font-bold md:text-3xl sm:text-2xl lg:w-auto lg:top-8 lg:mt-5">
            Here's a gold card for all your troubles
          </p>

          <p class=" top-4  relative lg:text-[20px]  lg:top-2 ">
            (We don't know if this is usefull yet)
          </p>
        </div>

        <div class="flex items-center justify-center afu">
          <img
            src={GOld}
            className=" h-[180px] w-[350px] xl:h-[200px] xl:w-[370px] rounded-[15px] bgr relative top-[70px] lg:top-[110px] xl:top-[130px]"
          />
        </div>

        <div class="flex items-center justify-center afu">
          <a href="/">
            <button
              class="border-2 h-[40px] w-[170px]  border-black flex justify-center items-center btnh border-dashed relative rounded-2xl
     top-[100px] text-xl lg:top-[130px] xl:top-[170px]  "
            >
              {" "}
              Continue{" "}
            </button>
          </a>
        </div>
      </div>
    </>
  );
}
export default page2;
