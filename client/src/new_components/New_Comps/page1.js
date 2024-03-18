import React from "react";
import Plat from "./plat.jpeg"


function page1() {

return(

  <>
   {/* some classes are defined in fill details3 .css such as bgr afl afu */}

    <div className=" h-[100vh] w-[100vw] text-black  bg-bg-white bg-cover">

      
      <div class="h-1/2 flex flex-col items-center justify-center my-5 lg:py-20 lg:my-10 afl">

           <p class="text-[18px] md:text-3xl font-bold mb-8 mt-16">Hurray ! You are now our most esteemed user</p>
          
           <p class="text-[18px]  font-bold w-fit md:text-2xl lg:w-auto mb-10">Here's a platinum black card for all your troubles</p>

          <p class="lg:text-[20px] pb-2">(We don't know if this is usefull yet)</p>

      </div>


    <div class="h-1/2">
      <div  class="flex items-center justify-center afu">
      <img  src={Plat} className=" h-[180px] w-[350px] xl:h-[200px] xl:w-[370px] rounded-[15px] bgr mb-10" />
       </div>  
      

      <div class="flex items-center justify-center afu">
    
      <a href="/">
     <button class="border-2 h-[40px] w-[170px]  border-black flex justify-center items-center btnh border-dashed  rounded-2xl
      text-xl  "
           
           > Continue </button>
           </a>
           
      </div>       
      
     </div>

    </div>

 </>
)

}

export default page1