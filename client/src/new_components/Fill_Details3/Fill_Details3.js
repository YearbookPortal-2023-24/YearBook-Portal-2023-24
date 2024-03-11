import React, { useState, useEffect } from "react";
import profilepic from "./profile.jpeg"
import arrow from "./arrow.png"
import './filldetails.css';
import phone from "./th.png";
import './filldetails.css';
import Abtn from "./arrowBtn.png"

//for notification
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { LoginContext } from "../../helpers/Context";
import { useContext, useNavigate } from "react";


function Fill3() {

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
      const [state1, setState1] = useState(false);
      const [otp, setOtp] = useState("");
      const [rollNoisNumber, setRollNoisNumber] = useState("");
      const [sentOtp, setSentOtp] = useState(false);
      const [sub, setSub] = useState(false);
      const [wait, setWait] = useState(false);

  const [hid, setHid] = useState(1);

  const [Name , setName] = useState("");
  const [RollNo , setRollNo] = useState("");
  const [AcadP , setAcadP] = useState("");
  const [Deprt , setDeprt] = useState("");
  const [MobileNo , setMobileNo] = useState("");
  const [Otp1 , setOtp1] = useState("");
  const[EmailId , setEmailId] = useState("")
  const [Otp2 , setOtp2] = useState("");
  const [alternate_contact_details , setalternate_contact_details] = useState("");
  const [address , setaddress] = useState("");
  const [current_company , setcurrent_company] = useState("");
  const [designation , setdesignation] = useState("");
  const [about , setabout] = useState("");
  const [question_2 , setquestion_2] = useState("");
  const [question_1 , setquestion_1] = useState("");
  
  
  
  const [isValid, setIsValid] = useState(true);
  const [isValidR, setIsValidR] = useState(true);
  

  const auth = getAuth();
  
  const onSubmit = () => {
    setState(true);
    setTimeout(() => {
      setState(false);
    }, 6000);
    axios
      .post(process.env.REACT_APP_API_URL + "/userData", {
         email: user.email,
         name: userData.name,
         roll_no: userData.roll_no,
         academic_program: userData.academic_program,
         department: userData.department,
         personal_email_id: userData.personal_email_id,
         contact_details: userData.contact_details,
         alternate_contact_details: userData.alternate_contact_details,
         address: userData.address,
         current_company: userData.current_company,
         designation: userData.designation,
         about: userData.about,
         profile_img: imageUrl,
         question_1: userData.question_1,
         question_2: userData.question_2,
      })
      .then((res) => {
         console.log(res)
         // if (res.data.message === "Roll No. should be in Digits") {
         if(res.data.message !== "Sent an OTP to your contact number."){
         setMessage(res.data.message);
         const timetochangemsg = setTimeout(() => {
            setMessage("");
         }, 1500); // delay execution by 2 second

         return () => clearTimeout(timetochangemsg);
         }

         if (res.data.message === "Sent an OTP to your contact number.") {
         setMessage(res.data.message);
         

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
          console.log("yess")
         const phoneNumber = userData.contact_details;

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
         }

      })
      .catch((err) => {
         console.log(err);
      });
};

const otpVerify = () => {
   // e.preventDefault();

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
            console.log(res.data.mmessage)
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

const uploadImage = () => {
   setUploaded(true);

   const formData = new FormData();
   formData.append("file", imageSelected);
   formData.append("upload_preset", "profile_img");

   setWait(true);
   axios
     .post("https://api.cloudinary.com/v1_1/dsdrcddr4/image/upload", formData)
     .then((res) => {
       setWait(false);
       setImageUrl(res.data.url);
       setImageUploaded(true);
       setTimeout(() => {
         setImageUploaded(false);
       }, 10000);
     });
 };

//  function for alerting on empty input

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
const HandleROll = (e) => {
      toast("Roll Number can only be in Digits", {
         theme:"dark",
         autoClose: 3000,
      }); 
}

const HandleEmptyNo = (event) => {
   const isValidFormat = /^\d{10}$/.test(event.target.value);
   setIsValid(isValidFormat);
   setMobileNo(event.target.value);
console.log(isValid);
}

const HandleDigitsOnly = (event) => {
   const containsOnlyDigits = /^\d+$/.test(event.target.value); 
   setIsValidR(containsOnlyDigits);
   setRollNo(event.target.value);
   console.log(containsOnlyDigits);
}


const [minutes, setMinutes] = useState(1);
const [seconds, setSeconds] = useState(1);

const resendOTP = () => {
   setMinutes(0);
   setSeconds(30);
 };

 useEffect(() => {
  const interval = setInterval(() => {
    if (seconds > 0) {
      setSeconds(seconds - 1);
    }

    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(interval);
      } else {
        setSeconds(5);
        setMinutes(minutes - 1);
      }
    }
  }, 1000);

  return () => {
    clearInterval(interval);
  };
}, [seconds]);


   return (
<> 
      <div class=" h-fit w-screen bg-slate-100  " >

         {/* first page */}

         <div class={hid == 1 ? " h-screen w-screen text-black flex justify-center text-2xl relative border-green-600 border-b-2 bgr  " : "hidden"}>


            <div class=" h-12 top-44 absolute text-[30px] md:text-5xl lg:text-6xl lg:top-60 tmp afu"> Just To Verify Your Name Is ?</div>

            <div class=" h-10 top-72 absolute md:top-80 md:w-80 lg:mt-20 afu"> 
            <input type="text" 
            placeholder="name"
            name="name"
            value={userData.name} 
            class="text-center text-black p-0 m-0 border-2 rounded-[7px] bg-white border-black "
             onChange={(e)=>{
               setUserData({ ...userData, [e.target.name]: e.target.value});
               setName(e.target.value); }
            
            }
            ></input> </div>


            <button onClick={() => {
               HandleEmpty(Name);
               {Name != '' ? setHid(2) : setHid(1)};
            
               
            }} class="border-2 border-black flex justify-center items-center h-[35px] w-[130px] lg:h-10 lg:w-32 top-[26rem] absolute p-0 mb-1 text-base leading-none text-center afu  rounded-3xl md:top-96 md:mt-14   md:w-32 md:h-10  lg:mt-36 btnh border-dashed "
           

            > Continue </button>
              

         </div>

         {/* secound page */}

         <div class={hid == 2 ? "h-screen w-screen text-black flex justify-center text-1xl relative border-green-600 border-b-2 bgr " : "hidden"}>

            <div class="h-12 top-36 left-4 absolute text-2xl  md:text-3xl md:top-40  lg:text-4xl lg:top-36 lg:left-44 tmp afr "> Right, of course we knew that  🙄</div>

            <div class=" h-10 top-48 left-12 absolute text-2xl md:text-3xl md:top-56 md:w-100 md:left-14 lg:mt-0 lg:text-4xl lg:left-64 tmp afr"> Verify your academic details to continue </div>

            <div class="h-52 w-full  absolute top-64 flex justify-center items-center flex-col md:flex-row md:mt-4 lg:mt-10 lg:text-xl afr">


               <div class="h-12 w-64 flex flex-col  md:w-56 lg:w-80 mt-1 mb-4 items-center afr" >

                  <h1 class=" text-base text-center text-black lg:text-2xl">Roll number</h1>

                  <input type="text" 
                   placeholder="Roll Number*"
                  name="roll_no"
                  value={userData.roll_no}
                  class="text-center text-black rounded-[9px] h-6 w-[210px] border-2 border-black mt-1 p-2 md:w-40 lg:w-52 lg:mt-4 xl:h-7"
                  onChange={(e) =>{
                  setUserData({ ...userData, [e.target.name]: e.target.value });
                  setRollNo(e.target.value);
                  HandleDigitsOnly(e)
                     }
                     }
                  ></input>
               </div>


               <div class="h-12 w-64 flex flex-col md:w-56 lg:w-80 mt-3 lg:mt-0 mb-4 items-center " >
                  <h1 class=" text-base text-center text-black lg:text-2xl">Branch</h1>

                  {/* <input type="text" class="text-center text-black rounded-[9px] h-6 w-[210px] border-2 border-black mt-1 p-2 md:w-40 lg:w-52 lg:mt-4 xl:h-7"></input> */}

                  <select name="academic_program" 
                  defaultValue={userData.academic_program}
                  class="text-center text-black rounded-[9px] text-[13.5px] h-7 lg:h-8 w-[210px] border-2 border-black mt-1 p-1 md:w-40 lg:w-60 lg:mt-3 lg:text-[15px] xl:h-9 xl:text-[16px] "
                   onChange={(e)=>{setAcadP(e.target.value);
                     setUserData({ ...userData, [e.target.name]: e.target.value });}}
                  >
                     
                     <option value="" name="Academic Program" disabled="" selected="" class="selct">Academic Program</option><option value="Bachelor of Technology (BTech)" name="academic_program" class="selct">Bachelor of Technology (BTech)</option><option value="Master of Technology (MTech)" name="academic_program" class="selct">Master of Technology (MTech)</option><option value="Master of Science (MSc)" name="academic_program" class="selct">Master of Science (MSc)</option><option value="Five Year BTech + MTech" name="academic_program" class="selct">Five Year BTech + MTech</option><option value="MS (Research)" name="academic_program" class="selct">MS (Research)</option><option value="Doctor of Philosophy" name="academic_program" class="selct">Doctor of Philosophy</option>
                     onChange={(e)=>{setAcadP(e.target.value);}}
                     </select>

               </div>


               <div class="h-12 w-64 flex flex-col mt-4 md:w-56 lg:w-80 lg:mt-0 lg:mb-4 items-center" >
                  <h1 class=" text-base text-center text-black lg:text-2xl">Department</h1>

                  <select name="department" 
                  defaultValue={userData.department}
                  class="text-center text-black rounded-[9px] text-[13.5px] h-7 lg:h-8 w-[210px] border-2 border-black mt-1 p-1 md:w-40 lg:w-60 lg:mt-3 lg:text-[15px] xl:h-9 xl:text-[16px] "
                   onChange={(e)=>{setDeprt(e.target.value);
                     setUserData({ ...userData, [e.target.name]: e.target.value });}}
                  >
                     
                     <option value="" class="selct" name="Department" disabled="" selected="">Department</option><option value="Computer Science and Engineering" name="department" class="selct">Computer Science and Engineering</option><option value="Electrical Engineering" name="department" class="selct">Electrical Engineering</option><option value="Mechanical Engineering" name="department" class="selct">Mechanical Engineering</option><option value="Civil Engineering" name="department" class="selct">Civil Engineering</option><option value="Metallurgy Engineering and Materials Science" name="department" class="selct" >Metallurgy Engineering and Materials Science</option><option value="Astronomy, Astrophysics and Space Engineering" name="department" class="selct">Astronomy, Astrophysics and Space Engineering</option><option value="Biosciences and Biomedical Engineering" name="department" class="selct">Biosciences and Biomedical Engineering</option><option value="Physics" name="department" class="selct">Physics</option><option value="Chemistry" name="department" class="selct">Chemistry</option><option value="Mathematics" name="department" class="selct">Mathematics</option><option value="Humanities and Social Sciences" name="department" class="selct">Humanities and Social Sciences</option><option value="Electric Vehicle Technology" name="department" class="selct">Electric Vehicle Technology</option>
                     
                    
                     </select>


               </div>
              



            </div>


            <button onClick={() => {
               // HandleEmpty(RollNo);
               // HandleEmpty(AcadP);
               // HandleEmpty(Deprt);
               {if ( Deprt=== '' || AcadP === '') {
                  setHid(2);
                   HandleEmpty(""); 
               } else {
                  if(isValidR)
                  { setHid(3)}
                  else{
                     HandleROll("");
                  }
                  
               }}
            }} class="border-2 border-black h-8 w-32 bottom-[6rem] flex justify-center items-center lg:bottom-20 absolute p-0 text-base leading-none text-center  rounded-3xl md:top-96 md:mt-32   md:w-32 md:h-10  lg:mt-36 btnh border-dashed afu "> Continue </button>


            <button onClick={() => {
               setHid(1);
            }} > <img src={Abtn} class=" h-[60px] w-[60px] lg:h-[83px] lg:w-[90px] bottom-12 absolute top-[23px] left-[7px] md:top-[24px] md:left-[19px] xl:top-[14px] xl:left-[32px] xl:w-[97px] xl:h-[97px] btnh2 afr"/> </button>



         </div>



         {/* third page */}



         <div class={hid == 3 ? " h-screen w-screen text-black flex justify-center items-center text-1xl relative border-green-600 border-b-2 bgr fadeInRight " : "hidden"}>

            <div class="h-12 top-44 text-[25px]  absolute  md:text-3xl md:top-40  lg:text-4xl lg:top-48 flex justify-center items-center tmp afu "> We want to remember you forever 🤞  </div>

            <div class=" h-10 top-56 text-[25px] absolute md:text-3xl md:top-64 lg:mt-2 lg:text-4xl flex justify-center items-center tmp afu"> Do tell us your <span class="text-red-600 ml-4">phone number</span> </div>

             <div class=" lg:h-14 lg:w-48  absolute top-76 mt-12 flex justify-center items-center flex-row md:mt-4 lg:mt-10 lg:text-xl afu">
             <input type="text"
               placeholder="Contact Number*"
               name="contact_details"
               value={userData.contact_details} 
               class=" h-[32px] w-[200px] lg:h-10 lg:w-64 mt-12 border-2 border-black text-black"
               onChange={(e)=>{
                  // HandleEmptyNo(e);
                  setUserData({ ...userData, [e.target.name]: e.target.value });
                  
               }
               }
               ></input>         
            </div>           
           



<button onClick={() => { 
               if(isValid)
               {
                setHid(4);
               }
               else{
                  setHid(3);
                  toast("Make sure you entered 10 digits !", {
                     theme:"dark",
                     autoClose: 3000,
                  }); 
               }
               
            }} class="h-8 w-32 flex items-center justify-center border-2 border-black bottom-36 absolute p-0 text-base leading-none text-center  rounded-3xl md:top-96 md:mt-32 md:w-32 md:h-10  lg:mt-[12rem] btnh border-dashed afu "> Continue </button>

            

            <div class=" absolute bottom-4 left-4 lg:bottom-16 lg:left-8 afu"><img src={phone} alt="phone" class=" h-[90px] w-[90px] lg:h-40 lg:w-40" /></div>

            <button onClick={() => {
               setHid(2);
            }} > <img src={Abtn} class=" h-[60px] w-[60px] top-[40px] left-[7px] lg:h-[83px] lg:w-[90px] bottom-12 absolute md:top-[44px] md:left-[19px] xl:top-[34px] xl:left-[32px] xl:w-[97px] xl:h-[97px] btnh2 afr "/> </button>


         </div>


       {/* fifth page */}


         <div class={hid == 4 ? " h-screen w-screen text-black flex justify-center items-center text-1xl relative border-green-600 border-b-2 bgr" : "hidden"}>

            <div class="h-12 w-full top-44 left-4 absolute text-3xl  md:text-3xl md:top-40 lg:text-4xl xl:text-3xl lg:top-48 flex justify-center items-center tmp afd"> And your  <span class="text-red-600 ml-2 mr-2 text-5xl">   Personal </span> email ?  </div>


            <div class="h-14 w-48 lg:h-14 lg:w-72 absolute top-[310px] lg:top-80 mt-0 flex justify-center items-center flex-row md:mt-4 lg:mt-0 lg:text-xl afd">
            <input type="text"
               placeholder="Personal Email ID*"
               name="personal_email_id"
              value={userData.personal_email_id}
               class="h-[32px] w-[200px] lg:h-10 lg:w-64 lg:mt-12 border-2 border-black text-black"
                onChange={(e)=>{setEmailId(e.target.value);
                  setUserData({ ...userData, [e.target.name]: e.target.value })}}
               ></input>
            </div>


            <button onClick={() => {
                HandleEmpty(EmailId);
                {EmailId != '' ? setHid(5) : setHid(4)};
            }} class="border-2 border-black h-8 w-32 bottom-56 flex items-center justify-center lg:bottom-60 absolute lg:left-[443px] lg:top-[400px]  p-0 text-base leading-none text-center  rounded-3xl md:top-96 md:mt-32   md:w-32 md:h-10  lg:mt-16   xl:left-[710px] btnh border-dashed afd"> Continue </button>

            <button onClick={() => {
               setHid(3);
            }} > <img src={Abtn} class=" h-[60px] w-[60px] top-[40px] left-[7px] lg:h-[83px] lg:w-[90px] bottom-12 absolute md:top-[34px] md:left-[19px] xl:top-[45px] xl:left-[32px] xl:w-[97px] xl:h-[97px] btnh2 afr"/> </button>

         </div>


         


         {/* seventh page */}

         <div class={hid == 5 ? " h-screen w-screen text-black flex justify-center items-center text-1xl relative border-green-600 border-b-2  bgr" : "hidden"}>

            <div class="h-12 w-full top-36 left-8 absolute text-3xl  md:text-3xl md:top-40 lg:text-[35px] xl:text-3xl lg:top-48 lg:left-28 xl:left-80 tmp xl:top-48 abl"> We wanna <span class="text-red-600 ml-2 mr-2 text-5xl">SEE </span> you! please?</div>

            <div class=" h-10 w-full top-[205px] left-8 absolute text-[18px] md:text-3xl md:top-64 md:w-100 md:left-14 lg:mt-0 lg:text-[24px] lg:left-32 xl:left-80 tmp abl"> (we assure you, we are not creepy) 🙂  </div>

            <div class="w-[110px] h-[110px] md:w-60 md:h-60 border-2 border-gray-400 absolute right-2 top-64 md:right-28 md:top-20 rounded-full overflow-hidden flex justify-center items-center xl:top-30 xl:right-80 abl"><img src={imageUrl} class=" w-fit "></img></div>

            <img src={arrow} class="w-[95px] h-[62px] top-[372px] right-[115px] md:w-48 md:h-32 lg:top-[18rem] lg:right-[22rem] absolute xl:right-[38rem] abl "></img>

            <input type="file"
              id="imgip"
              onChange={(event) => {
                setImageSelected(event.target.files[0]);
              }}
               class="h-[32px] w-[200px] lg:h-10 lg:w-64 lg:mt-12 border-2 border-black text-black"
                
               ></input>
            {/* <button onClick={() => {}} class="border-2 border-black h-9 w-32 bottom-12 left-[30px] top-[424px] md:bottom-36 absolute md:right-[322px]  p-0 text-base leading-none text-center  rounded-3xl md:top-96 md:mt-32   md:w-32 md:h-10  lg:mt-2 lg:left-40 xl:left-[420px] xl:top-[400px] btnh border-dashed afu"> Choose File </button> */}

            <button onClick={() => {uploadImage()}} class="border-2 border-black h-9 w-32 bottom-12 left-[120px] top-[485px] md:bottom-36 absolute md:right-[322px]  p-0 text-base leading-none text-center  rounded-3xl md:top-96 md:mt-32   md:w-32 md:h-10  lg:mt-2 lg:left-80 xl:left-[580px] xl:top-[400px] btnh border-dashed afu"> Upload Photo </button>

            {upload && (
              <h3 style={{ color: "black" }}>
                {wait && "Wait... while image is uploading"}
                {imageUploaded && "Image Uploaded"}
              </h3>
            )}
<button onClick={() => {
               
               setHid(6);
            }} class="border-2 border-black h-8 w-32 bottom-[7rem] flex items-center justify-center absolute lg:left-[443px] lg:top-[470px]  p-0 text-base leading-none text-center  rounded-3xl md:top-96 md:mt-32   md:w-32 md:h-10  lg:mt-16   xl:left-[710px] btnh border-dashed afd"> Continue </button>
            
            <button onClick={() => {
               setHid(4);
            }} > <img src={Abtn} class=" h-[60px] w-[60px] top-[40px] left-[7px] lg:h-[83px] lg:w-[90px] bottom-12 absolute md:top-[34px] md:left-[19px] xl:top-[45px] xl:left-[32px] xl:w-[97px] xl:h-[97px] btnh2 afu"/> </button>

         </div>
             

         {/* eight page */}

         <div class={hid == 6 ? " h-[218vh]  md:h-[105vh]  w-screen text-black flex flex-row md:justify-center md:items-center text-1xl relative border-green-600 border-b-2 bgr " : "hidden"}>

           <div class="h-12 w-full text-3xl top-[122px] left-[42px] md:left-4 absolute  md:text-4xl md:top-28 lg:text-[42px] xl:text-4xl xl:top-44 flex    lg:left-[23rem] tmp asr"> Maybe, also fill these as well ?  </div>

            <div class="tmp h-10 w-full top-[166px] left-[17px] absolute md:text-3xl md:top-44 md:w-100 md:left-14 lg:mt-0 lg:text-[24px] lg:left-10 xl:top-60  flex justify-center asr"> (Our design team was out on vacation at this, so we couldn't create individual pages for this) 😅 </div>
       
         

            {/* 1st col  */}


            <div class="h-14 w-54  absolute top-[280px] left-[77px] md:top-[260px] flex justify-center items-center flex-row lg:text-xl md:left-28 xl:left-60 xl:top-[340px] af ">
               <input type="text" class=" font-bold h-[39px] w-[225px] md:h-10 md:w-[210px]  mt-0 border-2 border-black text-black text-sm" placeholder="Alternate Contact Number"
               name="alternate_contact_details"
              value={userData.alternate_contact_details}
              onChange={(e) =>{
               setalternate_contact_details(e.target.value);
                setUserData({ ...userData, [e.target.name]: e.target.value });
                
              }
              }
               ></input>
            </div>

            <div class="h-14 w-54  absolute top-[360px] left-[77px] md:top-[320px]  flex justify-center items-center flex-row md:mt-4 lg:mt-0 lg:text-xl md:left-28 xl:left-60 xl:top-[420px] af">
               <input type="text" class="font-bold h-[39px] w-[225px] md:h-10 md:w-[210px] mt-0 border-2 border-black text-black text-sm" placeholder="Address"
                name="address"
              value={userData.address}
              onChange={(e) =>{
                setUserData({ ...userData, [e.target.name]: e.target.value });
                setaddress(e.target.value);
              }

              }
               ></input>
            </div>

            <div class="h-14 w-54  absolute top-[440px] left-[77px] md:top-[400px] flex justify-center items-center flex-row md:mt-0 lg:mt-0 lg:text-xl md:left-28 xl:left-60 xl:top-[500px] af">
               <input type="text" class="font-bold h-[39px] w-[225px] md:h-10 md:w-[210px] mt-0 border-2 border-black text-black text-sm" placeholder="Current company (if any)"
                name="current_company"
              value={userData.current_company}
              onChange={(e) =>{
                setUserData({ ...userData, [e.target.name]: e.target.value });
                setcurrent_company(e.target.value);
              }
              }
               ></input>
            </div>

            <div class="h-14 w-54  absolute top-[520px] left-[77px] md:top-[480px] flex justify-center items-center flex-row md:mt-4 lg:mt-0 lg:text-xl md:left-28 xl:left-60 xl:top-[575px] af">
               <input type="text" class="font-bold h-[39px] w-[225px] md:h-10 md:w-[210px] mt-0 border-2 border-black text-black text-sm" placeholder="Designation"
                name="designation"
              value={userData.designation}
              onChange={(e) =>{
                setUserData({ ...userData, [e.target.name]: e.target.value });
                setdesignation(e.target.value);
              }
              }
               ></input>
            </div>

            {/* 2nd col */}

            <div class=" h-48 w-36 md:h-80 w-70 absolute top-[600px] left-[60px] md:top-[220px] mt-12 md:mt-8 lg:mt-[10rem] lg:text-xl md:left-[400px] xl:left-[570px] xl:mt-16  af">
               <textarea type="text" class=" rounded-xl bg-white font-bold  h-[17rem] w-[16rem] md:h-80 max-h-[17rem] md:w-[270px] lg:mt-[-8rem] xl:mt-12 border-2 border-black text-black text-base text-start p-2" placeholder="    About Me (50 - 60 words)"
                 name="about"
              value={userData.about}
              onChange={(e) =>{
                setUserData({ ...userData, [e.target.name]: e.target.value });
                setabout(e.target.value);
              }
              }
               ></textarea>
            </div>

            {/* 3rd col */}

            <div class="h-40 w-70  absolute top-[950px] left-[60px]  mt-4  md:top-[40px] md:mt-8 lg:mt-[13rem] lg:text-xl md:left-[720px] xl:left-[930px] xl:mt-28 xl:top-[220px] af">
               <textarea type="text" class="rounded-xl bg-white font-bold h-[12rem] max-h-[12rem] w-[16rem] md:h-28 md:max-h-28 md:w-[270px] border-2 border-black text-black text-base text-start p-2" placeholder=" what wil you miss the most after   graduating"
                  name="question_1"
              value={userData.question_1}
              onChange={(e) =>{
                setUserData({ ...userData, [e.target.name]: e.target.value });
                setquestion_1(e.target.value);

              }
              }
               ></textarea>
            </div>

            <div class="h-40 w-70  absolute top-[1180px] left-[60px]  mt-4  md:top-[40px] md:mt-8 lg:mt-[22rem] lg:text-xl md:left-[720px] xl:left-[930px] xl:mt-28 xl:top-[360px] af">
               <textarea type="text" class="rounded-xl bg-white font-bold h-[13rem] max-h-[13rem] w-[16rem] md:h-28 md:max-h-28 md:w-[270px] border-2 border-black text-black text-base text-start p-2" placeholder=" If you had power to implement a change in college what would it be?"
                  name="question_2"
              value={userData.question_2}
              onChange={(e) =>{
                setUserData({ ...userData, [e.target.name]: e.target.value });
                setquestion_2(e.target.value);
              }
              }
               ></textarea>
            </div>
            <div id="recaptcha-container"></div>


            <button className="submit1"
                  
                  id="sub5"
                  disabled={state}
                  onClick={() => {
              {
               if (alternate_contact_details === ''|| address=== '' || current_company === '' ||designation === '' || about=== ''|| question_1=== ''|| question_2=== '') {
                HandleEmpty(""); 
            } else {
               

               setHid(7)
               onSubmit()
            }}
            }} class="border-2 border-black h-8 w-32 bottom-[2rem]  left-32 flex items-center justify-center absolute lg:left-[469px] lg:bottom-[4rem]  p-0 text-base leading-none text-center  rounded-3xl md:bottom-[7rem] md:mt-32   md:w-32 md:h-10  lg:mt-8 xl:bottom-10  xl:left-[648px] btnh border-dashed afd"
            
            
         > Continue </button>



             <button onClick={() => {
               setHid(5);
            }} > <img src={Abtn} class=" h-[60px] w-[60px] top-[40px] lg:h-[83px] lg:w-[90px] bottom-12 absolute md:top-[34px] md:left-[19px] xl:top-[45px] xl:left-[32px] xl:w-[97px] xl:h-[97px] btnh2 afu"/> </button>

         </div>
       {/* fourth page */}

<div class={hid == 7 ? " h-screen w-screen text-black flex justify-center items-center  relative border-green-600 border-b-2 bgr " : "hidden"}>

<div class="h-12 w-full top-44 left-4 absolute text-[23px]  md:text-3xl md:top-40 lg:text-[34px] xl:text-4xl lg:top-48 flex justify-center items-center tmp asr "> Don't take it personally "Corporate" wants to verify your phone number  </div>

<div class=" h-10 w-full top-[250px] left-0 absolute md:text-3xl md:top-64 md:w-100 md:left-14 lg:mt-0 lg:text-[18px] lg:left-12 flex justify-center asr"> (Enter the OTP you recieved on your phone)  </div>

<div class="h-14 w-48  absolute top-80 mt-10 flex justify-center items-center flex-row md:mt-4 lg:mt-10 lg:text-xl afu">
   <input type="text" class="h-[32px] w-[200px] lg:h-10 lg:w-64 lg:mt-12 border-2 border-black text-black"
   onChange={(e)=>{setOtp1(e.target.value);
      setOtp(e.target.value)}}
   ></input>
</div>

<button 
disabled={seconds > 0 || minutes > 0}
style={{
  color: seconds > 0 || minutes > 0 ? "#DFE3E8" : "#000000",
}}
onClick={resendOTP}

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


<button onClick={() => {
   

   HandleEmpty(Otp1);
   otpVerify()
   {Otp1 != '' ? setHid(8) : setHid(7)};

}} class="h-8 w-32 flex items-center justify-center border-2 border-black bottom-36 absolute right-8 lg:right-[322px]  p-0 text-base leading-none text-center  rounded-3xl md:top-96 md:mt-32   md:w-32 md:h-10  lg:mt-28 xl:right-[550px] btnh border-dashed afu"> Continue </button>

<button onClick={() => {
   setHid(6 );
}} > <img src={Abtn} class="h-[60px] w-[60px] top-[50px] left-[7px] lg:h-[83px] lg:w-[90px] bottom-12 absolute md:top-[34px] md:left-[19px] xl:top-[45px] xl:left-[32px] xl:w-[97px] xl:h-[97px] btnh2 afr"/> </button>

</div>
         {/* sixth page */}

         <div class={hid == 8 ? " h-screen w-screen text-black flex justify-center items-center text-1xl relative border-green-600 border-b-2 bgr" : "hidden"}>

            <div class="h-12 w-full top-44 left-4 absolute text-4xl  md:text-4xl md:top-40 lg:text-4xl xl:text-5xl lg:top-48 flex justify-center items-center tmp atd ">Check your inbox. </div>

            <div class="h-12 w-full top-56 left-4 absolute text-2xl  md:text-[20px] md:top-52 lg:text-[22px] lg:top-64 flex justify-center items-center tmp afu">(You may now close this window) </div>

            
            <button onClick={() => {
               setHid(7);
            }} > <img src={Abtn} class=" h-[60px] w-[60px] top-[40px] left-[7px] lg:h-[83px] lg:w-[90px] bottom-12 absolute md:top-[34px] md:left-[19px] xl:top-[45px] xl:left-[32px] xl:w-[97px] xl:h-[97px] btnh2 afu"/> </button>

         </div>



      </div> 
      <ToastContainer/>
      </>
   )
   
}


export default Fill3
