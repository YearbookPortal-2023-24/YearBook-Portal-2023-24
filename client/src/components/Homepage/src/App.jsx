import React,{ useRef } from 'react';
import { Element, Link, animateScroll as scroll } from 'react-scroll';
import './App.css'; // Import the CSS file for styling
import Example from './example';
import { motion } from "framer-motion";



   

const FirstPage = () => {


  return (
    
    <Element name="first" className="bg-gray-100  min-h-screen  flex flex-col items-center justify-center bg border-2 leading-loose">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 5 }}
        className="text-5xl text-center font-custom leading-loose"
      >
        "Change can be scary, but so is staying in the same place" <br /> 
      </motion.h1>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 10}}
        className="text-4xl  text-center font-custom leading-loose font-bold"
      >
       - Anonymous
      </motion.h1>
    </Element>
  );
}; 



const SecondPage = () => {
  return (
    <Element name="second" className="bg-gray-100 min-h-screen flex flex-col items-center justify-center bg border-2 leading-loose">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 5 }}
        className="text-5xl text-center font-custom leading-loose"
      >
        "We are sad to see you go. <br /> 
      </motion.h1>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 7 }}
        className="text-5xl text-center font-custom leading-loose"
      >
        but the best thing to do is remember the past <br />
      </motion.h1>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 9 }}
        className="text-5xl text-center font-custom leading-loose"
      >
        and MOVE on , right?"
      </motion.h1>

    </Element>
  );
};

const ThirdPage = () => {
  const drawVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: { duration: 2, ease: "easeInOut" }
    }
  };
  return (
    <Element name="third" className="bg-gray-100 border-2 min-h-screen flex flex-col items-center justify-center bg  relative leading-loose">
      
      
      
     
      <motion.img
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 6 }}
        src="/assets/img2-removebg-preview.png"
        alt=""
        className="absolute left-0 bottom-0"
      />
        <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 6}}
        className="text-4xl  text-center font-custom leading loose"
      >
       
      
     
     
      <h1 className="text-4xl  text-center font-custom leading loose">In 2021, we learnt how to embrace </h1>
      </motion.h1> <br />
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 10}}
        className="text-4xl  text-center font-custom leading loose text-bold"
      >
        SICKNESS
      </motion.h1>
      
      
     
    </Element>
  );
};


const FourthPage = () => {
  return (
<Element name="fourth" className="bg-gray-100 border-2 min-h-screen flex flex-col items-center justify-center bg relative leading-loose">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 8}}
        className="text-4xl text-center font-custom md:text-6xl lg:text-7xl"
      >
        In 2022, we learnt to accept
      </motion.h1>
      <br />
      
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 14 }}
        className="text-4xl text-right font-custom md:text-6xl lg:text-7xl"
      >
        THE NEW NORMAL
      </motion.h1>
      <motion.img
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 10 }}
        src="/assets/img1-removebg-preview.png"
        alt=""
        className="  absolute left-0 bottom-50 "
      />
      <motion.img
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 10 }}
        src="/assets/img1-removebg-preview.png"
        alt=""
        className=" absolute left-200 bottom-0"
      />
      <motion.img
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 15 }}
        src="/assets/img1-removebg-preview.png"
        alt=""
        className="  absolute right-0 top-10"
      />
    </Element>
  );
};


const FifthPage = () => {
  return (
    <Element name="fifth" className="bg-gray-100 min-h-screen flex flex-col items-center justify-center bg border-2 leading-loose md:text-6xl lg:text-7xl">
      <div className="square-box-container">
        <div className="box"></div>
        <div className="box rotated"></div>
        {/* Additional divs for other boxes */}
      </div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 14 }}
        className="text-4xl text-center font-custom md:text-6xl lg:text-7xl"
      >
        In 2023, we learnt the importance of
      </motion.h1>
      <br />
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 18 }}
        className="text-4xl text-center text-bold font-custom md:text-6xl lg:text-7xl"
      >
        CONNECTIONS
      </motion.h1>
    </Element>
  );
};

const SixthPage = () => {
  return (
    <Element name="sixth" className="bg-gray-100 min-h-screen flex flex-col items-center justify-center bg border-2 leading-loose ">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 10 }}
        className="text-5xl text-center font-custom relative leading-loose md:text-6xl lg:text-7xl"
      >
        In <span className='text-red-700 md:text-3xl lg:text-5xl'>2024</span>, we
      </motion.h1>
      <br />
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 11}}
        className="text-5xl text-bold text-center font-custom leading-loose md:text-6xl lg:text-7xl"
      >
        GRADUATE,
      </motion.h1>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 12}}
        className="text-3xl text-center font-custom leading-loose md:text-6xl lg:text-7xl"
      >
        leaving behind, a legacy of
      </motion.h1>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 12 }}
        className="text-5xl text-center text-bold font-custom leading-loose md:text-6xl lg:text-7xl"
      >
        Resilience
      </motion.h1>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 14 }}
        className="text-3xl text-center font-custom leading-loose md:text-6xl lg:text-7xl"
      >
        and
      </motion.h1>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 16}}
        className="text-5xl text-center text-bold font-custom leading-loose md:text-6xl lg:text-7xl"
      >
        Friendship
      </motion.h1>
    </Element>
  );
};

const SeventhPage = () => {
  return (
    <Element name="seventh" className="bg-gray-100 min-h-screen flex flex-col items-center justify-center bg border-2 leading-loose ">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl text-center font-custom relative leading-loose "
      >
        One of us? Let us know by <span className='text-red-700 '>Signing in </span>
      </motion.h1>
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-blue-200 text-black font-custom font-bold py-2 px-4 rounded mt-4 relative w-[180px] "
      >
       Sign in with Google  <div  class="h-[30px] max-w-[30px] absolute top-[10px] right-[5px]"> <img src="assets/google.png" alt=""/></div>
      </motion.button>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-custom font-bold mt-4"
      >
        Join us in creating the future together!
      </motion.p>
    </Element>
  );
};

    



const App = () => {
  
  return (
    <div>
      
      <FirstPage/>
      <SecondPage />
      <ThirdPage />
      <FourthPage />
      <FifthPage/>
      <SixthPage/>
      <SeventhPage/>
      <Example/>
    </div>
  );
};

export default App;

