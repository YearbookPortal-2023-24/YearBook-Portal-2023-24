import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
// import "./otpVerificationnew.scss";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from "../../helpers/Context";
import { useContext, useNavigate } from "react";
import phone from "./th.png";
import './filldetails.css';
import Abtn from "./arrowBtn.png"

function Fill1(props){
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
  
  const [message, setMessage] = useState("");
  const [imageSelected, setImageSelected] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [verify, setVerify] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [upload, setUploaded] = useState(false);
  const [verify2, setVeriify2] = useState(false);
  const [state, setState] = useState(false);
  const [otp, setOtp] = useState("");
  const [rollNoisNumber, setRollNoisNumber] = useState("");
  const [sentOtp, setSentOtp] = useState(false);
  const [sub, setSub] = useState(false);
  const [wait, setWait] = useState(false);

  const auth = getAuth();

  const [hid, setHid] = useState(1);
  const [isValid, setIsValid] = useState(true);
  const [minutes, setMinutes] = useState(1);
const [seconds, setSeconds] = useState(1);
const[EmailId , setEmailId] = useState("")
const resendOTP = () => {
  setMinutes(0);
  setSeconds(30);
};
const [link, setLink] = useState(`/`);

const HandleEmpty = (e) => {

  //for handling empty text
  if(e==='')
  {
     toast("Please fill all the details !", {
        theme:"dark",
        autoClose: 3000,
     }); 
  }
}
  
      const onSubmit = () => {
        setState(true);
        setTimeout(() => {
          setState(false);
        }, 6000);
    
        axios
          .post(process.env.REACT_APP_API_URL + "/userDataemail", {
            email: user.email,
            personal_email_id: userData.personal_email_id
          })
          .then((res) => {
            console.log("yes1")
            axios
              .post(process.env.REACT_APP_API_URL + "/verify", {
                userId: user.email,
              })
              .then((res) => {
                console.log("yes2")
                
                setMessage("send Sent a verification email to your personal email_id");

                  setFill(true);
                  setVerified(true);
                  setProfileIcon(true);
                  setLoggedin(true);
                  window.localStorage.setItem("verified", true);
                  window.localStorage.setItem("profileIcon", true);
                  window.localStorage.setItem("loggedin", true);
                  setProfile(res.data.user);
    
                  window.localStorage.setItem(
                    "profile",
                    JSON.stringify(res.data.user)
                  );
    
                  setSentOtp(false);
                  setVerify(true);
                  setVeriify2(true);
                  window.localStorage.setItem("userData", JSON.stringify(userData));
    
                  // setTimeout(() => {
                  //   setMessage('')
                  // }, 8000)
                
                
                // setTimeout(() => {
                //   setMessage("");
                // }, 5000);
              })
              .catch((err) => {
                console.log(err);
              });
    
          })
          .catch((err) => {
            console.log(err);
          });
      };
      
    
      // const resendMail = () => {
      //   setState(true);
      //   setTimeout(() => {
      //     setState(false);
      //   }, 8000);
    
      //   axios
      //     .post(process.env.REACT_APP_API_URL + "/resendMail", {
      //       userId: user.email,
      //       personalMailId: userData.personal_email_id,
      //     })
      //     .then((res) => {})
      //     .catch((err) => {
      //       console.log(err);
      //     });
      // };

      const resendMail = () => {
        setMinutes(0);
        setSeconds(30);
        setLink(`/emailverification/${user.jti}`);
        
      };
      return (
        <> 
              <div class=" h-fit w-screen bg-slate-100  " >
        
                 {/* first page */}
        
                 
        
                 {/* secound page */}
        
                 {/* third page */}
        
        
        
                 
        
        
               {/* fifth page */}
        
        
                 <div class={hid == 1 ? " h-screen w-screen text-black flex justify-center items-center text-1xl relative border-green-600 border-b-2 bgr" : "hidden"}>
        
                    <div class="h-12 w-full top-44 left-4 absolute text-3xl  md:text-3xl md:top-40 lg:text-4xl xl:text-3xl lg:top-48 flex justify-center items-center tmp afd"> And your  <span class="text-red-600 ml-2 mr-2 text-5xl">   Personal </span> email ?  </div>
        
        
                    <div class="h-14 w-48 lg:h-14 lg:w-72 absolute top-[310px] lg:top-80 mt-0 flex justify-center items-center flex-row md:mt-4 lg:mt-0 lg:text-xl afd">
                    <input type="text"
                       placeholder="Personal Email ID*"
                       name="personal_email_id"
                      value={userData.personal_email_id}
                       class="h-[32px] w-[200px] lg:h-10 lg:w-64 lg:mt-12 border-2 border-black text-black"
                        onChange={(e)=>{setEmailId(e.target.value);
                          setUserData({ ...userData, [e.target.name]: e.target.value })
                          }}
                       ></input>
                    </div>
                    <div id="recaptcha-container"></div>
        
                    <button onClick={() => {
                        HandleEmpty(EmailId);
                        if(EmailId != ''){
                          setHid(2);
                          onSubmit();

                        }
                        else{
                          setHid(1)
                        }
                        // {EmailId != '' ? setHid(5): setHid(4)};
                    }} class="border-2 border-black h-8 w-32 bottom-56 flex items-center justify-center lg:bottom-60 absolute lg:left-[443px] lg:top-[400px]  p-0 text-base leading-none text-center  rounded-3xl md:top-96 md:mt-32   md:w-32 md:h-10  lg:mt-16   xl:left-[710px] btnh border-dashed afd"> Continue </button>
        
                    <button onClick={() => {
                       setHid(1);
                    }} > <img src={Abtn} class=" h-[60px] w-[60px] top-[40px] left-[7px] lg:h-[83px] lg:w-[90px] bottom-12 absolute md:top-[34px] md:left-[19px] xl:top-[45px] xl:left-[32px] xl:w-[97px] xl:h-[97px] btnh2 afr"/> </button>
        
                 </div>
        
        
                 
        
        
                 {/* seventh page */}
        
                 
        
                 {/* eight page */}
        
                 
               {/* fourth page */}
        
                 {/* sixth page */}
        
                 <div class={hid == 2 ? " h-screen w-screen text-black flex justify-center items-center text-1xl relative border-green-600 border-b-2 bgr" : "hidden"}>
        
                    <div class="h-12 w-full top-44 left-4 absolute text-4xl  md:text-4xl md:top-40 lg:text-4xl xl:text-5xl lg:top-48 flex justify-center items-center tmp atd ">Check your inbox. </div>
        
                    <div class="h-12 w-full top-56 left-4 absolute text-2xl  md:text-[20px] md:top-52 lg:text-[22px] lg:top-64 flex justify-center items-center tmp afu">(You may now close this window) </div>
        
                    
                    <button onClick={() => {
                       setHid(1);
                    }} > <img src={Abtn} class=" h-[60px] w-[60px] top-[40px] left-[7px] lg:h-[83px] lg:w-[90px] bottom-12 absolute md:top-[34px] md:left-[19px] xl:top-[45px] xl:left-[32px] xl:w-[97px] xl:h-[97px] btnh2 afu"/> </button>

                    <a href= {link} > 
                    <button onClick={() => {
                      resendMail();
                    }} class="border-2 px-6 py-1  border-black btnh border-dashed rounded-3xl afu md:mt-16 lg:mt-40 text-[1.3rem] ">Resend Mail</button>
                    </a> 



                 </div>
        
        
        
              </div> 
              <ToastContainer/>
              </>
           );
}
export default Fill1;