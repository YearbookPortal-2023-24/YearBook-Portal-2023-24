import React, { useEffect } from 'react';
import { Element } from 'react-scroll';
import './homepage.module.css'; // Import the CSS file for styling
import Footer from './footer';
import { motion } from "framer-motion";

import { LoginContext } from '../../helpers/Context';
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import jwt_decode from "jwt-decode";
import alumniData from "../../components/navbar/akumniData.json";



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
        theme: "outline",
        size: "medium",
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

  return (
    <>
      <div className='bg-bg-white bg-contain'>
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

const FirstPage = () => {


  return (
    <Element name="first" className="snap-scroll h-screen w-screen flex flex-col items-center justify-center bg border-2 leading-loose">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="snap-scroll text-5xl text-black text-center font-custom leading-loose"
      >
        "Change can be scary, but so is staying in the same place" <br />
      </motion.h1>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="snap-scroll text-4xl text-black ml-24 font-custom leading-loose font-bold"
      >
        - Anonymous
      </motion.h1>

      <div className='flex flex-row absolute bottom-12'>
        <h1 className='text-xl'>
          Scroll Down to Continue
        </h1>
        <img src="/images/homepage/down_arrow.png" className='w-6 mt-1 h-6'></img>
      </div>
      <div className='absolute right-12 bottom-12'>
        <button><h1 className='text-xl hover:underline'>Skip Intro</h1></button>
      </div>
    </Element>
  );
};




const SecondPage = () => {
  return (
    <Element name="second" className="h-screen flex flex-col items-center justify-center bg border-2 leading-loose">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-3xl text-black text-center font-custom leading-loose"
      >
        "We are sad to see you go. <br />
      </motion.h1>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-3xl text-black text-center font-custom leading-loose"
      >
        but the best thing to do is remember the past <br />
      </motion.h1>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="text-5xl text-black text-center font-custom leading-loose"
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
    <Element name="third" className="border-2 h-screen flex flex-col items-center justify-center bg  relative leading-loose">





      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl  text-center font-custom leading loose"
      >




        <h1 className="text-4xl text-black text-center font-custom leading loose">In 2021, we learnt how to embrace </h1>
      </motion.h1> <br />
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="text-4xl text-black text-center font-custom leading loose text-bold"
      >
        SICKNESS
      </motion.h1>

      <motion.img
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.75 }}
        src="img1-removebg-preview.png"
        alt=""
        className="absolute left-0 bottom-50 "
      />
      <motion.img
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.25 }}
        src="img1-removebg-preview.png"
        alt=""
        className="absolute left-200 bottom-0"
      />
      <motion.img
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        src="img1-removebg-preview.png"
        alt=""
        className="absolute right-0 top-10"
      />

    </Element>
  );
};


const FourthPage = () => {
  return (
    <Element name="fourth" className="border-2 h-screen flex flex-col items-center justify-center bg relative leading-loose">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl text-black text-center font-custom"
      >
        In 2022, we learnt to accept
      </motion.h1>
      <br />



      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="text-4xl text-black text-right font-custom"
      >
        THE NEW NORMAL
      </motion.h1>
      <motion.img
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        src="img2-removebg-preview.png"
        alt=""
        className="absolute left-12 bottom-20 top-30 "
      />
    </Element>
  );
};


const FifthPage = () => {
  return (
    <Element name="fifth" className="h-screen flex flex-col items-center justify-center bg border-2 leading-loose relative">

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl text-black text-center font-custom"
      >
        In 2023, we learnt the importance of
      </motion.h1>
      <br />
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="text-4xl text-black text-center text-bold font-custom"
      >
        CONNECTIONS
      </motion.h1>
      <div className="square-box-container">
        <div className="box"></div>

        {/* Additional divs for other boxes */}
      </div>
      <motion.img
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        src="p3.jpg"
        alt=""
        className="absolute left-0 bottom-0"
      />
    </Element>
  );
};

const SixthPage = () => {
  return (
    <Element name="sixth" className="h-screen flex flex-col items-center justify-center bg border-2 leading-loose">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl text-black ml-200px  font-custom relative leading-loose"
      >
        In <span className='text-red'>2024</span>, we
      </motion.h1>
      <br />
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="text-5xl  text-black  text-bold text-center font-custom leading-loose"
      >
        GRADUATE
      </motion.h1>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-3xl text-black  font-custom leading-loose"
      >
        leaving behind, a legacy of
      </motion.h1>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 1 }}
        className="text-5xl text-black  ml-30  text-bold font-custom leading-loose"
      >
        Resilience
      </motion.h1>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-3xl text-black text-center font-custom leading-loose"
      >
        and
      </motion.h1>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="text-5xl text-black text-center text-bold font-custom leading-loose"
      >
        Friendship
      </motion.h1>
      <motion.img
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.75 }}
        src="p3-removebg-preview.png"
        alt=""
        className="absolute left-12 bottom-50 "
      />
    </Element>
  );
};

const SeventhPage = (props) => {
  return (
    <Element name="seventh" className="h-screen flex flex-col items-center justify-center bg border-2 leading-loose">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-3xl text-black text-center font-custom relative leading-loose"
      >
        One of us? Let us know by <span className=' text-5xl; text-red-700'> Signing in </span>
      </motion.h1>
      {/* <motion.button
        // id = "google-login"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-blue-200 text-black w-48 font-custom font-bold py-2 px-4 rounded mt-4 relative "
        onClick={props.googleLogin}
      >
        Sign in with Google  <div class="h-[30px] max-w-[30px] absolute top-[10px] right-[5px]"> <img src="images/google.png" alt="" /></div>
      </motion.button> */}
      <div id='google-login'>
      </div>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-custom  text-black font-bold mt-4"
      >
        Join us in creating the future together!
      </motion.p>
    </Element>
  );
};

export default Home;
