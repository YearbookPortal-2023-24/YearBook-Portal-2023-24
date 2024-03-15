import React from 'react';
import { motion } from "framer-motion";
import './homepage.module.css';

const Footer = () => {
  return (
    //     <motion.div 
    //       initial={{ opacity: 0, y: 20 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       transition={{ duration: 1 }}
    //       className="font-sans bg-white p-12 bg"
    //     >
    //       <div className="flex justify-center items-center">
    //         <div className="text-center  mx-12">
    //           <motion.h1 
    //             initial={{ opacity: 0, y: 20 }}
    //             animate={{ opacity: 1, y: 0 }}
    //             transition={{ duration: 1 }}
    //             className="text-3xl text-black text-center mb-4 font-custom"
    //           >
    //             The Alumni Magazine? That's here
    //           </motion.h1>
    //           <div className="border-2 border-dashed border-black w-64 h-48 mx-auto mb-4" />
    //           <motion.p 
    //             initial={{ opacity: 0, y: 20 }}
    //             animate={{ opacity: 1, y: 0 }}
    //             transition={{ duration: 1 }}
    //             className="text-s my-4 text-black font-custom"
    //           >
    //             Made with love, by Alumni Cell
    //             <br />
    //             The Alumni cell is the student-run cell to 
    //             <br />
    //             connect and broaden the institute's alum network
    //           </motion.p>


    // </div>
    //         <div className="text-center text-black  mx-12 font-custom">
    //           <motion.h1 
    //             initial={{ opacity: 0, y: 20 }}
    //             animate={{ opacity: 1, y: 0 }}
    //             transition={{ duration: 1 }}
    //             className="text-3xl text-black mt-0 font-custom "
    //           >
    //             The Alumni Portal? That's here
    //           </motion.h1>
    //           <div className="border-2 border-dashed border-black w-64 h-48 mx-auto mb-4" />

    //           <div className="flex justify-center mt-4">
    //             <a href="#" className="text-3xl mx-2 hover:underline font-custom">Home</a>
    //             <a href="#" className="text-3xl mx-2 hover:underline font-custom">About</a>
    //             <a href="#" className="text-3xl mx-2 hover:underline font-custom">Developers</a>
    //           </div>


    //           </div>
    //       </div>
    //     </motion.div>

    <div className='snap-start w-screen bg-bg-white bg-cover flex px-12 py-8'>
      <div className='w-1/2 flex flex-col gap-12'>
        <h1 className='text-5xl text-center'>The Alumni Magazine? That's here</h1>
        <div className='flex flex-row gap-12 justify-center'>
          <button className='rounded-2xl border-2 w-64 h-64 border-dashed border-black font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none'>
            <img src='/images/footer/alumnimag.png' className='w-full h-full object-cover rounded-2xl hover:rounded-md transition-all duration-300'></img>
          </button>
          <img src="/images/homepage/down_arrow.png" className='-mt-12 w-32 h-32 rotate-90'></img>
        </div>

        <div className='ml-24'>
          <h1 className='text-2xl'>Made with ❤️, by <span className='text-5xl ml-1'> Alumni Cell</span></h1>
          <h1 className='text-2xl w-80 ml-16 mt-2'>The Alumni Cell is the student-run cell to connect and broaden the institute's alum network.</h1>
        </div>

        <div className='ml-24'>
          <h1 className='text-2xl'>Alumni and corporate relations office, 7th Floor,<br />
            Abhinandan Bhavan, Indian institute of Technology Indore,<br />
            Khandwa Road, Simrol, Indore-453552, India</h1>
        </div>
      </div>

      <div className='w-1/2 flex flex-col gap-12'>
        <h1 className='text-5xl text-center'>The Alumni Portal? That's here</h1>
        <div className='flex flex-row-reverse gap-12 justify-center'>
          <button className='rounded-2xl border-2 w-64 h-64 border-dashed overflow-clip border-black font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none'>
            <img src='/images/footer/ACR.png' className='w-full ml-2 h-full object-cover rounded-2xl hover:rounded-md transition-all duration-300'></img>
          </button>
          <img src="/images/homepage/down_arrow.png" className='-mt-12 w-32 h-32 rotate-90 scale-y-[-1]'></img>
        </div>

        <h1 className='text-5xl ml-32'>Find us On</h1>
        <div className='flex flex-row gap-12 ml-16 w-full px-24'>
          <button className='w-12 h-12'>
            <img src="/images/footer/insta_filled.png" className='w-full h-full object-contain rounded-none ml-1 hover:invert transition-all duration-300'></img>
          </button>
          <button className='w-12 h-12'>
            <img src="/images/footer/fb.png" className='w-full h-full object-contain rounded-none ml-1 hover:invert transition-all duration-300'></img>
          </button>
          <button className='w-12 h-12'>
            <img src="/images/footer/x.png" className='w-full h-full object-contain rounded-none ml-1 hover:invert transition-all duration-300'></img>
          </button>
        </div>

        <h1 className='text-5xl ml-32'>More Links</h1>
        <div className='flex flex-row gap-12 ml-16 w-full px-24 -mt-6'>
          <button className='text-2xl text-black hover:underline'>Home</button>
          <button className='text-2xl text-black hover:underline'>About</button>
          <button className='text-2xl text-black hover:underline'>Developers</button>
        </div>
      </div>

    </div>
  );
};

export default Footer;