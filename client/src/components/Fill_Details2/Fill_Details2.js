import React, { useState, useEffect } from "react";
import profilepic from "./profile.jpeg"
import arrow from "./arrow.png"
import './filldetails.css';
import phone from "./th.png";
import 'animate.css';
import Abtn from "./arrowBtn.png"

//for notification
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Fill2() {

  const [hid, setHid] = useState(1);
  const [Name , setName] = useState("");


//  function for alerting on empty input
const HandleEmpty = () => {

   //U can just write following code whenever u write function for handling the particular data
   if(Name=='')
   {
      toast("Please fill all the details !", {
         theme:"dark",
         autoClose: 3000,
         
      });
       

   }
}

   return (
<> 
      <div class=" h-fit w-screen bg-slate-100  " >

         {/* first page */}

         <div class={hid == 1 ? " h-screen w-screen text-black flex justify-center text-2xl relative border-green-600 border-b-2 bgr  " : "hidden"}>


            <div class=" h-12 top-44 absolute text-[30px] md:text-5xl lg:text-6xl lg:top-60 tmp afu"> Just To Verify Your Name Is ?</div>

            <div class=" h-10 top-72 absolute md:top-80 md:w-80 lg:mt-20 afu"> <input type="text" placeholder="name" class="text-center text-black p-0 m-0 border-2 rounded-none bg-white border-gray-500 "
             onChange={(e)=>{setName(e.target.value);}
            
            }
            ></input> </div>


            <button onClick={() => {
               HandleEmpty();
               {Name != '' ? setHid(2) : setHid(1)};
            
               
            }} class="border-2 border-black flex justify-center items-center h-[35px] w-[130px] lg:h-10 lg:w-32 top-96 absolute p-0 mb-1 text-base leading-none text-center afu  rounded-3xl md:top-96 md:mt-14   md:w-32 md:h-10  lg:mt-36 btnh border-dashed "
           

            > Continue </button>
              

         </div>

         {/* secound page */}

         <div class={hid == 2 ? "h-screen w-screen text-black flex justify-center text-1xl relative border-green-600 border-b-2 bgr " : "hidden"}>

            <div class="h-12 top-36 left-4 absolute text-2xl  md:text-3xl md:top-40  lg:text-4xl lg:top-36 lg:left-44 tmp afr "> Right, of course we knew that  🙄</div>

            <div class=" h-10 top-48 left-12 absolute text-2xl md:text-3xl md:top-56 md:w-100 md:left-14 lg:mt-0 lg:text-4xl lg:left-64 tmp afr"> Verify your academic details to continue </div>

            <div class="h-52 w-full  absolute top-64 flex justify-center items-center flex-col md:flex-row md:mt-4 lg:mt-10 lg:text-xl afr">


               <div class="h-12 w-64 flex flex-col  md:w-56 lg:w-80 mt-1 mb-4 items-center afr" >

                  <h1 class=" text-base text-center text-black lg:text-2xl">Roll number</h1>

                  <input type="text" class="text-center text-black rounded-[9px] h-6 w-[210px] border-2 border-black mt-1 p-2 md:w-40 lg:w-52 lg:mt-4 xl:h-7"></input>
               </div>


               <div class="h-12 w-64 flex flex-col md:w-56 lg:w-80 mt-3 lg:mt-0 mb-4 items-center " >
                  <h1 class=" text-base text-center text-black lg:text-2xl">Branch</h1>

                  {/* <input type="text" class="text-center text-black rounded-[9px] h-6 w-[210px] border-2 border-black mt-1 p-2 md:w-40 lg:w-52 lg:mt-4 xl:h-7"></input> */}

                  <select name="academic_program" class="text-center text-black rounded-[9px] text-[13.5px] h-7 lg:h-8 w-[210px] border-2 border-black mt-1 p-1 md:w-40 lg:w-60 lg:mt-3 lg:text-[15px] xl:h-9 xl:text-[16px] ">
                     
                     <option value="" name="Academic Program" disabled="" selected="">Academic Program</option><option value="Bachelor of Technology (BTech)" name="academic_program">Bachelor of Technology (BTech)</option><option value="Master of Technology (MTech)" name="academic_program">Master of Technology (MTech)</option><option value="Master of Science (MSc)" name="academic_program">Master of Science (MSc)</option><option value="Five Year BTech + MTech" name="academic_program">Five Year BTech + MTech</option><option value="MS (Research)" name="academic_program">MS (Research)</option><option value="Doctor of Philosophy" name="academic_program">Doctor of Philosophy</option></select>

               </div>


               <div class="h-12 w-64 flex flex-col mt-4 md:w-56 lg:w-80 lg:mt-0 lg:mb-4 items-center" >
                  <h1 class=" text-base text-center text-black lg:text-2xl">Department</h1>

                  {/* <input type="text" class="text-center text-black rounded-[9px] h-6 w-[210px] border-2 border-black mt-1 p-2 md:w-40 lg:w-52 lg:mt-4 xl:h-7"></input> */}

                  <select name="department" class="text-center text-black rounded-[9px] text-[13.5px] h-7 lg:h-8 w-[210px] border-2 border-black mt-1 p-1 md:w-40 lg:w-60 lg:mt-3 lg:text-[15px] xl:h-9 xl:text-[16px] ">
                     
                     <option value="" name="Department" disabled="" selected="">Department</option><option value="Computer Science and Engineering" name="department">Computer Science and Engineering</option><option value="Electrical Engineering" name="department">Electrical Engineering</option><option value="Mechanical Engineering" name="department">Mechanical Engineering</option><option value="Civil Engineering" name="department">Civil Engineering</option><option value="Metallurgy Engineering and Materials Science" name="department">Metallurgy Engineering and Materials Science</option><option value="Astronomy, Astrophysics and Space Engineering" name="department">Astronomy, Astrophysics and Space Engineering</option><option value="Biosciences and Biomedical Engineering" name="department">Biosciences and Biomedical Engineering</option><option value="Physics" name="department">Physics</option><option value="Chemistry" name="department">Chemistry</option><option value="Mathematics" name="department">Mathematics</option><option value="Humanities and Social Sciences" name="department">Humanities and Social Sciences</option><option value="Electric Vehicle Technology" name="department">Electric Vehicle Technology</option></select>


               </div>


            </div>


            <button onClick={() => {
               HandleEmpty();
               setHid(3);
            }} class="border-2 border-black h-8 w-32 bottom-14 lg:bottom-20 absolute p-0 text-base leading-none text-center  rounded-3xl md:top-96 md:mt-32   md:w-32 md:h-10  lg:mt-36 btnh border-dashed afu "> Continue </button>


            <button onClick={() => {
               setHid(1);
            }} > <img src={Abtn} class=" h-[60px] w-[60px] lg:h-[83px] lg:w-[90px] bottom-12 absolute top-[23px] left-[7px] md:top-[24px] md:left-[19px] xl:top-[14px] xl:left-[32px] xl:w-[97px] xl:h-[97px] btnh2 afr"/> </button>



         </div>



         {/* third page */}



         <div class={hid == 3 ? " h-screen w-screen text-black flex justify-center items-center text-1xl relative border-green-600 border-b-2 bgr fadeInRight " : "hidden"}>

            <div class="h-12 w-full top-44 left-4 text-[25px]  absolute  md:text-3xl md:top-40  lg:text-4xl lg:top-48 flex justify-center items-center tmp afu "> We want to remember you forever 🤞  </div>

            <div class=" h-10 w-full top-56 left-2 text-[25px] absolute md:text-3xl md:top-64 md:w-100 md:left-14 lg:mt-2 lg:text-4xl lg:left-12 flex justify-center items-center tmp afu"> Do tell us your <span class="text-red-600 ml-4">phone number</span> </div>

            <div class="h-14 w-48  absolute top-80 mt-4 flex justify-center items-center flex-row md:mt-4 lg:mt-10 lg:text-xl afu">
               <input type="text" class="h-10 w-64 mt-12 border-2 border-black text-black"></input>
            </div>


            <button onClick={() => {
               setHid(4);
            }} class="border-2 border-black h-8 w-24 bottom-36 absolute p-0 text-base leading-none text-center  rounded-3xl md:top-96 md:mt-32   md:w-32 md:h-10  lg:mt-36 btnh border-dashed afu "> Continue </button>

            <div class=" absolute bottom-16 left-8 afu"><img src={phone} alt="phone" class="h-40 w-40" /></div>

            <button onClick={() => {
               setHid(2);
            }} > <img src={Abtn} class=" h-[60px] w-[60px] top-[40px] left-[7px] lg:h-[83px] lg:w-[90px] bottom-12 absolute md:top-[44px] md:left-[19px] xl:top-[34px] xl:left-[32px] xl:w-[97px] xl:h-[97px] btnh2 afr "/> </button>


         </div>



         {/* fourth page */}

         <div class={hid == 4 ? " h-screen w-screen text-black flex justify-center items-center text-1xl relative border-green-600 border-b-2 bgr " : "hidden"}>

            <div class="h-12 w-full top-44 left-4 absolute  md:text-3xl md:top-40 lg:text-[34px] xl:text-4xl lg:top-48 flex justify-center items-center tmp asr "> Don't take it personally "Corporate" wants to verify your phone number  </div>

            <div class=" h-10 w-full top-56 left-0 absolute md:text-3xl md:top-64 md:w-100 md:left-14 lg:mt-0 lg:text-[18px] lg:left-12 flex justify-center asr"> (Enter the OTP you recieved on your phone)  </div>

            <div class="h-14 w-48  absolute top-80 mt-4 flex justify-center items-center flex-row md:mt-4 lg:mt-10 lg:text-xl afu">
               <input type="text" class="h-10 w-64 mt-12 border-2 border-black text-black"></input>
            </div>


            <button class="border-2 border-black  h-8 w-24 bottom-36 absolute left-[350px] p-0 text-base leading-none text-center  rounded-3xl md:top-96 md:mt-32   md:w-32 md:h-10  lg:mt-28  xl:left-[550px] afu"> Resend Otp </button>

            <button onClick={() => {
               setHid(5);
            }} class="border-2 border-black h-8 w-24 bottom-36 absolute right-[322px]  p-0 text-base leading-none text-center  rounded-3xl md:top-96 md:mt-32   md:w-32 md:h-10  lg:mt-28 xl:right-[550px] btnh border-dashed afu"> Continue </button>

<button onClick={() => {
               setHid(3);
            }} > <img src={Abtn} class=" h-[83px] w-[90px] bottom-12 absolute md:top-[34px] md:left-[19px] xl:top-[45px] xl:left-[32px] xl:w-[97px] xl:h-[97px] btnh2 afr"/> </button>

         </div>


         {/* fifth page */}




         <div class={hid == 5 ? " h-screen w-screen text-black flex justify-center items-center text-1xl relative border-green-600 border-b-2 bgr" : "hidden"}>

            <div class="h-12 w-full top-44 left-4 absolute  md:text-3xl md:top-40 lg:text-4xl xl:text-3xl lg:top-48 flex justify-center items-center tmp afd"> And your  <span class="text-red-600 ml-2 mr-2 text-5xl">   Personal </span> email ?  </div>


            <div class="h-14 w-72 absolute top-80 mt-4 flex justify-center items-center flex-row md:mt-4 lg:mt-0 lg:text-xl afd">
               <input type="text" class="h-10 w-72 mt-12 border-2 border-black text-black"></input>
            </div>


            <button onClick={() => {
               setHid(6);
            }} class="border-2 border-black h-8 w-24 bottom-60 absolute lg:left-[443px] lg:top-[400px]  p-0 text-base leading-none text-center  rounded-3xl md:top-96 md:mt-32   md:w-32 md:h-10  lg:mt-16   xl:left-[710px] btnh border-dashed afd"> Continue </button>

            <button onClick={() => {
               setHid(4);
            }} > <img src={Abtn} class=" h-[83px] w-[90px] bottom-12 absolute md:top-[34px] md:left-[19px] xl:top-[45px] xl:left-[32px] xl:w-[97px] xl:h-[97px] btnh2 afr"/> </button>

         </div>


         {/* sixth page */}

         <div class={hid == 6 ? " h-screen w-screen text-black flex justify-center items-center text-1xl relative border-green-600 border-b-2 bgr" : "hidden"}>

            <div class="h-12 w-full top-44 left-4 absolute  md:text-3xl md:top-40 lg:text-4xl xl:text-5xl lg:top-48 flex justify-center items-center tmp atd ">You know the drill 😉</div>


            <div class="h-14 w-72 absolute top-80 mt-4 flex justify-center items-center flex-row md:mt-4 lg:mt-0 lg:text-xl">
               <input type="text" placeholder="Enter the OTP you recieved on your mail" class="h-10 w-72 text-[14px] mt-12 border-2 border-black text-black"></input>
            </div>


            <button onClick={() => {
               setHid(7);
            }} class="border-2 border-black h-8 w-24 bottom-60 absolute lg:left-[443px] lg:top-[400px]  p-0 text-base leading-none text-center  rounded-3xl md:top-96 md:mt-32   md:w-32 md:h-10  lg:mt-16 xl:right-[550px]  xl:left-[710px] btnh border-dashed afu"> Verify </button>
            
            <button onClick={() => {
               setHid(5);
            }} > <img src={Abtn} class=" h-[83px] w-[90px] bottom-12 absolute md:top-[34px] md:left-[19px] xl:top-[45px] xl:left-[32px] xl:w-[97px] xl:h-[97px] btnh2 afu"/> </button>

         </div>

         {/* seventh page */}

         <div class={hid == 7 ? " h-screen w-screen text-black flex justify-center items-center text-1xl relative border-green-600 border-b-2  bgr" : "hidden"}>

            <div class="h-12 w-full top-44 left-4 absolute  md:text-3xl md:top-40 lg:text-[35px] xl:text-3xl lg:top-48 lg:left-28 xl:left-80 tmp xl:top-48 abl"> We wanna <span class="text-red-600 ml-2 mr-2 text-5xl">SEE </span> you! please?</div>

            <div class=" h-10 w-full top-56 left-0 absolute md:text-3xl md:top-64 md:w-100 md:left-14 lg:mt-0 lg:text-[24px] lg:left-32 xl:left-80 tmp abl"> (we assure you, we are not creepy) 🙂  </div>

            <div class="w-60 h-60 border-2 border-gray-400 absolute right-28 top-20 rounded-full overflow-hidden flex justify-center items-center xl:top-30 xl:right-80 abl"><img src={profilepic} class=" w-fit "></img></div>

            <img src={arrow} class="w-48 h-32 lg:top-[18rem] lg:right-[22rem] absolute xl:right-[38rem] abl "></img>

            <button onClick={() => {
               setHid(8);
            }} class="border-2 border-black h-8 w-24 bottom-36 absolute right-[322px]  p-0 text-base leading-none text-center  rounded-3xl md:top-96 md:mt-32   md:w-32 md:h-10  lg:mt-2 lg:left-80 xl:left-[580px] xl:top-[400px] btnh border-dashed afu"> Upload photo </button>

            <button onClick={() => {
               setHid(8);
            }} class="border-2 border-black h-8 w-24 bottom-12 absolute p-0 text-base leading-none text-center  rounded-3xl md:bottom-16 md:mt-32   md:w-32 md:h-10  lg:mt-40 xl:bottom-20 btnh border-dashed afu "> Continue </button>
            
            <button onClick={() => {
               setHid(6);
            }} > <img src={Abtn} class=" h-[83px] w-[90px] bottom-12 absolute md:top-[34px] md:left-[19px] xl:top-[45px] xl:left-[32px] xl:w-[97px] xl:h-[97px] btnh2 abl"/> </button>

         </div>


         {/* eight page */}

         <div class={hid == 8 ? " min-h-screen h-20 w-screen text-black flex justify-center items-center text-1xl relative border-green-600 border-b-2 bgr " : "hidden"}>

            <div class="h-12 w-full top-0 left-4 absolute  md:text-4xl md:top-28 lg:text-[42px] xl:text-4xl xl:top-44 flex lg:left-[23rem] tmp asr"> Maybe, also fill these as well ?  </div>

            <div class="tmp h-10 w-full top-12 left-0 absolute md:text-3xl md:top-44 md:w-100 md:left-14 lg:mt-0 lg:text-[24px] lg:left-10 xl:top-60  flex justify-center asr"> (Our design team was out on vacation at this, so we couldn't create individual pages for this) 😅 </div>

            {/* 1st col */}


            <div class="h-14 w-54  absolute top-[260px] flex justify-center items-center flex-row lg:text-xl left-28 xl:left-60 xl:top-[340px] af ">
               <input type="text" class=" font-bold h-10 w-[210px]  mt-0 border-2 border-black text-black text-sm" placeholder="Alternate Contact Number"></input>
            </div>

            <div class="h-14 w-54  absolute top-[320px]  flex justify-center items-center flex-row md:mt-4 lg:mt-0 lg:text-xl left-28 xl:left-60 xl:top-[420px] af">
               <input type="text" class="font-bold h-10 w-[210px] mt-0 border-2 border-black text-black text-sm" placeholder="Address"></input>
            </div>

            <div class="h-14 w-54  absolute top-[400px] flex justify-center items-center flex-row md:mt-0 lg:mt-0 lg:text-xl left-28 xl:left-60 xl:top-[500px] af">
               <input type="text" class="font-bold h-10 w-[210px] mt-0 border-2 border-black text-black text-sm" placeholder="Current company (if any)"></input>
            </div>

            <div class="h-14 w-54  absolute top-[480px] mt-4 flex justify-center items-center flex-row md:mt-4 lg:mt-0 lg:text-xl left-28 xl:left-60 xl:top-[575px] af">
               <input type="text" class="font-bold h-10 w-[210px] mt-0 border-2 border-black text-black text-sm" placeholder="Designation"></input>
            </div>

            {/* 
2nd col */}

            <div class=" h-80 w-70  absolute top-[220px] mt-12 md:mt-8 lg:mt-[10rem] lg:text-xl left-[400px] xl:left-[570px] xl:mt-16 af">
               <textarea type="text" class=" bg-white font-bold max-h-[17rem] w-[270px] lg:mt-[-8rem] xl:mt-12 border-2 border-black text-black text-base text-start p-2" placeholder="    About Me (50 - 60 words)"></textarea>
            </div>

            {/* 3rd col */}
            <div class="h-40 w-70  absolute top-[40px] mt-4 md:mt-8 lg:mt-[13rem] lg:text-xl left-[720px] xl:left-[930px] xl:mt-28 xl:top-[220px] af">
               <textarea type="text" class=" bg-white font-bold h-28 w-[270px] border-2 border-black text-black text-base text-start p-2" placeholder=" what wil you miss the most after   graduating"></textarea>
            </div>

            <div class="h-38 w-70  absolute top-[170px] mt-4 md:mt-8 lg:mt-[10rem] lg:text-xl left-[720px] xl:left-[930px] xl:mt-16 xl:top-[355px] af ">
               <textarea type="text" class=" bg-white font-bold max-h-28 w-[270px] mt-16 border-2 border-black text-black text-base text-start p-2" placeholder=" If you had power to implement a change in college what would it be?"></textarea>
            </div>


            <button class="border-2 border-black h-8 w-24 bottom-36 absolute right-[322px]  p-0 text-base leading-none text-center  rounded-3xl md:bottom-4    md:w-32 md:h-10  lg:left-[473px] xl:left-[650px] xl:bottom-8 btnh border-dashed afu"> Continue </button>

            <button onClick={() => {
               setHid(7);
            }} > <img src={Abtn} class=" h-[83px] w-[90px] bottom-12 absolute md:top-[34px] md:left-[19px] xl:top-[45px] xl:left-[32px] xl:w-[97px] xl:h-[97px] btnh2 afr "/> </button>

         </div>
        
        
      </div>
      <ToastContainer/>
      </>
   )
   
}


export default Fill2


