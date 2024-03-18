import React, { useState, useEffect } from "react";
import Plat from "./plat.jpeg"
import { LoginContext } from "../../helpers/Context";
import { useContext, useNavigate } from "react";
import axios from "axios";



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
    // console.log(user)
    setLinkProfile(`/`);
    
  };

  


return(

  <>
   {/* some classes are defined in fill details3 .css such as bgr afl afu */}

    <div className=" h-[100vh] w-[100vw] bg-white text-black  bgr">

      
      <div class="h-60 relative top-[50px] lg:top-[70px] afl">

           <p class="text-[18px] top-10 left-2 relative font-bold lg:text-3xl md:left-36 lg:left-36 xl:left-80">Hurray ! You are now our most esteemed user</p>
          
           <p class="text-[18px] top-6 left-12 relative font-bold w-80 lg:text-3xl lg:w-auto md:left-48 lg:top-8 xl:left-[500px]">Here's a platinum black card for all your troubles</p>

          <p class=" top-0 left-16 relative lg:text-[20px] md:left-48 lg:left-[360px] lg:top-4 xl:left-[620px]">(We don't know if this is usefull yet)</p>

      </div>


   
      <div  class="flex items-center justify-center afu">
      <img  src={Plat} className=" h-[180px] w-[350px] xl:h-[200px] xl:w-[370px] rounded-[15px] bgr relative top-[55px] lg:top-[70px] " />
       </div>  
      

      <div class="flex items-center justify-center afu">
    
      <a href={linkProfile}>
     <button onClick={()=>{
   profile1();
   }} class="border-2 h-[40px] w-[170px]  border-black flex justify-center items-center btnh border-dashed relative rounded-2xl
     top-[80px] text-xl lg:top-[100px] xl:top-[120px]  "
           
           > Continue </button>
           </a>
           
           
      
     </div>

    </div>

 </>
)

}

export default Page1