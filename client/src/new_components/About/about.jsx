import React from 'react';
import img1 from './Navbar.png';
import img2 from './Login.png';
import img3 from './Login2.png';
import img4 from './Login3.png';

const About = () => {
  return (
    <div className='bg bg-white flex flex-col items-center justify-center text-xl md:text-3xl'>
    <div className='flex  flex-col md:flex-row mt-[100px] text-xl md:text-3xl ml-[15px]'>
      <h4>STEP 1 :<br />
 Login using Sign-in with Google</h4>
      <img src={img2} alt="" className='  w-[290px] h-[260px] md:w-[350px] object-cover rounded-lg ml-[-50px] md:ml-[50px] ' />
    </div>
    <div className='flex flex-col sm:mt-[25px] md:flex-row mt-[100px] text-xl md:text-3xl md:ml-[50px]'>
    
      <img src={img1} alt="" className=' h-[190px] w-[290px] md:h-[260px] md:w-[350px] object-cover rounded-lg md:ml-[50px] ' />
      <h4 className='ml-[50px] text-xl md:text-3xl'>STEP 2 :<br />
      Click on the icon at the top left to explore various. <br /> Click on "Search People" to search for your friends' profiles.</h4>
    </div>
    <div className='flex flex-col md:flex-row mt-[100px] text-xl md:text-3xl ml-[50px]'>
      <h4>STEP 3 :<br />
      Search for your friends using their names or institute . <br /> You can also filter your search by batch or department
 </h4>
      <img src={img3} alt="" className='h-[260px] w-[350px] object-cover rounded-lg ml-[50px] ' />
    </div>
    <div className='flex flex-col md:flex-row mt-[100px] text-xl md:text-3xl ml-[50px]'>
      
      <img src={img4} alt="" className='h-[260px] w-[350px] object-cover rounded-lg ml-[50px] ' />
      <h4 className='ml-[50px]'>STEP 4 :<br />
      Write comments on the profiles of your friends
      
      <br />
      </h4>
    </div>
   </div>
 
  

   
  );

};

export default About;



