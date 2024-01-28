import React from 'react';
import { motion } from "framer-motion";
import './App.css';

const Example = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="font-sans bg-white p-12 bg"
    >
      <div className="flex justify-center items-center">
        <div className="text-center mx-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-3xl mb-4 font-custom"
          >
            The Alumni Magazine? That's here
          </motion.h1>
          <div className="border-2 border-dashed border-black w-64 h-48 mx-auto mb-4" />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 23 }}
            className="text-s my-4 font-custom"
          >
            Made with love, by Alumni Cell
            <br />
            The Alumni cell is the student-run cell to 
            <br />
            connect and broaden the institute's alum network
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 28 }}
            className="text-s my-4 font-custom"
          >
            Alumni and corporate relations office, 7th floor,
            <br />
            Abhinandan Bhavan, <br /> Indian Institute of Technology
           
            Indore, Khandwa road, simrol, Indore-453552, India
          </motion.p>
        </div>

        <div className="text-center mx-12 font-custom">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 23 }}
            className="text-3xl mb-4 font-custom"
          >
            The Alumni Portal? That's here
          </motion.h1>
          <div className="border-2 border-dashed border-black w-64 h-48 mx-auto mb-4" />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 28}}
            className="text-3xl mb-4 font-custom"
          >
            Find us On
          </motion.div>
          <div className="flex justify-center text-2xl font-custom">
            {/* Icons should be replaced with actual images or SVGs */}
            <span className="mx-2 "><div className='h-[80px] max-w-[80px]'><img src="/assets/fCE.png" alt="" /></div></span>
            <span className="mx-2"><div className='h-[40px] max-w-[40px]'><img src="/assets/twit.png" alt="" /></div></span>
            <span className="mx-2"><div className='h-[70px] max-w-[70px]'><img src="/assets/linked.png" alt="" /></div></span>
            <span className="mx-2"><div className='h-[60px] max-w-[60px]'><img src="/assets/insta.jpeg" alt="" /></div></span>
          </div>
          <div className="flex justify-center mt-4">
            <a href="#" className="text-3xl mx-2 hover:underline font-custom">Home</a>
            <a href="#" className="text-3xl mx-2 hover:underline font-custom">About</a>
            <a href="#" className="text-3xl mx-2 hover:underline font-custom">Developers</a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Example;
