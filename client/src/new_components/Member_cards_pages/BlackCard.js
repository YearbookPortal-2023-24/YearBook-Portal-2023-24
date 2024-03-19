import React, { useState, useEffect } from "react";
import { LoginContext } from "../../helpers/Context";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import axios from "axios";
import alumniData from "../Navbar/akumniData.json";

function BlackCard(props) {
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
  console.log(userDetails);
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
    const profile = JSON.parse(window.localStorage.getItem("profile"));
    navigate(`/profile/${profile.roll_no}/${profile.name}`);
  };

  return (
    <>
      {/* some classes are defined in fill details3 .css such as bgr afl afu */}

      <div className="h-screen w-screen overflow-hidden flex flex-col items-center justify-center text-black bg-bg-white bg-cover">
        <p class="text-[18px] md:text-3xl font-bold mb-8 mt-16">
          Hurray ! You are now our most esteemed user
        </p>

        <p class="text-[18px]  font-bold w-fit md:text-2xl lg:w-auto mb-4">
          Here's a platinum black card for all your troubles
        </p>

        <p class="lg:text-[20px] mb-8">
          (We don't know if this is useful yet)
        </p>
        <img
          src="/images/MemberCards/blackcard.jpg"
          className=" h-[180px] w-[350px] xl:h-[200px] xl:w-[370px] rounded-[15px] mb-10"
        />
        <button
          onClick={() => {
            profile1();
          }}
          class="rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
        >
          {" "}
          Continue{" "}
        </button>
      </div>
    </>
  );
}

export default BlackCard;
