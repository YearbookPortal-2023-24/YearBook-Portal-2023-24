import React, { useContext, useEffect } from 'react'
import "@fontsource/quantico";
import { useNavigate } from 'react-router';
import { LoginContext } from '../../helpers/Context';
import Lines from "./images/lines.png";
import Lines2 from "./images/lines2.png";
import Lines3 from "./images/lines3.png";
import Search from "./images/search.png";
import Comment from "./images/comment.png";

import { motion } from "framer-motion";

function Homepage() {
    const navigate = useNavigate();
    const { setLoggedin, setUser, user } = useContext(LoginContext);
    //Get the data to be displayed on the profile
    // useEffect(()=>{
    //     axios.post('http://localhost:5000/profile', {
    //       email: user.email
    //     }).then((res)=>{
    //     //   console.log(res.data);
    //       if(res.data.message==="No User Found"){
    //         setUser({});
    //         window.localStorage.removeItem('user');
    //         setLoggedin(false);
    //         window.localStorage.setItem('loggedin', false)
    //         document.getElementById("google-login").hidden = false;
    //         navigate('/');
    //       }
    //     })
    //   },[])
    return (
        <div className="overflow-x-hidden w-screen flex flex-col">
            <div className='flex flex-col overflow-x-hidden'>
                <div className='flex flex-col lg:flex-row w-full justify-around items-center lg:mb-8 lg:h-screen'>
                    <div className='w-4/5 lg:w-2/5 lg:mt-0 mt-8 border-2 lg:h-3/5 h-4/5 rounded-xl flex flex-col items-start justify-center relative'>
                        <div className='text-white font-bold uppercase text-4xl lg:text-5xl lg:text-left lg:pl-4 mt-8 text-center'>WELCOME TO THE YEARBOOK PORTAL '23 OF IIT INDORE ...</div>
                        <div className=' lg:mb-0 mb-2 text-white uppercase text-3xl text-left pl-4 lg:pr-4 mt-8 lg:mt-8 w-full flex-wrap overscroll-contain'>ALUMNI CELL, IIT INDORE <br></br><br></br><span className='capitalize text-xl'>Welcome to the Yearbook Portal- A one-stop hub to curate your Yearbook profile and help others do the same!</span></div>
                    </div>
                    <div className='w-full lg:w-1/3 lg:h-3/4 mt-8 lg:mt-0 flex flex-col items-center lg:items-start'>
                        <div className='text-4xl uppercase text-white text-center lg:text-left w-4/5 lg:w-3/4'>Welcome to your new memories page!</div>
                        <div className='bg-[#3E185C] h-96 w-96 rounded-full mt-12 lg:mb-0 mb-12'></div>
                    </div>
                </div>
            </div>

            {/* steps */}

            <div className='w-full'>
                <motion.div
                    viewport={{ once: true }}
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 100 }} className=' ml-16 w-1/2 text-4xl text-white capitalize'>connecting with your friends has never been <span className='text-[#fec80a]'>more</span> easy before!</motion.div>
                <div className='flex flex-row mt-2'>
                    <motion.div
                        viewport={{ once: true }}
                        initial={{ opacity: 0, height: 0 }}
                        whileInView={{ opacity: 1, height: 500 }}
                        transition={{ duration: 0.5, type: "spring", stiffness: 100, delay: 0.3 }}
                        className="overflow-hidden"
                    >
                        <img className='ml-16 w-32 object-contain z-10 rounded-none' src={Lines}></img>
                    </motion.div>
                    <div className='mt-48 -ml-32 w-3/4'>
                        <motion.h1
                            viewport={{ once: true }}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, type: "spring", stiffness: 100, delay: 0.3 }} className='text-white pl-8 uppercase'>step 1</motion.h1>
                        <motion.div
                            viewport={{ once: true }}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, type: "spring", stiffness: 100, delay: 0.3 }} className='text-2xl text-white bg-transparent ml-24 mt-12 w-2/5'>
                            Log in using your <span className='text-[#fec80a]'>institute</span> ID, and upon the first login, you will be asked to complete your information details. Following this, you will have created your profile for the Yearbook!
                        </motion.div>
                    </div>
                    <motion.div
                        viewport={{ once: true }}
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, type: "spring", stiffness: 200, delay: 0.3 }}
                        className='w-96 h-64 rounded-xl bg-gray-600 -ml-64 mt-16'>
                    </motion.div>
                    <motion.div
                        viewport={{ once: true }}
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, type: "spring", stiffness: 200, delay: 0.3 }}
                        className='w-96 h-64 rounded-xl bg-gray-800 -ml-72 mt-32'>
                    </motion.div>
                </div>
                <div className='w-full h-8 mt-4 object-contain'>
                    <motion.img
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, type: "spring" }}
                        className='object-contain h-full w-8 ml-14'
                        src={Search}>
                    </motion.img>
                </div>
            </div>
            <div className='w-full'>
                <div className='flex flex-row mt-4 items-start'>
                    <motion.div
                        viewport={{ once: true }}
                        initial={{ opacity: 0, height: 0 }}
                        whileInView={{ opacity: 1, height: 500 }}
                        transition={{ duration: 0.5, type: "spring", stiffness: 100, delay: 0.3 }}
                        className="overflow-hidden"
                    >
                        <img className='ml-14 w-16 object-contain z-10 rounded-none' src={Lines2}></img>
                    </motion.div>
                    <div className='w-3/4 mt-48 -ml-12'>
                        <motion.h1
                            viewport={{ once: true }}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, type: "spring", stiffness: 100, delay: 0.3 }} className='text-white pl-8 uppercase'>step 2</motion.h1>
                        <motion.div
                            viewport={{ once: true }}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, type: "spring", stiffness: 100, delay: 0.3 }} className='text-2xl text-white bg-transparent ml-24 mt-12 w-2/5'>
                            Now for the fun part! Using the <span className='text-[#fec80a]'>Search Bar</span>, you can look up other batchmates who have registered on the Portal and can comment on their page!
                        </motion.div>
                    </div>
                    <motion.div
                        viewport={{ once: true }}
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, type: "spring", stiffness: 200, delay: 0.3 }}
                        className='w-1/3 h-96 rounded-xl bg-gray-800 -ml-96 mt-32'>
                    </motion.div>
                </div>
                <div className='w-full h-8 mt-4 ml-2 object-contain'>
                    <motion.img initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, type: "spring" }}
                        className='object-contain h-full' src={Comment}>
                    </motion.img>
                </div>
            </div>
            <div className='w-full mt-4'>
                <div className='flex flex-row mt-2 mb-4'>
                    <motion.div
                        viewport={{ once: true }}
                        initial={{ opacity: 0, height: 0 }}
                        whileInView={{ opacity: 1, height: 500 }}
                        transition={{ duration: 0.5, type: "spring", stiffness: 100, delay: 0.3 }}
                        className="overflow-hidden"
                    >
                        <img className='ml-14 w-8 object-contain z-10 rounded-none' src={Lines3}></img>
                    </motion.div>
                    <div className='flex flex-col'>
                        <div className='flex flex-row'>
                            <div className='mt-48  w-3/4'>
                                <motion.h1
                                    viewport={{ once: true }}
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, type: "spring", stiffness: 100, delay: 0.3 }}
                                    className='text-white pl-8 uppercase'>remember<span className='text-[#fec80a]'>!</span></motion.h1>
                                <motion.div
                                    viewport={{ once: true }}
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, type: "spring", stiffness: 100, delay: 0.3 }} className='text-2xl text-white bg-transparent ml-24 mt-12 w-2/5'>
                                    Others can comment on your page, and you will have the power to <span className='text-[#fec80a]'>approve</span> those comments.
                                </motion.div>
                            </div>
                            <div className='w-96 h-64 rounded-xl bg-gray-600 -ml-64 mt-16'></div>
                            <div className='w-96 h-64 rounded-xl bg-gray-800 -ml-72 mt-32'></div>
                        </div>
                        <div className='flex flex-col w-full h-96 items-center justify-center'>
                            <motion.h1
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, type: "spring", stiffness: 100 }} className='text-4xl text-white capitalize w-2/3 text-center'>
                                So, register now and join in on the <span className='text-[#fec80a]'>nostalgic</span> trips of your time at IIT Indore!
                            </motion.h1>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, type: "spring", stiffness: 100 }}>
                                <a><button className='bg-transparent border-2 rounded-xl border-white w-32 h-14 text-white uppercase hover:bg-[#fec80a] hover:text-[#180c1e] hover:border-transparent ease-in-out duration-300 '>Register</button></a>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex w-screen flex-col bg-[#160923] z-0 -mt-[4rem]'>
                <div className='lg:pt-16 flex flex-col lg:flex-row items-center justify-around lg:h-3/5 w-full bg-gradient-to-tr from-purple-800 lg:pb-16'>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
                        className='flex w-72 lg:mt-0 mt-8 lg:mb-0 mb-8 h-96 bg-white justify-center items-center rounded-xl'>
                        <h1 className='text-black text-center'>Class Of 2020</h1>
                    </motion.div>
                    <div className='w-4/5 lg:w-1/3 flex flex-col lg:h-64'>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
                            className='w-full h-1/2 flex flex-col lg:flex-row justify-start lg:justify-between items-center'>
                            <div className='flex-col w-1/2'>
                                <h1 className='uppercase p-0 text-5xl'>2.75K+</h1>
                                <p className='bg-transparent capitalize text-white'>captions in 2021</p>
                            </div>
                            <div className='flex-col w-1/2'>
                                <h1 className='uppercase p-0 text-5xl'>2.75K+</h1>
                                <p className='bg-transparent capitalize text-white'>captions in 2021</p>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
                            className='w-full h-1/2 flex flex-col lg:flex-row justify-start lg:justify-between items-center'>
                            <div className='flex-col w-1/2'>
                                <h1 className='uppercase p-0 text-5xl'>2.75K+</h1>
                                <p className='bg-transparent capitalize text-white'>captions in 2021</p>
                            </div>
                            <div className='flex-col w-1/2'>
                                <h1 className='uppercase p-0 text-5xl'>2.75K+</h1>
                                <p className='bg-transparent capitalize text-white'>captions in 2021</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage