import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import "./otpVerificationnew.scss";
import { LoginContext } from "../../helpers/Context";
import { useContext, useNavigate } from "react";

function Fill1(props){
  const {
    user,
    loading,
    setLoading,
    userData,
    setUserData,
    loggedin,
    setLoggedin,
    profile,
    setProfile,
    setFill,
    setVerified,
    setProfileIcon,
  } = useContext(LoginContext);
  
  const [message, setMessage] = useState("");
  const [imageSelected, setImageSelected] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [verify, setVerify] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [upload, setUploaded] = useState(false);
  const [verify2, setVeriify2] = useState(false);
  const [state, setState] = useState(false);
  const [otp, setOtp] = useState("");
  const [rollNoisNumber, setRollNoisNumber] = useState("");
  const [sentOtp, setSentOtp] = useState(false);
  const [sub, setSub] = useState(false);
  const [wait, setWait] = useState(false);

  const auth = getAuth();
  
      const onSubmit = () => {
        setState(true);
        setTimeout(() => {
          setState(false);
        }, 6000);
    
        axios
          .post(process.env.REACT_APP_API_URL + "/userDataNew", {
            email: user.email,
            personal_email_id: userData.personal_email_id,
            contact_details: userData.contact_details,
          })
          .then((res) => {
           
              setMessage("Sent an OTP to your contact number.");
    
              window.recaptchaVerifier = new RecaptchaVerifier(
                "recaptcha-container",
                {
                  size: "invisible",
                  callback: (response) => {
                    console.log("recaptcha");
                  },
                },
                auth
              );
              const phoneNumber = res.data.contact_details;
    
              const appVerifier = window.recaptchaVerifier;
    
              signInWithPhoneNumber(auth, phoneNumber, appVerifier)
                .then((confirmationResult) => {
                  window.confirmationResult = confirmationResult;
                  setSentOtp(true);
                  setSub(true);
                })
                .catch((error) => {
                  // console.log(error);
                  setMessage("Please enter your mobile number with +91");
                });
    
              // setTimeout(()=>{
              //   setMessage("")
              // },15000)
            // }
    
          })
          .catch((err) => {
            console.log(err);
          });
      };
      const otpVerify = (e) => {
        e.preventDefault();
    
        setState(true);
        setTimeout(() => {
          setState(false);
        }, 20000);
    
        const code = otp;
    
        window.confirmationResult
          .confirm(code)
          .then((result) => {
            axios
              .post(process.env.REACT_APP_API_URL + "/verify", {
                userId: user.email,
              })
              .then((res) => {
                if (
                  res.data.message ===
                  "Sent a verification email to your personal email_id"
                ) {
                  setFill(true);
                  setVerified(true);
                  setProfileIcon(true);
                  setLoggedin(true);
                  window.localStorage.setItem("verified", true);
                  window.localStorage.setItem("profileIcon", true);
                  window.localStorage.setItem("loggedin", true);
                  setProfile(res.data.user);
    
                  window.localStorage.setItem(
                    "profile",
                    JSON.stringify(res.data.user)
                  );
    
                  setSentOtp(false);
                  setVerify(true);
                  setVeriify2(true);
                  window.localStorage.setItem("userData", JSON.stringify(userData));
    
                  // setTimeout(() => {
                  //   setMessage('')
                  // }, 8000)
                }
                setMessage(res.data.message);
                // setTimeout(() => {
                //   setMessage("");
                // }, 5000);
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((error) => {
            // console.log(error);
            setMessage("Incorrect OTP");
          });
      };
    
      const resendMail = () => {
        setState(true);
        setTimeout(() => {
          setState(false);
        }, 8000);
    
        axios
          .post(process.env.REACT_APP_API_URL + "/resendMail", {
            userId: user.email,
            personalMailId: userData.personal_email_id,
          })
          .then((res) => {})
          .catch((err) => {
            console.log(err);
          });
      };
      return (
        <>
          <div className="container_fill">
            <style>
              @import
              url('https://fonts.googleapis.com/css2?family=Quantico&display=swap');
            </style>
            <div className="container2">
              <div className="left">
                
                
                
                
                <h4 id="disclaimer">
                  <div className="disc">Disclaimer:</div> You cannot edit your{" "}
                  <strong>Email ID</strong> and <strong>Contact Numbers</strong>{" "}
                  later on.
                </h4>
                <input
                  type="text"
                  placeholder="Personal Email ID*"
                  size="60"
                  name="personal_email_id"
                  value={userData.personal_email_id}
                  onChange={(e) =>
                    setUserData({ ...userData, [e.target.name]: e.target.value })
                  }
                />
                <br />
                <p id="ques">Enter +91 before your contact number:</p>
                <input
                  type="text"
                  placeholder="Contact Number*"
                  size="60"
                  name="contact_details"
                  value={userData.contact_details}
                  onChange={(e) =>
                    setUserData({ ...userData, [e.target.name]: e.target.value })
                  }
                />
                
                <br />
                
                <div id="emailver">
                  {!sub && (
                    <button
                      className="submit1"
                      onClick={onSubmit}
                      id="sub5"
                      disabled={state}
                      style={{ background: state ? "#838080" : "#3E185C" }}
                    >
                      Submit
                    </button>
                  )}
    
                  {sentOtp && (
                    <>
                      <form>
                        <input
                          type="text"
                          id="otp"
                          onChange={(e) => {
                            setOtp(e.target.value);
                          }}
                        />
                        {/* <p style={{ color: "white" }}>{message}</p> */}
                      </form>
                      <div className="submit">
                        <button
                          onClick={otpVerify}
                          id="submit"
                          disabled={state}
                          style={{ background: state ? "#838080" : "#3E185C" }}
                        >
                          Submit
                        </button>
                      </div>
                    </>
                  )}
    
                  <h2 id="verificationmessage">{message}</h2>
                  {rollNoisNumber !== "" && (
                    <h2 id="verificationmessage">{rollNoisNumber}</h2>
                  )}
                  {verify2 && (
                    <button
                      className="submit1"
                      onClick={resendMail}
                      disabled={state}
                      id="sub5"
                      style={{ color: state ? "#D8D8D8" : "#fec90ad9" }}
                    >
                      Resend Mail
                    </button>
                  )}
                  <div id="recaptcha-container"></div>
                </div>
              </div>
              
            </div>
          </div>
        </>
      );
}
export default Fill1;