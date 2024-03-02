import React, { useState, useEffect } from "react";
import GOld from "./gold.jpeg"

function page2() {
  
    


return(

  <>
   {/* some classes are defined in fill details3 .css such as bgr */}

    <div className=" h-[100vh] w-[100vw] bg-white text-black  bgr ">

      
      <div class="h-60 relative top-[100px] flex flex-col items-center lg:top-[70px]  afl ">

           <div class="text-[18px] ml-2 top-10 relative font-bold lg:text-3xl tracking-wide lg:mr-[100px]">Hmm, looks like you are<span class="text-red-700 text-2xl lg:text-4xl"> NOT </span>graduating this year</div>

           <p class="text-[18px] top-16 relative font-bold lg:text-3xl lg:mt-4 tracking-wide lg:mr-[200px] ">Thanks for signing up, anyway!</p>
          
           <p class="text-[18px] top-12 relative font-bold lg:text-3xl lg:w-auto lg:top-8 lg:mt-5">Here's a gold card for all your troubles</p>

          <p class=" top-4  relative lg:text-[20px]  lg:top-2 ">(We don't know if this is usefull yet)</p>

      </div>


   
      <div  class="flex items-center justify-center afu">
      <img  src={GOld} className=" h-[180px] w-[350px] xl:h-[200px] xl:w-[370px] rounded-[15px] bgr relative top-[142px] " />
       </div>  
      

     <div class="flex items-center justify-center afu">
     <button  class="border-2 h-[40px] w-[170px]  border-black flex justify-center items-center btnh border-dashed relative mt-56 rounded-2xl text-xl lg:top-[-40px]  "
           
           > Continue </button>
      
     </div>
      





    </div>





 </>

    )

}

export default page2