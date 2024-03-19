import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./new_components/Navbar/Navbar";
// import Cards from "./components/team/Cards.jsx";
// import MakeAComment from "./components/Make_a_Comment/MakeAComment";
import Make_Comment from "./new_components/MakeComment2/Makeacomment.js";
// import SecondLogin from "./components/SecondLogin/SecondLogin";
// import Fill from "./components/Fill_Details/Fill";
import Edit from "./new_components/Edit_Profile/Edit";
import Fill1 from "./new_components/not_verified_otp/otpVerificationnew";
import Fill2 from "./new_components/email_not_verified/emailverification";
import Goldcard from "./new_components/New_Comps/page2.js"
import Blackcard from "./new_components/New_Comps/page1.js"
// import Homepage from "./components/Homepage/Homepage";
// import Error from "./components/Error/Error";
// import Internet from "./components/Internet/Internet";
import alumniData from "./new_components/Navbar/akumniData.json";
import UserList from "./new_components/UserList.js"
// import UserList from "./components/navbar/UserList.js";
import { Route, Routes, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { LoginContext } from "./helpers/Context";
import axios from "axios";
import EditAComment from "./new_components/Edit_a_Comment/EditAComment";

import Fill3 from "./new_components/Fill_Details3/Fill_Details3.js";
import Homepage2 from "./new_components/New_homepage/home.jsx";

import Prof from "./new_components/prof/prof.js";
import Nongrad from "./new_components/nongradprof/nongrad.js";
import Page1 from "./new_components/New_Comps/page1.js";
import Page2 from "./new_components/New_Comps/page2.js";
const App = ({ location }) => {
  const [user, setUser] = useState({});
  const [loggedin, setLoggedin] = useState(false);
  const [authData, setAuthData] = useState([]);
  const [result, setResult] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fill, setFill] = useState(false);
  const [profile, setProfile] = useState({});
  const [allUsers, setAllUsers] = useState([]); // Updated variable name
  const [oneTimeVerified, setOneTimeVerified] = useState(false);
  const [verified, setVerified] = useState(false);
  const [profileIcon, setProfileIcon] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    roll_no: "",
    academic_program: "",
    department: "",
    personal_email_id: "",
    contact_details: "",
    alternate_contact_details: "",
    address: "",
    current_company: "",
    designation: "",
    about: "",
    question_1: "",
    question_2: "",
  });

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

  // Loading spinner function
  const loadingSpinner = () => {
    setLoading(true);
    const Load = async () => {
      await new Promise((r) => setTimeout(r, 2000));
      setLoading((loading) => !loading);
    };

    Load();
  };

  // Get all users' name branch and email id
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/getUsersData")
      .then((res) => {
        setAllUsers(res.data); // Updated variable name
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Callback Function after logging in
  async function handleCallbackResponse(response) {
    // Getting all the data from Google for the user who signs in
    var userObject = jwt_decode(response.credential);
    setUser(userObject);
    setLoggedin(true);
    loadingSpinner();

    // Storing the users' data in the localStorage
    window.localStorage.setItem("user", JSON.stringify(userObject));
    window.localStorage.setItem("loggedin", true);
    // Rendering the signin button
    document.getElementById("google-login").hidden = false;

    await axios
      .post(process.env.REACT_APP_API_URL + "/checkAuth", {
        email: userObject.email,
      })
      .then((res) => {
        // If the user already exists in the auth model
        if (res.data.message === "true") {
          // If the user is an alumnus
          if (alumniEmail.includes(userObject.email)) {
            axios
              .post(process.env.REACT_APP_API_URL + "/findAUser", {
                email: userObject.email,
              })
              .then((res) => {
                // If the user had made his profile
                if (res.data.message === "User Found") {
                  // If the user is verified
                  if (res.data.User[0].two_step_verified === true) {
                    setProfileIcon(true);
                    setVerified(true);
                    setProfile(res.data.User[0]);
                    window.localStorage.setItem("verified", true);
                    window.localStorage.setItem("profileIcon", true);
                    const p = JSON.stringify(res.data.User[0]);
                    window.localStorage.setItem("profile", p);
                    console.log(res.data.User[0].roll_no);
                    navigate(`/profile/${res.data.User[0].roll_no}/${res.data.User[0].name}`);

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
                    navigate(`/fill/${userObject.jti}`);
                  }
                  // If the user has not made the profile but already exists in the auth
                  // then navigate the user to the fill page
                } else {
                  navigate(`/fill/${userObject.jti}`);
                }
              });
          }
          // If the user is a student
          else {
            setFill(true);
            navigate(`/goldcard`);;
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
                navigate(`/goldcard`);
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
    <LoginContext.Provider
      value={{
        loggedin,
        setLoggedin,
        user,
        setUser,
        authData,
        setAuthData,
        result,
        setResult,
        isRegistered,
        setIsRegistered,
        loading,
        setLoading,
        loadingSpinner,
        fill,
        setFill,
        profile,
        setProfile,
        allUsers,
        verified,
        setVerified,
        profileIcon,
        verified,
        setProfileIcon,
        userData,
        setUserData,
        isStudent,
        setIsStudent,
        oneTimeVerified,
        setOneTimeVerified
      }}
    >
      <div className="App overflow-x-hidden">
        {window.location.pathname !== "/fill/:userId" &&
          window.location.pathname !== "/otpVerificationnew/:userId" &&
          window.location.pathname !== "/Fill_Details3/:userId" &&
          window.location.pathname !== "/emailverification/:userId" &&
          window.location.pathname !== "/otpVerification/:userId" &&
          window.location.pathname !== "/goldcard" &&
          window.location.pathname !== "/blackcard" &&
          window.location.pathname !== "*" && <Navbar />}
        {/* <Navbar_phone /> */}
        <Routes>
          
          {/* Homepage */}
          {/* <Route exact path="/oldHomepage" element={<Homepage />} /> */}
          <Route exact path="/" element={<Homepage2 />} />
          <Route exact path = "/profile/nongrad" element = {<Nongrad />} />

          {/* Registration Page */}
          {/* <Route exact path="/fill/:userId/old" element={<Fill />} /> */}
          <Route exact path="/otpVerificationnew/:userId" element={<Fill1 />} />
          <Route exact path="/emailverification/:userId" element={<Fill2 />} />
          <Route exact path="/fill/:userId" element={<Fill3 />} />

          {/* Search Page */}
          {<Route exact path="/userlist" element={<UserList />} /> }

          {/* Make a Comment Page */}
          {/* <Route
            exact
            path="/comment/:name/:roll_no/old"
            element={<MakeAComment />}
          /> */}
          <Route exact path="/comment/:name/:roll_no" element={<Make_Comment />} />

          {/* Profile Page */}
          {/* <Route exact path="/profile/:roll/:name/old" element={<SecondLogin />} /> */}
          <Route exact path="/profile/:roll/:name" element={<Prof />} />
           
          {/* Cards */}
          <Route exact path="/goldcard" element={<Goldcard />} />
          <Route exact path="/blackcard" element={<Blackcard />} />

          {/* Edit Profile Page */}
          <Route exact path="/edit/:roll/:name" element={<Edit />} />

          {/* Edit a Comment Page */}
          <Route
            exact
            path="/comment/edit/:userId/:commentId"
            element={<EditAComment />}
          />

          {/* About Page */}
          {/* <Route exact path="/about" element={<About />} /> */}

          {/* Team Page */}
          {/* <Route exact path="/team" element={<Cards />} /> */}

          {/* Error Pages */}
          {/* <Route exact path="*" element={<Error />} /> */}
          {/* <Route exact path="/issue" element={<Internet />} /> */}

          {/* Balck and Gold Cards */}
          <Route exact path="/Newp1" element={<Page1 />} />
          <Route exact path="/Newp2" element={<Page2 />} />

        </Routes>

        {/* {!loading && <Footer />} */}
      </div>
    </LoginContext.Provider>
  );
};

export default App;
