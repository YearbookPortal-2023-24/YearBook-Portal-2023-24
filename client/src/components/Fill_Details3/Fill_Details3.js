import React, { useState, useEffect } from "react";
import profilepic from "./profile.jpeg"
import arrow from "./arrow.png"
import './filldetails.css';
import phone from "./th.png";
import Abtn from "./arrowBtn.png"

//for notification
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Fill3() {

  const [hid, setHid] = useState(1);

  const [Name , setName] = useState("");
  const [RollNo , setRollNo] = useState("");
  const [AcadP , setAcadP] = useState("");
  const [Deprt , setDeprt] = useState("");
  const [MobileNo , setMobileNo] = useState("");
  const [Otp1 , setOtp1] = useState("");
  const[EmailId , setEmailId] = useState("")
  const [Otp2 , setOtp2] = useState("");
  const [MobileNo2 , setMobileNo2] = useState("");
  const [Adress , setAdress] = useState("");
  const [Company , setCompany] = useState("");
  const [Design , setDesign] = useState("");
  const [About , setAbout] = useState("");
  const [Changes , setChanges] = useState("");
  const [Miss , setMiss] = useState("");
  
  
  
  const [isValid, setIsValid] = useState(false);


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

const HandleEmptyNo = (event) => {
   const isValidFormat = /^\d{10}$/.test(event.target.value);
   setIsValid(isValidFormat);
   setMobileNo(event.target.value);
console.log(isValid);

   // if(isValid)
   // {
   //  setHid(4);
   // }
   // else{
   //    setHid(3);
   //    toast("Make sure you entered 10 digits !", {
   //       theme:"dark",
   //       autoClose: 3000,
   //    }); 
   // }
}

   return (
<> 
      <div class=" h-fit w-screen bg-slate-100  " >

         {/* first page */}

         <div class={hid == 1 ? " h-screen w-screen text-black flex justify-center text-2xl relative border-green-600 border-b-2 bgr  " : "hidden"}>


            <div class=" h-12 top-44 absolute text-[30px] md:text-5xl lg:text-6xl lg:top-60 tmp afu"> Just To Verify Your Name Is ?</div>

            <div class=" h-10 top-72 absolute md:top-80 md:w-80 lg:mt-20 afu"> <input type="text" placeholder="name" class="text-center text-black p-0 m-0 border-2 rounded-[7px] bg-white border-black "
             onChange={(e)=>{setName(e.target.value);}
            
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

                  <input type="text" class="text-center text-black rounded-[9px] h-6 w-[210px] border-2 border-black mt-1 p-2 md:w-40 lg:w-52 lg:mt-4 xl:h-7"
                  onChange={(e)=>{setRollNo(e.target.value);}}
                  ></input>
               </div>


               <div class="h-12 w-64 flex flex-col md:w-56 lg:w-80 mt-3 lg:mt-0 mb-4 items-center " >
                  <h1 class=" text-base text-center text-black lg:text-2xl">Branch</h1>

                  {/* <input type="text" class="text-center text-black rounded-[9px] h-6 w-[210px] border-2 border-black mt-1 p-2 md:w-40 lg:w-52 lg:mt-4 xl:h-7"></input> */}

                  <select name="academic_program" class="text-center text-black rounded-[9px] text-[13.5px] h-7 lg:h-8 w-[210px] border-2 border-black mt-1 p-1 md:w-40 lg:w-60 lg:mt-3 lg:text-[15px] xl:h-9 xl:text-[16px] "
                   onChange={(e)=>{setAcadP(e.target.value);}}
                  >
                     
                     <option value="" name="Academic Program" disabled="" selected="">Academic Program</option><option value="Bachelor of Technology (BTech)" name="academic_program">Bachelor of Technology (BTech)</option><option value="Master of Technology (MTech)" name="academic_program">Master of Technology (MTech)</option><option value="Master of Science (MSc)" name="academic_program">Master of Science (MSc)</option><option value="Five Year BTech + MTech" name="academic_program">Five Year BTech + MTech</option><option value="MS (Research)" name="academic_program">MS (Research)</option><option value="Doctor of Philosophy" name="academic_program">Doctor of Philosophy</option>
                     onChange={(e)=>{setAcadP(e.target.value);}}
                     </select>

               </div>


               <div class="h-12 w-64 flex flex-col mt-4 md:w-56 lg:w-80 lg:mt-0 lg:mb-4 items-center" >
                  <h1 class=" text-base text-center text-black lg:text-2xl">Department</h1>

                  {/* <input type="text" class="text-center text-black rounded-[9px] h-6 w-[210px] border-2 border-black mt-1 p-2 md:w-40 lg:w-52 lg:mt-4 xl:h-7"></input> */}

                  <select name="department" class="text-center text-black rounded-[9px] text-[13.5px] h-7 lg:h-8 w-[210px] border-2 border-black mt-1 p-1 md:w-40 lg:w-60 lg:mt-3 lg:text-[15px] xl:h-9 xl:text-[16px] "
                   onChange={(e)=>{setDeprt(e.target.value);}}
                  >
                     
                     <option value="" name="Department" disabled="" selected="">Department</option><option value="Computer Science and Engineering" name="department">Computer Science and Engineering</option><option value="Electrical Engineering" name="department">Electrical Engineering</option><option value="Mechanical Engineering" name="department">Mechanical Engineering</option><option value="Civil Engineering" name="department">Civil Engineering</option><option value="Metallurgy Engineering and Materials Science" name="department">Metallurgy Engineering and Materials Science</option><option value="Astronomy, Astrophysics and Space Engineering" name="department">Astronomy, Astrophysics and Space Engineering</option><option value="Biosciences and Biomedical Engineering" name="department">Biosciences and Biomedical Engineering</option><option value="Physics" name="department">Physics</option><option value="Chemistry" name="department">Chemistry</option><option value="Mathematics" name="department">Mathematics</option><option value="Humanities and Social Sciences" name="department">Humanities and Social Sciences</option><option value="Electric Vehicle Technology" name="department">Electric Vehicle Technology</option>
                     
                    
                     </select>


               </div>


            </div>


            <button onClick={() => {
               // HandleEmpty(RollNo);
               // HandleEmpty(AcadP);
               // HandleEmpty(Deprt);
               {if (RollNo === ''|| Deprt=== '' || AcadP === '') {
                  setHid(2);
                   HandleEmpty(""); 
               } else {
                  setHid(3)
               }}
            }} class="border-2 border-black h-8 w-32 bottom-[6rem] flex justify-center items-center lg:bottom-20 absolute p-0 text-base leading-none text-center  rounded-3xl md:top-96 md:mt-32   md:w-32 md:h-10  lg:mt-36 btnh border-dashed afu "> Continue </button>


            <button onClick={() => {
               setHid(1);
            }} > <img src={Abtn} class=" h-[60px] w-[60px] lg:h-[83px] lg:w-[90px] bottom-12 absolute top-[23px] left-[7px] md:top-[24px] md:left-[19px] xl:top-[14px] xl:left-[32px] xl:w-[97px] xl:h-[97px] btnh2 afr"/> </button>



         </div>



         {/* third page */}



         <div class={hid == 3 ? " h-screen w-screen text-black flex justify-center items-center text-1xl relative border-green-600 border-b-2 bgr fadeInRight " : "hidden"}>

            <div class="h-12 w-full top-44 left-4 text-[25px]  absolute  md:text-3xl md:top-40  lg:text-4xl lg:top-48 flex justify-center items-center tmp afu "> We want to remember you forever 🤞  </div>

            <div class=" h-10 w-full top-56 left-2 text-[25px] absolute md:text-3xl md:top-64 md:w-100 md:left-14 lg:mt-2 lg:text-4xl lg:left-12 flex justify-center items-center tmp afu"> Do tell us your <span class="text-red-600 ml-4">phone number</span> </div>

            <div class=" lg:h-14 lg:w-48  absolute top-76 mt-12 flex justify-center items-center flex-row md:mt-4 lg:mt-10 lg:text-xl afu">
               <input type="text" class=" h-[32px] w-[200px] lg:h-10 lg:w-64 mt-12 border-2 border-black text-black"
               onChange={HandleEmptyNo}
               
               
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
               
            }} class="h-8 w-32 flex items-center justify-center border-2 border-black bottom-36 absolute p-0 text-base leading-none text-center  rounded-3xl md:top-96 md:mt-32   md:w-32 md:h-10  lg:mt-36 btnh border-dashed afu "> Continue </button>

            <div class=" absolute bottom-4 left-4 lg:bottom-16 lg:left-8 afu"><img src={phone} alt="phone" class=" h-[90px] w-[90px] lg:h-40 lg:w-40" /></div>

            <button onClick={() => {
               setHid(2);
            }} > <img src={Abtn} class=" h-[60px] w-[60px] top-[40px] left-[7px] lg:h-[83px] lg:w-[90px] bottom-12 absolute md:top-[44px] md:left-[19px] xl:top-[34px] xl:left-[32px] xl:w-[97px] xl:h-[97px] btnh2 afr "/> </button>


         </div>



         {/* fourth page */}

         <div class={hid == 4 ? " h-screen w-screen text-black flex justify-center items-center  relative border-green-600 border-b-2 bgr " : "hidden"}>

            <div class="h-12 w-full top-44 left-4 absolute text-[23px]  md:text-3xl md:top-40 lg:text-[34px] xl:text-4xl lg:top-48 flex justify-center items-center tmp asr "> Don't take it personally "Corporate" wants to verify your phone number  </div>

            <div class=" h-10 w-full top-[250px] left-0 absolute md:text-3xl md:top-64 md:w-100 md:left-14 lg:mt-0 lg:text-[18px] lg:left-12 flex justify-center asr"> (Enter the OTP you recieved on your phone)  </div>

            <div class="h-14 w-48  absolute top-80 mt-10 flex justify-center items-center flex-row md:mt-4 lg:mt-10 lg:text-xl afu">
               <input type="text" class="h-[32px] w-[200px] lg:h-10 lg:w-64 lg:mt-12 border-2 border-black text-black"
               onChange={(e)=>{setOtp1(e.target.value);}}
               ></input>
            </div>


            <button class="border-2 border-black flex items-center justify-center  h-8 w-32 bottom-36 left-10 absolute lg:left-[350px] p-0 text-base leading-none rounded-3xl md:top-96 md:mt-32   md:w-32 md:h-10  lg:mt-28  xl:left-[550px] afu"> Resend Otp </button>

            <button onClick={() => {
               
            
               HandleEmpty(Otp1);
               {Otp1 != '' ? setHid(5) : setHid(4)};

            }} class="h-8 w-32 flex items-center justify-center border-2 border-black bottom-36 absolute right-8 lg:right-[322px]  p-0 text-base leading-none text-center  rounded-3xl md:top-96 md:mt-32   md:w-32 md:h-10  lg:mt-28 xl:right-[550px] btnh border-dashed afu"> Continue </button>

<button onClick={() => {
               setHid(3);
            }} > <img src={Abtn} class="h-[60px] w-[60px] top-[50px] left-[7px] lg:h-[83px] lg:w-[90px] bottom-12 absolute md:top-[34px] md:left-[19px] xl:top-[45px] xl:left-[32px] xl:w-[97px] xl:h-[97px] btnh2 afr"/> </button>

         </div>


         {/* fifth page */}




         <div class={hid == 5 ? " h-screen w-screen text-black flex justify-center items-center text-1xl relative border-green-600 border-b-2 bgr" : "hidden"}>

            <div class="h-12 w-full top-44 left-4 absolute text-3xl  md:text-3xl md:top-40 lg:text-4xl xl:text-3xl lg:top-48 flex justify-center items-center tmp afd"> And your  <span class="text-red-600 ml-2 mr-2 text-5xl">   Personal </span> email ?  </div>


            <div class="h-14 w-48 lg:h-14 lg:w-72 absolute top-[310px] lg:top-80 mt-0 flex justify-center items-center flex-row md:mt-4 lg:mt-0 lg:text-xl afd">
               <input type="text" class="h-[32px] w-[200px] lg:h-10 lg:w-64 lg:mt-12 border-2 border-black text-black"
                onChange={(e)=>{setEmailId(e.target.value);}}
               ></input>
            </div>


            <button onClick={() => {
                HandleEmpty(EmailId);
                {EmailId != '' ? setHid(6) : setHid(5)};
            }} class="border-2 border-black h-8 w-32 bottom-56 flex items-center justify-center lg:bottom-60 absolute lg:left-[443px] lg:top-[400px]  p-0 text-base leading-none text-center  rounded-3xl md:top-96 md:mt-32   md:w-32 md:h-10  lg:mt-16   xl:left-[710px] btnh border-dashed afd"> Continue </button>

            <button onClick={() => {
               setHid(4);
            }} > <img src={Abtn} class=" h-[60px] w-[60px] top-[40px] left-[7px] lg:h-[83px] lg:w-[90px] bottom-12 absolute md:top-[34px] md:left-[19px] xl:top-[45px] xl:left-[32px] xl:w-[97px] xl:h-[97px] btnh2 afr"/> </button>

         </div>


         {/* sixth page */}

         <div class={hid == 6 ? " h-screen w-screen text-black flex justify-center items-center text-1xl relative border-green-600 border-b-2 bgr" : "hidden"}>

            <div class="h-12 w-full top-44 left-4 absolute text-3xl  md:text-3xl md:top-40 lg:text-4xl xl:text-5xl lg:top-48 flex justify-center items-center tmp atd ">You know the drill 😉</div>


            <div class="h-14 w-72 absolute top-72 text-sm lg:top-80 mt-0 flex justify-center items-center flex-row md:mt-4 lg:mt-0 lg:text-1xl">
               <input type="text" placeholder="Enter the OTP you recieved on your mail" class="h-10 w-[18rem] lg:w-72 text-[14px] mt-12 border-2 border-black text-black lg:text-[14px] text-center"
                 onChange={(e)=>{setOtp2(e.target.value);}}
               ></input>
            </div>

            <button onClick={() => {
               HandleEmpty(Otp2);
               {Otp2 != '' ? setHid(7) : setHid(6)};
            }} class="border-2 border-black h-8 w-32 bottom-[227px] flex items-center justify-center  lg:bottom-60 absolute lg:left-[443px] lg:top-[400px]  p-0 text-base leading-none text-center  rounded-3xl md:top-96 md:mt-32  md:w-32 md:h-10  lg:mt-16 xl:right-[550px]  xl:left-[710px] btnh border-dashed afu"> Verify </button>
            
            <button onClick={() => {
               setHid(5);
            }} > <img src={Abtn} class=" h-[60px] w-[60px] top-[40px] left-[7px] lg:h-[83px] lg:w-[90px] bottom-12 absolute md:top-[34px] md:left-[19px] xl:top-[45px] xl:left-[32px] xl:w-[97px] xl:h-[97px] btnh2 afu"/> </button>

         </div>

         {/* seventh page */}

         <div class={hid == 7 ? " h-screen w-screen text-black flex justify-center items-center text-1xl relative border-green-600 border-b-2  bgr" : "hidden"}>

            <div class="h-12 w-full top-36 left-8 absolute text-3xl  md:text-3xl md:top-40 lg:text-[35px] xl:text-3xl lg:top-48 lg:left-28 xl:left-80 tmp xl:top-48 abl"> We wanna <span class="text-red-600 ml-2 mr-2 text-5xl">SEE </span> you! please?</div>

            <div class=" h-10 w-full top-[205px] left-8 absolute text-[18px] md:text-3xl md:top-64 md:w-100 md:left-14 lg:mt-0 lg:text-[24px] lg:left-32 xl:left-80 tmp abl"> (we assure you, we are not creepy) 🙂  </div>

            <div class="w-[110px] h-[110px] md:w-60 md:h-60 border-2 border-gray-400 absolute right-2 top-64 md:right-28 md:top-20 rounded-full overflow-hidden flex justify-center items-center xl:top-30 xl:right-80 abl"><img src={profilepic} class=" w-fit "></img></div>

            <img src={arrow} class="w-[95px] h-[62px] top-[372px] right-[115px] md:w-48 md:h-32 lg:top-[18rem] lg:right-[22rem] absolute xl:right-[38rem] abl "></img>

            <button onClick={() => {
               
            }} class="border-2 border-black h-9 w-32 bottom-12 left-[30px] top-[424px] md:bottom-36 absolute md:right-[322px]  p-0 text-base leading-none text-center  rounded-3xl md:top-96 md:mt-32   md:w-32 md:h-10  lg:mt-2 lg:left-80 xl:left-[580px] xl:top-[400px] btnh border-dashed afu"> Upload photo </button>

<button onClick={() => {
               setHid(8);
            }} class="border-2 border-black h-8 w-32 bottom-[7rem] flex items-center justify-center absolute lg:left-[443px] lg:top-[470px]  p-0 text-base leading-none text-center  rounded-3xl md:top-96 md:mt-32   md:w-32 md:h-10  lg:mt-16   xl:left-[710px] btnh border-dashed afd"> Continue </button>
            
            <button onClick={() => {
               setHid(6);
            }} > <img src={Abtn} class=" h-[60px] w-[60px] top-[40px] left-[7px] lg:h-[83px] lg:w-[90px] bottom-12 absolute md:top-[34px] md:left-[19px] xl:top-[45px] xl:left-[32px] xl:w-[97px] xl:h-[97px] btnh2 afu"/> </button>

         </div>


         {/* eight page */}

         <div class={hid == 8 ? " h-[218vh]  md:h-[105vh]  w-screen text-black flex flex-row md:justify-center md:items-center text-1xl relative border-green-600 border-b-2 bgr " : "hidden"}>

            <div class="h-12 w-full text-3xl top-[122px] left-[42px] md:left-4 absolute  md:text-4xl md:top-28 lg:text-[42px] xl:text-4xl xl:top-44 flex lg:left-[23rem] tmp asr"> Maybe, also fill these as well ?  </div>

            <div class="tmp h-10 w-full top-[166px] left-[17px] absolute md:text-3xl md:top-44 md:w-100 md:left-14 lg:mt-0 lg:text-[24px] lg:left-10 xl:top-60  flex justify-center asr"> (Our design team was out on vacation at this, so we couldn't create individual pages for this) 😅 </div>

            {/* 1st col  */}


            <div class="h-14 w-54  absolute top-[280px] left-[77px] md:top-[260px] flex justify-center items-center flex-row lg:text-xl md:left-28 xl:left-60 xl:top-[340px] af ">
               <input type="text" class=" font-bold h-[39px] w-[225px] md:h-10 md:w-[210px]  mt-0 border-2 border-black text-black text-sm" placeholder="Alternate Contact Number"
               onChange={(e)=>{setMobileNo2(e.target.value);}}
               ></input>
            </div>

            <div class="h-14 w-54  absolute top-[360px] left-[77px] md:top-[320px]  flex justify-center items-center flex-row md:mt-4 lg:mt-0 lg:text-xl md:left-28 xl:left-60 xl:top-[420px] af">
               <input type="text" class="font-bold h-[39px] w-[225px] md:h-10 md:w-[210px] mt-0 border-2 border-black text-black text-sm" placeholder="Address"
                onChange={(e)=>{setAdress(e.target.value);}}
               ></input>
            </div>

            <div class="h-14 w-54  absolute top-[440px] left-[77px] md:top-[400px] flex justify-center items-center flex-row md:mt-0 lg:mt-0 lg:text-xl md:left-28 xl:left-60 xl:top-[500px] af">
               <input type="text" class="font-bold h-[39px] w-[225px] md:h-10 md:w-[210px] mt-0 border-2 border-black text-black text-sm" placeholder="Current company (if any)"
                onChange={(e)=>{setCompany(e.target.value);}}
               ></input>
            </div>

            <div class="h-14 w-54  absolute top-[520px] left-[77px] md:top-[480px] flex justify-center items-center flex-row md:mt-4 lg:mt-0 lg:text-xl md:left-28 xl:left-60 xl:top-[575px] af">
               <input type="text" class="font-bold h-[39px] w-[225px] md:h-10 md:w-[210px] mt-0 border-2 border-black text-black text-sm" placeholder="Designation"
                onChange={(e)=>{setDesign(e.target.value);}}
               ></input>
            </div>

            {/* 2nd col */}

            <div class=" h-48 w-36 md:h-80 w-70 absolute top-[600px] left-[60px] md:top-[220px] mt-12 md:mt-8 lg:mt-[10rem] lg:text-xl md:left-[400px] xl:left-[570px] xl:mt-16 af">
               <textarea type="text" class=" bg-white font-bold  h-[17rem] w-[16rem] md:h-80 max-h-[17rem] md:w-[270px] lg:mt-[-8rem] xl:mt-12 border-2 border-black text-black text-base text-start p-2" placeholder="    About Me (50 - 60 words)"
                onChange={(e)=>{setAbout(e.target.value);}}
               ></textarea>
            </div>

            {/* 3rd col */}

            <div class="h-40 w-70  absolute top-[950px] left-[60px]  mt-4  md:top-[40px]md:mt-8 lg:mt-[13rem] lg:text-xl md:left-[720px] xl:left-[930px] xl:mt-28 xl:top-[220px] af">
               <textarea type="text" class=" bg-white font-bold h-[12rem] max-h-[12rem] w-[16rem] md:h-28 md:max-h-28 md:w-[270px] border-2 border-black text-black text-base text-start p-2" placeholder=" what wil you miss the most after   graduating"
                 onChange={(e)=>{setMiss(e.target.value);}}
               ></textarea>
            </div>

            <div class="h-40 w-70  absolute top-[1180px] left-[60px]  mt-4  md:top-[40px]md:mt-8 lg:mt-[13rem] lg:text-xl md:left-[720px] xl:left-[930px] xl:mt-28 xl:top-[360px] af">
               <textarea type="text" class=" bg-white font-bold h-[13rem] max-h-[13rem] w-[16rem] md:h-28 md:max-h-28 md:w-[270px] border-2 border-black text-black text-base text-start p-2" placeholder=" If you had power to implement a change in college what would it be?"
                 onChange={(e)=>{setChanges(e.target.value);}}
               ></textarea>
            </div>


            <button onClick={() => {
              {if (MobileNo2 === ''|| Adress=== '' || Company === '' || Design === '' || About=== ''|| Miss=== ''|| Changes=== '') {
               
                HandleEmpty(""); 
            } else {
               setHid(8)
            }}
            }} class="border-2 border-black h-8 w-32 bottom-[2rem]  left-32 flex items-center justify-center absolute lg:left-[469px] lg:bottom-[4rem]  p-0 text-base leading-none text-center  rounded-3xl md:bottom-[7rem] md:mt-32   md:w-32 md:h-10  lg:mt-8 xl:bottom-10  xl:left-[648px] btnh border-dashed afd"
            
            
         
            > Continue </button>

<button onClick={() => {
               setHid(7);
            }} > <img src={Abtn} class=" h-[60px] w-[60px] top-[40px] lg:h-[83px] lg:w-[90px] bottom-12 absolute md:top-[34px] md:left-[19px] xl:top-[45px] xl:left-[32px] xl:w-[97px] xl:h-[97px] btnh2 afu"/> </button>

         </div>
        


      </div> 
      <ToastContainer/>
      </>
   )
   
}


export default Fill3



