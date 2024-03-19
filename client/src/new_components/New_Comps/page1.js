import React, { useState, useEffect } from "react";
import Plat from "./plat.jpeg";
import { LoginContext } from "../../helpers/Context";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import axios from "axios";
import alumniData from "../Navbar/akumniData.json";

function Page1(props) {
  const {
    user,
    loading,
    setLoading,
    userData,
    setUserData,
    loggedin,
    setLoggedin,
    profile,
    setProfile,
    setFill,
    setVerified,
    setProfileIcon,
  } = useContext(LoginContext);

  const userDetails = JSON.parse(localStorage.getItem("profile"));
  if (
    !loggedin &&
    !alumniData.includes(userDetails === null || userDetails.email)
  ) {
    window.location.href = "/";
  }
const navigate = useNavigate();
  const [linkProfile, setLinkProfile] = useState(`/`);
  const profile1 = () => {
    //         axios
    //           .post(process.env.REACT_APP_API_URL + "/findAUser", {
    //             email: user.email,
    //           })
    //           .then((res) => {
    //             // If the user had made his profile
    //             console.log(res.data.message)
    //             if (res.data.message === "User Found") {
    //               // If the user is verified
    //               if (res.data.User[0].two_step_verified === true) {
    //                 setProfileIcon(true);
    //                 setVerified(true);
    //                 setProfile(res.data.User[0]);
    //                 window.localStorage.setItem("verified", true);
    //                 window.localStorage.setItem("profileIcon", true);
    //                 const p = JSON.stringify(res.data.User[0]);
    //                 window.localStorage.setItem("profile", p);
    //                 console.log(res.data.User[0].roll_no);
    //                 setLinkProfile(`/profile/${res.data.User[0].roll_no}/${res.data.User[0].name}`);

    //               }}})
    const profile = JSON.parse(window.localStorage.getItem('profile'))
    console.log(profile)
    navigate(`/profile/${profile.roll_no}/${profile.name}`);
    
  };

  return (
    <>
      {/* some classes are defined in fill details3 .css such as bgr afl afu */}

      <div className=" h-[100vh] w-[100vw] text-black  bg-bg-white bg-cover">
        <div class="h-1/2 flex flex-col items-center justify-center my-5 lg:py-20 lg:my-10 afl">
          <p class="text-[18px] md:text-3xl font-bold mb-8 mt-16">
            Hurray ! You are now our most esteemed user
          </p>

          <p class="text-[18px]  font-bold w-fit md:text-2xl lg:w-auto mb-10">
            Here's a platinum black card for all your troubles
          </p>

          <p class="lg:text-[20px] pb-2">
            (We don't know if this is usefull yet)
          </p>
        </div>

        <div class="h-1/2">
          <div class="flex items-center justify-center afu">
            <img
              src={Plat}
              className=" h-[180px] w-[350px] xl:h-[200px] xl:w-[370px] rounded-[15px] bgr mb-10"
            />
          </div>

      <div class="flex items-center justify-center afu">
    

      {/*<a href={linkProfile}>*/}
     <button onClick={()=>{
   profile1();
   }} class="border-2 h-[40px] w-[170px]  border-black flex justify-center items-center btnh border-dashed relative rounded-2xl
     top-[80px] text-xl lg:top-[100px] xl:top-[120px]  "

           
           > Continue </button>
           {/*</a>*/}
           
      </div>       
      
     </div>

    </div>

 </>
)

}

export default Page1;
