import React, { useEffect, useRef } from 'react';
import { Element } from 'react-scroll';
import './homepage.module.css'; // Import the CSS file for styling
import Footer from './footer';
import { motion } from "framer-motion";

import { LoginContext } from '../../helpers/Context';
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import jwt_decode from "jwt-decode";
import alumniData from "../Navbar/akumniData.json";



const Home = () => {

  const { setUser, setLoggedin, setProfileIcon, setVerified, setProfile, setFill, oneTimeVerified, setOneTimeVerified } = useContext(LoginContext);

  const alumniEmail = alumniData; // Getting all the alumnis data
  const navigate = useNavigate();

  // Google authentication for IITI students
  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id:
          "971426024153-8iva32hh346i681clve32rkq2g7uu7eo.apps.googleusercontent.com",
        callback: handleCallbackResponse,
      });
      google.accounts.id.renderButton(document.getElementById("google-login"), {
        theme: "dark",
        size: "large",
        width: "large",
      });
    }
  }, []);

  // Callback Function after logging in
  async function handleCallbackResponse(response) {

    // Getting all the data from Google for the user who signs in
    var userObject = jwt_decode(response.credential);
    setUser(userObject);
    setLoggedin(true);
    // loadingSpinner();

    // Storing the users' data in the localStorage
    window.localStorage.setItem("user", JSON.stringify(userObject));
    window.localStorage.setItem("loggedin", true);

    // Rendering the signin button
    document.getElementById("google-login").hidden = true;

    await axios
      .post(process.env.REACT_APP_API_URL + "/checkAuth", {
        email: userObject.email,
      })
      .then((res) => {
        // If the user already exists in the auth model
        if (res.data.message === "true") {
          // If the user is an alumni
          if (alumniEmail.includes(userObject.email)) {
            axios
              .post(process.env.REACT_APP_API_URL + "/findAUser", {
                email: userObject.email,
              })
              .then((res) => {
                // If the user had made his profile
                if (res.data.message === "User Found") {

                  //If the user is not one time verified
                  if (res.data.User[0].one_step_verified === true) {
                    setOneTimeVerified(true);
                  } else {
                    navigate(`/fill/${userObject.jti}`);
                  }

                  // If the user is verified
                  if (res.data.User[0].two_step_verified === true) {
                    setProfileIcon(true);
                    setVerified(true);
                    setProfile(res.data.User[0]);
                    window.localStorage.setItem("verified", true);
                    window.localStorage.setItem("profileIcon", true);
                    const p = JSON.stringify(res.data.User[0]);
                    window.localStorage.setItem("profile", p);

                    navigate(`/`);
                  }

                  // If the user is not verified
                  else {
                    axios
                      .post(process.env.REACT_APP_API_URL + "/findAUser", {
                        email: userObject.email,
                      })
                      .then((res) => {
                        //If the user had made his profile
                        if (res.data.message === "User Found") {
                          if (res.data.User[0].one_step_verified === true) {
                            navigate(`/emailverification/${userObject.jti}`);
                          } else {
                            navigate(`/otpVerificationnew/${userObject.jti}`);
                          }
                        }
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                    navigate(`/Fill_Details3/${userObject.jti}`);
                  }
                  // If the user has not made the profile but already exists in the auth
                  // then navigate the user to the fill page
                } else {
                  navigate(`/Fill_Details3/${userObject.jti}`);
                }
              });
          }
          // If the user is a student
          else {
            setFill(true);
            navigate("/");
          }
        }
        // If signed in for the first time
        else {
          axios
            .post(process.env.REACT_APP_API_URL + "/auth", {
              email: userObject.email,
              name: userObject.name,
            })
            .then((res) => {
              // console.log(res);
              // If alumni
              if (alumniEmail.includes(userObject.email)) {
                navigate(`/fill/${userObject.jti}`);
              }
              // If student
              else {
                setFill(true);
                navigate("/");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const ref = useRef(null);
  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const FirstPage = () => {

    return (
      <Element name="first" className="snap-start relative h-screen w-screen flex flex-col items-center justify-center bg-bg-white bg-cover">
        <motion.h1
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="snap-scroll text-5xl text-black text-center"
        >
          "Change can be scary, but so is staying in the same place" <br />
        </motion.h1>
        <motion.h1
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="snap-scroll text-3xl text-black ml-96 mt-8"
        >
          - Anonymous
        </motion.h1>

        <motion.div
          className='flex flex-row absolute bottom-12'
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <h1 className='text-xl'>
            Scroll Down to Continue
          </h1>
          <img src="/images/homepage/down_arrow.png" className='w-6 mt-1 h-6'></img>
        </motion.div>
        <motion.div
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
          className='absolute right-12 bottom-12'
        >
          <button onClick={handleClick}><h1 className='text-xl hover:underline'>Skip Intro</h1></button>
        </motion.div>
      </Element>
    );
  };

  const SecondPage = () => {
    return (
      <Element name="second" className="snap-start h-screen flex flex-col items-center justify-center bg-bg-white bg-cover">
        <motion.h1
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl text-black text-center"
        >
          "We are sad to see you go. <br />
        </motion.h1>
        <motion.h1
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl text-black text-center"
        >
          but the best thing to do is remember the past <br />
        </motion.h1>
        <motion.h1
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-3xl text-black text-center"
        >
          and <span className='text-5xl'>MOVE</span> on , right?"
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
      <Element name="third" className="snap-start h-screen flex flex-col items-center justify-center relative bg-bg-white bg-cover">

        <motion.h1
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl  text-center leading loose"
        >
          In <span className='text-5xl'>20<span className='text-[#d94d3c]'>21</span></span>, we learnt how to embrace
        </motion.h1> <br />
        <motion.h1
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-5xl text-black text-center leading loose text-bold"
        >
          SICKNESS
        </motion.h1>

        <motion.img
          viewport={{ once: false }}
          initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -30 }}
          transition={{ duration: 1, delay: 2 }}
          src="/images/homepage/covid.png"
          alt=""
          className="absolute left-0 bottom-50 w-48"
        />
        <motion.img
          viewport={{ once: false }}
          initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -30 }}
          transition={{ duration: 1, delay: 3 }}
          src="/images/homepage/covid.png"
          alt=""
          className="absolute left-200 bottom-0 w-32"
        />
        <motion.img
          viewport={{ once: false }}
          initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 30 }}
          transition={{ duration: 1, delay: 4 }}
          src="/images/homepage/covid.png"
          alt=""
          className="absolute right-0 top-10 w-64"
        />

      </Element>
    );
  };

  const FourthPage = () => {
    return (
      <Element name="fourth" className="snap-start h-screen flex flex-col items-center justify-center bg-bg-white bg-cover relative">
        <motion.h1
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl text-black text-center"
        >
          In <span className='text-5xl'>20<span className='text-[#d94d3c]'>22</span></span>, we learnt to accept
        </motion.h1>
        <br />



        <motion.h1
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-5xl text-black text-right ml-48"
        >
          THE NEW NORMAL
        </motion.h1>
        <motion.img
          viewport={{ once: true }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          src="/images/homepage/mask.png"
          alt=""
          className="absolute left-12 bottom-20 top-30 w-1/3"
        />
      </Element>
    );
  };

  const FifthPage = () => {
    return (
      <Element name="fifth" className="snap-start h-screen flex flex-col items-center justify-center bg-bg-white bg-cover relative">

        <motion.h1
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl text-black text-center"
        >
          In <span className='text-5xl'>20<span className='text-[#d94d3c]'>23</span></span>, we learnt the importance of
        </motion.h1>
        <br />
        <motion.h1
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-5xl text-black text-center text-bold ml-64"
        >
          CONNECTIONS
        </motion.h1>
        <div className='flex flex-col gap-2 rotate-[135deg] absolute left-32 bottom-0'>
          <div className="w-48 h-48 border-2 border-black"><img src="/images/homepage/connections/1.jpg" className='w-full h-full object-cover rounded-none'></img></div>
          <div className='flex-row flex gap-2'>
            <div className="w-48 h-48 border-2 border-black"></div>
            <div className="w-48 h-48 border-2 border-black"></div>
          </div>
        </div>
        <div className='flex gap-2 rotate-45 absolute -right-32 top-32'>
          <div className='w-48 h-48 border-2 border-black'></div>
          <div className='w-48 h-48 border-2 border-black'></div>
        </div>
      </Element>
    );
  };

  const SixthPage = () => {
    return (
      <Element name="sixth" className="snap-start relative h-screen flex flex-col items-center justify-center bg-bg-white bg-cover">
        <motion.h1
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl text-black -ml-96"
        >
          In <span className='text-5xl'>20<span className='text-[#d94d3c]'>24</span></span>, we
        </motion.h1>
        <motion.h1
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-5xl  text-black -ml-56 text-bold mt-4"
        >
          GRADUATE
        </motion.h1>
        <motion.h1
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="text-3xl text-black mt-4"
        >
          leaving behind, a legacy of
        </motion.h1>
        <motion.h1
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3 }}
          className="text-5xl text-black  ml-30  text-bold mt-6"
        >
          Resilience
        </motion.h1>
        <motion.h1
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3 }}
          className="text-3xl text-black text-center my-2"
        >
          and
        </motion.h1>
        <motion.h1
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3 }}
          className="text-5xl text-black text-center text-bold"
        >
          Friendship
        </motion.h1>
        <motion.img
          viewport={{ once: true }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.75 }}
          src="/images/homepage/graduate.png"
          alt=""
          className="absolute left-12 bottom-0 w-1/3 "
        />
      </Element>
    );
  };

  const SeventhPage = (props) => {
    return (
      <Element name="seventh" className="snap-start relative h-screen flex flex-col items-center justify-center bg-bg-white bg-cover" ref={ref}>
        <motion.h1
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl text-black text-center relative"
        >
          One of us? Let us know by <span className='text-[#d94d3c]'> Signing in </span>
        </motion.h1>
        <motion.div
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className='mt-8 w-48 h-48'
        >
          <div id='google-login'></div>
        </motion.div>
        <motion.div
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
          className='absolute bottom-8 flex'
        >
          <h1>Or scroll down to go down a different path</h1><img src="/images/homepage/down_arrow.png" className='w-6 h-6'></img>
        </motion.div>
      </Element>
    );
  };

  return (
    <>
      <div className='snap-y snap-mandatory h-screen w-screen overflow-y-scroll overflow-x-hidden'>
        <FirstPage />
        <SecondPage />
        <ThirdPage />
        <FourthPage />
        <FifthPage />
        <SixthPage />
        <SeventhPage />
        <Footer />
      </div>
    </>
  );
};






export default Home;
