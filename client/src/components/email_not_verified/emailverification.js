import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import "./emailverification.scss";
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
          .post(process.env.REACT_APP_API_URL + "/userDataemail", {
            email: user.email,
            personal_email_id: userData.personal_email_id
          })
          .then((res) => {
            console.log("yes1")
            axios
              .post(process.env.REACT_APP_API_URL + "/verify", {
                userId: user.email,
              })
              .then((res) => {
                console.log("yes2")
                
                setMessage("send Sent a verification email to your personal email_id");

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
                
                
                // setTimeout(() => {
                //   setMessage("");
                // }, 5000);
              })
              .catch((err) => {
                console.log(err);
              });
    
          })
          .catch((err) => {
            console.log(err);
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