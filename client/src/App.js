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
import Goldcard from "./new_components/Member_cards_pages/page2.js";
import Blackcard from "./new_components/Member_cards_pages/BlackCard.js";
// import Homepage from "./components/Homepage/Homepage";
// import Error from "./components/Error/Error";
// import Internet from "./components/Internet/Internet";
import alumniData from "./new_components/Navbar/akumniData.json";
import UserList from "./new_components/UserList.js";
// import UserList from "./components/navbar/UserList.js";
import { Route, Routes, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { LoginContext } from "./helpers/Context";
import axios from "axios";
import EditAComment from "./new_components/Edit_a_Comment/EditAComment";

import Fill3 from "./new_components/Fill_Details3/Fill_Details3.js";
import Homepage2 from "./new_components/New_homepage/home.jsx";

import Prof from "./new_components/prof/prof.js";

import BlackCard from "./new_components/Member_cards_pages/BlackCard.js";
import Page2 from "./new_components/Member_cards_pages/page2.js";
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
        setOneTimeVerified,
      }}
    >
      <div className="App overflow-x-hidden">
        {window.location.pathname !== "/fill/:userId" &&
          window.location.pathname !== "/otpVerificationnew/:userId" &&
          window.location.pathname !== "/Fill_Details3/:userId" &&
          window.location.pathname !== "/emailverification/:userId" &&
          window.location.pathname !== "/otpVerification/:userId" &&
          // window.location.pathname !== "/goldcard" &&
          // window.location.pathname !== "/blackcard" &&
          window.location.pathname !== "*" && <Navbar />}
        <Routes>
          {/* Homepage */}
          {/* <Route exact path="/oldHomepage" element={<Homepage />} /> */}
          <Route exact path="/" element={<Homepage2 />} />
          <Route exact path="/login" element={<Homepage2 />} />
          <Route exact path="/footer" element={<Homepage2 />} />
          <Route exact path="/logout" element={<Homepage2 />} />

          {/* Registration Page */}
          {/* <Route exact path="/fill/:userId/old" element={<Fill />} /> */}
          <Route exact path="/otpVerificationnew/:userId" element={<Fill1 />} />
          <Route exact path="/emailverification/:userId" element={<Fill2 />} />
          <Route exact path="/fill/:userId" element={<Fill3 />} />

          {/* Search Page */}
          {<Route exact path="/userlist" element={<UserList />} />}
          {
            <Route
              exact
              path="/nav"
              element={
                <div className="w-screen h-screen bg-bg-white">
                  <Navbar />
                </div>
              }
            />
          }

          {/* Make a Comment Page */}
          {/* <Route
            exact
            path="/comment/:name/:roll_no/old"
            element={<MakeAComment />}
          /> */}
          <Route
            exact
            path="/comment/:name/:roll_no"
            element={<Make_Comment />}
          />

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
          <Route exact path="/Newp1" element={<BlackCard />} />
          <Route exact path="/Newp2" element={<Page2 />} />
        </Routes>

        {/* {!loading && <Footer />} */}
      </div>
    </LoginContext.Provider>
  );
};

export default App;
