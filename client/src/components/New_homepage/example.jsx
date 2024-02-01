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
        <div className="text-center  mx-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-3xl text-black text-center mb-4 font-custom"
          >
            The Alumni Magazine? That's here
          </motion.h1>
          <div className="border-2 border-dashed border-black w-64 h-48 mx-auto mb-4" />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-s my-4 text-black font-custom"
          >
            Made with love, by Alumni Cell
            <br />
            The Alumni cell is the student-run cell to 
            <br />
            connect and broaden the institute's alum network
          </motion.p>
       
        </div>

        <div className="text-center text-black  mx-12 font-custom">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-3xl text-black mt-0 font-custom "
          >
            The Alumni Portal? That's here
          </motion.h1>
          <div className="border-2 border-dashed border-black w-64 h-48 mx-auto mb-4" />
          
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