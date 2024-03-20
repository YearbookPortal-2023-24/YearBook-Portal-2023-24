import React from 'react';
import img1 from './Navbar.png';
import img2 from './Login.png';
import img3 from './Login2.png';
import img4 from './Login3.png';

const About = () => {
  return (
    <div className='bg-white flex flex-col items-center justify-center text-base md:text-3xl'>
      <div className='flex flex-col items-center mt-2 md:mt-10 text-base md:text-3xl'>
        <h4 className='mb-2'>STEP 1 :<br />
        Login using Sign-in with Google</h4>
        <img src={img2} alt="" className='w-full md:w-72 h-48 md:h-56 object-cover rounded-lg mb-2' />
      </div>
      <div className='flex flex-col items-center mt-2 md:mt-10 text-base md:text-3xl'>
        <img src={img1} alt="" className='w-full md:w-72 h-48 md:h-56 object-cover rounded-lg mb-2' />
        <h4 className='mb-2'>STEP 2 :<br />
        Click on the icon at the top left to explore various. <br /> Click on "Search People" to search for your friends' profiles.</h4>
      </div>
      <div className='flex flex-col items-center mt-2 md:mt-10 text-base md:text-3xl'>
        <h4 className='mb-2'>STEP 3 :<br />
        Search for your friends using their names or institute . <br /> You can also filter your search by batch or department
        </h4>
        <img src={img3} alt="" className='w-full md:w-72 h-48 md:h-56 object-cover rounded-lg mb-2' />
      </div>
      <div className='flex flex-col items-center mt-2 md:mt-10 text-base md:text-3xl'>
        <img src={img4} alt="" className='w-full md:w-72 h-48 md:h-56 object-cover rounded-lg mb-2' />
        <h4 className='mb-2'>STEP 4 :<br />
        Write comments on the profiles of your friends
        </h4>
      </div>
    </div>
  );
};

export default About;





