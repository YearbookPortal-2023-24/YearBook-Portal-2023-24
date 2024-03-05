import { useContext, useState } from "react";
// import { useContext, useState, useEffect } from "react";
import { LoginContext } from "../../helpers/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./otpverification.scss";

const OtpVerification = () => {
  const {
    // loggedin,
    setLoggedin,
    // fill,
    setFill,
    user,
    // setUser,
    setVerified,
    setProfileIcon,
    // profileIcon,
    userData,
    // setUserData,
    profile,
    setProfile,
  } = useContext(LoginContext);
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState("");
  const [state, setState] = useState(false);
  const navigate = useNavigate();
  // const [profile, setProfile] = useState({});
  
  // token for profile
  const token = (length) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  };


  // const navigate = useNavigate();

  const otpVerify = (e) => {
    e.preventDefault();
    setState(true);
    setTimeout(() => {
      setState(false);
    }, 20000);

    const code = otp;
    const confirmationResult = window.localStorage.confirmationResult;
    console.log(confirmationResult)
    confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;

        axios
      .post(process.env.REACT_APP_API_URL + "/verify", {
        userId: user.email,
      })
      .then((res) => {
        console.log(res);
        if (res.data.message === "Mobile number verified") {
          console.log(res.data);
          setFill(true);
          setVerified(true);
          setProfileIcon(true);
          setLoggedin(true);
          window.localStorage.setItem("verified", true);
          window.localStorage.setItem("profileIcon", true);
          setProfile(res.data.user);
          window.localStorage.setItem("profile", JSON.stringify(res.data.user));
          console.log(profile);
          navigate(`/profile/${profile.roll_no}/${profile.name}`);
        }
        setMessage(res.data.message);
        setTimeout(() => {
          setMessage("");
        }, 20000);
      })
      .catch((err) => {
        console.log(err);
      });

        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
      });

    
  };

  const resendOTP = () => {
    setState(true);
    setTimeout(() => {
      setState(false);
    }, 20000);
    axios
      .post(process.env.REACT_APP_API_URL + "/resendOTP", {
        phoneOTP: otp,
        userId: user.email,
      })
      .then((res) => {
        console.log(res);
        if (res.data.message === "Mobile number verified") {
        } else {
          setMessage(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <br></br>
      <h1 id="otph1">Please enter the OTP sent on provided contact number.</h1>
      <div className="container-otp">
        <form>
          <input
            type="text"
            id="otp"
            onChange={(e) => {
              setOtp(e.target.value);
            }}
          />
          <div className={state ? "resend-disabled" : "resend"}>
            <button onClick={resendOTP} disabled={state}>
              Resend OTP
            </button>
          </div>
          <p style={{ color: "red" }}>{message}</p>
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
      </div>
      <br></br>
      <br></br>
      <br></br>
    </>
  );
};

export default OtpVerification;
