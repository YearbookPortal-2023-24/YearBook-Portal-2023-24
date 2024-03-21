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
import phoneimg from "./th.png";
import './filldetails.module.css';
import Abtn from "./arrowBtn.png"
import { PhoneInput } from 'react-international-phone';


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
  const [Otp1 , setOtp1] = useState("");
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
const [phone, setPhone] = useState('');

// const resendOTP = () => {
//   setMinutes(0);
//   setSeconds(30);
//   console.log(window.localStorage.getItem('_grecaptcha'))
//   window.localStorage.getItem('_grecaptcha').reset('recaptcha-container');

//   console.log(window.localStorage.getItem('_grecaptcha'))
  
//   axios
//           .post(process.env.REACT_APP_API_URL + "/userDataNew", {
//             email: user.email,
//             personal_email_id: userData.personal_email_id,
//             contact_details: userData.contact_details,
//           })
//           .then((res) => {
           
//               setMessage("Sent an OTP to your contact number.");
    
//               window.recaptchaVerifier = new RecaptchaVerifier(
//                 "recaptcha-container",
//                 {
//                   size: "invisible",
//                   callback: (response) => {
//                     console.log("recaptcha");
//                   },
//                 },
//                 auth
//               );
//               const phoneNumber = phone + res.data.contact_details;
    
//               const appVerifier = window.recaptchaVerifier;
    
//               signInWithPhoneNumber(auth, phoneNumber, appVerifier)
//                 .then((confirmationResult) => {
//                   window.confirmationResult = confirmationResult;
//                   setSentOtp(true);
//                   setSub(true);
//                 })
//                 .catch((error) => {
//                   // console.log(error);
//                   setMessage("Please enter your mobile number with +91");
//                 });
    
//               // setTimeout(()=>{
//               //   setMessage("")
//               // },15000)
//             // }
    
//           })
//           .catch((err) => {
//             console.log(err);
//           });



// };
const resendOTP = () => {
      setState(true);
      setTimeout(() => {
        setState(false);
      }, 20000);}

// const resendOTP = () => {
//     setState(true);
//     setTimeout(() => {
//       setState(false);
//     }, 20000);
//     axios
//       .post(process.env.REACT_APP_API_URL + "/resendOTP", {
//         phoneOTP: otp,
//         userId: user.email,
//       })
//       .then((res) => {
//         console.log(res);
//         if (res.data.message === "Mobile number verified") {
//         } else {
//           setMessage(res.data.message);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

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

 const userDetails = JSON.parse(localStorage.getItem("profile"));
// console.log(userDetails);
  
      const onSubmit = () => {
        setState(true);
        setTimeout(() => {
          setState(false);
        }, 6000);
    
        axios
          .post(process.env.REACT_APP_API_URL + "/userDataNew", {
            email: user.email,
            personal_email_id: userData.personal_email_id,
            contact_details: userData.contact_details,
          })
          .then((res) => {
           
              setMessage("Sent an OTP to your contact number.");
    
              window.recaptchaVerifier = new RecaptchaVerifier(
                "recaptcha-container",
                {
                  size: "invisible",
                  callback: (response) => {
                    console.log("recaptcha");
                  },
                },
                auth
              );
              const phoneNumber = phone + res.data.contact_details;
    
              const appVerifier = window.recaptchaVerifier;
    
              signInWithPhoneNumber(auth, phoneNumber, appVerifier)
                .then((confirmationResult) => {
                  window.confirmationResult = confirmationResult;
                  setSentOtp(true);
                  setSub(true);
                })
                .catch((error) => {
                  // console.log(error);
                  setMessage("Please enter your mobile number with +91");
                });
    
              // setTimeout(()=>{
              //   setMessage("")
              // },15000)
            // }
    
          })
          .catch((err) => {
            console.log(err);
          });
      };
      const otpVerify = (e) => {
        e.preventDefault();
    
        setState(true);
        setTimeout(() => {
          setState(false);
        }, 20000);
    
        const code = otp;
    
        window.confirmationResult
          .confirm(code)
          .then((result) => {
            axios
              .post(process.env.REACT_APP_API_URL + "/verify", {
                userId: user.email,
              })
              .then((res) => {
                if (
                  res.data.message ===
                  "Sent a verification email to your personal email_id"
                ) {
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
                }
                setMessage(res.data.message);
                // setTimeout(() => {
                //   setMessage("");
                // }, 5000);
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((error) => {
            // console.log(error);
            setMessage("Incorrect OTP");
          });
      };

const resendMail = () => {
        setMinutes(0);
        setSeconds(30);
        setLink(`/emailverification/${user.jti}`);
        
      };
    
// const resendMail = () => {
//         setState(true);
//         setTimeout(() => {
//           setState(false);
//         }, 8000);
    
//         axios
//           .post(process.env.REACT_APP_API_URL + "/resendMail", {
//             userId: user.email,
//             personalMailId: userData.personal_email_id,
//           })
//           .then((res) => {})
//           .catch((err) => {
//             console.log(err);
//           });
//       };
      return(
        <> 
              <div class=" h-fit w-screen bg-slate-100  " >
        
                 {/* first page */}
        
                 
        
                 {/* secound page */}
        
                 {/* third page */}
        
        
        
                 <div class={hid == 1 ? " h-screen w-screen text-black flex justify-center items-center text-1xl relative border-green-600 border-b-2 bgr fadeInRight " : "hidden"}>
        
                 <div class="h-12 top-44 text-[25px]  absolute  md:text-3xl md:top-40  lg:text-4xl lg:top-48 flex justify-center items-center tmp afu "> We want to remember you forever 🤞  </div>

                      <div class=" h-10 top-56 text-[25px] absolute md:text-3xl md:top-64 lg:mt-2 lg:text-4xl flex justify-center items-center tmp afu"> Do tell us your <span class="text-red-600 ml-4">phone number</span> </div>
                      

                      <div class="mt-0  ml-14 md:ml-24 mr-64 md:mt-32 md:mr-72 lg:ml-9 afu" >
              <PhoneInput
       
                style={   {marginTop:"49px" , padding: '0px', fontSize: '25px',border: '2px solid black',width:'80px', }}
                defaultCountry="in"
                value={phone}
                onChange={(phone) => setPhone(phone)}  
              />
            </div>

          <div class="h-64 flex justify-center items-center flex-row ml-7 md:mt-32 afu absolute">
      
            <div>
              <input
                type="text"
                class=" h-[41px] w-[200px] lg:h-10 lg:w-64 mt-12 border-2 border-black text-black rounded-2xl text-center"
                placeholder="Contact Number*"
                name="contact_details"
                value={userData.contact_details}
                onChange={(e) => {
                  // HandleEmptyNo(e);
                  setUserData({ ...userData, [e.target.name]: e.target.value });
                }}
              ></input>
            </div>
          </div>           
                   
        
        
        
        <button onClick={() => { 
                       if(isValid)
                       {
                        setHid(2);
                       }
                       else{
                          setHid(1);
                          toast("Make sure you entered 10 digits !", {
                             theme:"dark",
                             autoClose: 3000,
                          }); 
                       }
                       
                    }} class="h-8 w-32 flex items-center justify-center border-2 border-black bottom-36 absolute p-0 text-base leading-none text-center  rounded-3xl md:top-96 md:mt-32 md:w-32 md:h-10  lg:mt-[12rem] btnh border-dashed afu "> Continue </button>
        
                    
        
                    <div class=" absolute bottom-4 left-4 lg:bottom-16 lg:left-8 afu"><img src={phoneimg} alt="phone" class=" h-[90px] w-[90px] lg:h-40 lg:w-40" /></div>
        
                    <button onClick={() => {
                       setHid(1);
                    }} > <img src={Abtn}  class=" h-[60px] w-[60px] lg:h-[83px] lg:w-[90px] bottom-12 absolute top-[23px] right-8 md:top-[24px] xl:top-[14px] lg:right-10 xl:w-[97px] xl:h-[97px] btnh2 afr"/> </button>
        
        
                 </div>
        
        
               {/* fifth page */}
        
        
                 <div class={hid == 2 ? " h-screen w-screen text-black flex justify-center items-center text-1xl relative border-green-600 border-b-2 bgr" : "hidden"}>
        
                    <div class="h-12 w-full top-44 left-4 absolute text-3xl  md:text-3xl md:top-40 lg:text-4xl xl:text-3xl lg:top-48 flex justify-center items-center tmp afd"> And your  <span class="text-red-600 ml-2 mr-2 text-5xl">   Personal </span> email ?  </div>
        
        
                    <div class="h-14 w-48 lg:h-14 lg:w-72 absolute top-[310px] lg:top-80 mt-0 flex justify-center items-center flex-row md:mt-4 lg:mt-0 lg:text-xl afd">
                    <input type="text"
                       placeholder="Personal Email ID*"
                       name="personal_email_id"
                      value={userData.personal_email_id}
                      class="h-[32px] w-[200px] lg:h-10 lg:w-64 lg:mt-12 border-2 border-black text-black rounded-2xl text-center"
                        onChange={(e)=>{setEmailId(e.target.value);
                          setUserData({ ...userData, [e.target.name]: e.target.value })
                          }}
                       ></input>
                    </div>
                    <div id="recaptcha-container"></div>
        
                    <button onClick={() => {
                        HandleEmpty(EmailId);
                        if(EmailId != ''){
                          setHid(3);
                          onSubmit();

                        }
                        else{
                          setHid(2)
                        }
                        // {EmailId != '' ? setHid(5): setHid(4)};
                    }} class="border-2 border-black h-8 w-32 bottom-56 flex items-center justify-center lg:bottom-60 absolute lg:left-[443px] lg:top-[400px]  p-0 text-base leading-none text-center  rounded-3xl md:top-96 md:mt-32   md:w-32 md:h-10  lg:mt-16   xl:left-[710px] btnh border-dashed afd"> Continue </button>
        
                    <button onClick={() => {
                       setHid(1);
                    }} > <img src={Abtn}  class=" h-[60px] w-[60px] lg:h-[83px] lg:w-[90px] bottom-12 absolute top-[23px] right-8 md:top-[24px] xl:top-[14px] lg:right-10 xl:w-[97px] xl:h-[97px] btnh2 afr"/> </button>
        
                 </div>
        
        
                 
        
        
                 {/* seventh page */}
        
                 
        
                 {/* eight page */}
        
                 
               {/* fourth page */}
        
        <div class={hid == 3 ? " h-screen w-screen text-black flex justify-center items-center  relative border-green-600 border-b-2 bgr " : "hidden"}>
        
        <div class="h-12 w-full top-44 left-4 absolute text-[23px]  md:text-3xl md:top-40 lg:text-[34px] xl:text-4xl lg:top-48 flex justify-center items-center tmp asr "> Don't take it personally "Corporate" wants to verify your phone number  </div>
        
        <div class=" h-10 w-full top-[250px] left-0 absolute md:text-3xl md:top-64 md:w-100 md:left-14 lg:mt-0 lg:text-[18px] lg:left-12 flex justify-center asr"> (Enter the OTP you recieved on your phone)  </div>
        
        <div class="h-14 w-48  absolute top-80 mt-10 flex justify-center items-center flex-row md:mt-4 lg:mt-10 lg:text-xl afu">
           <input type="text" class="h-[32px] w-[200px] lg:h-10 lg:w-64 lg:mt-12 border-2 border-black text-black rounded-2xl"
           onChange={(e)=>{setOtp1(e.target.value);
              setOtp(e.target.value)}}
           ></input>
        </div>
        
        <button 
        // disabled={seconds > 0 || minutes > 0}
        // style={{
        //   color: seconds > 0 || minutes > 0 ? "#DFE3E8" : "#000000",
        // }}
        onClick={() => {
           resendOTP();
        }} 
        
        class="border-2 border-black flex items-center justify-center  h-8 w-32 bottom-36 left-10 absolute lg:left-[350px] p-0 text-base leading-none rounded-3xl md:top-96 md:mt-32   md:w-32 md:h-10  lg:mt-28  xl:left-[550px] afu"> Resend Otp </button>
        
        <div class="flex bottom-16 left-6 absolute lg:left-[350px] md:bottom-2 md:mt-32  md:h-10  lg:mt-28  xl:left-[535px] xl:bottom-28 afu " >
        {seconds > 0 || minutes > 0 ? (
                <p>
                  Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </p>
              ) : (
                <p>Didn't recieve code?</p>
              )}
        </div>
        
        
        <button onClick={(e) => {
           
        
           HandleEmpty(Otp1);
           otpVerify(e)
           console.log("yess");
           console.log(userDetails);

           {verify == true ? setHid(4) : setHid(3)};
        
        }} class="h-8 w-32 flex items-center justify-center border-2 border-black bottom-36 absolute right-8 lg:right-[322px]  p-0 text-base leading-none text-center  rounded-3xl md:top-96 md:mt-32   md:w-32 md:h-10  lg:mt-28 xl:right-[550px] btnh border-dashed afu"> Continue </button>
        
        <button onClick={() => {
           setHid(2 );
        }} > <img src={Abtn}  class=" h-[60px] w-[60px] lg:h-[83px] lg:w-[90px] bottom-12 absolute top-[23px] right-8 md:top-[24px] xl:top-[14px] lg:right-10 xl:w-[97px] xl:h-[97px] btnh2 afr"/> </button>
        
        </div>
                 {/* sixth page */}
        
                 <div class={hid == 4 ? " h-screen w-screen text-black flex justify-center items-center text-1xl relative border-green-600 border-b-2 bgr" : "hidden"}>
        
                    <div class="h-12 w-full top-44 left-4 absolute text-4xl  md:text-4xl md:top-40 lg:text-4xl xl:text-5xl lg:top-48 flex justify-center items-center tmp atd ">Check your inbox. </div>
        
                    <div class="h-12 w-full top-56 left-4 absolute text-2xl  md:text-[20px] md:top-52 lg:text-[22px] lg:top-64 flex justify-center items-center tmp afu">(You may now close this window) </div>
        
                    
                    <button onClick={() => {
                       setHid(3);
                    }} > <img src={Abtn}  class=" h-[60px] w-[60px] lg:h-[83px] lg:w-[90px] bottom-12 absolute top-[23px] right-8 md:top-[24px] xl:top-[14px] lg:right-10 xl:w-[97px] xl:h-[97px] btnh2 afr"/> </button>

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