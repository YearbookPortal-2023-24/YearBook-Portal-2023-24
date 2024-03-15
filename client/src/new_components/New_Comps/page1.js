import React from "react";
import Plat from "./plat.jpeg"


function page1() {

  


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
    
      <a href="/">
     <button class="border-2 h-[40px] w-[170px]  border-black flex justify-center items-center btnh border-dashed relative rounded-2xl
     top-[80px] text-xl lg:top-[100px] xl:top-[120px]  "
           
           > Continue </button>
           </a>
           
           
      
     </div>

    </div>

 </>
)

}

export default page1