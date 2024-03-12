import React, { useState, useEffect, useRef } from "react";
import cloudImage from "./cloud.png";
import Xarrow from "react-xarrows";
import { motion } from "framer-motion";
import { LoginContext } from "../../helpers/Context";
import { useContext } from "react";
import "./Navbar.css";
import alumniData from "./akumniData.json";
import { Link, useNavigate } from "react-router-dom";
import crossImage from "./cross.jpg"; // Import the cross image

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Check if the screen size is mobile initially
  const containerRef = useRef(null);
  const {
    loggedin,
    setLoggedin,
    user,
    setUser,
    setLoading,
    allUsers,
    verified,
    setVerified,
    profileIcon,
    setProfileIcon,
    profile,
    setProfile,
    loadingSpinner,
    isStudent,
    setIsStudent,
    setUserData,
    userData,
  } = useContext(LoginContext);

  const navigate = useNavigate();
  const [navOpen, setNavopen] = useState(false);
  const [setSearchword] = useState("");
  // const [searchword] = useState("");
  const [wordentered, setWordentered] = useState("");
  const [wordEnteredList] = useState([]);
  // const [setWordEnteredList] = useState([]);
  const { result, setResult } = useContext(LoginContext);
  const [inputValue, setInputValue] = useState();
  const [display, setDisplay] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [example, setExample] = useState([]);
  const alumniEmail = alumniData; //geeting all the alumnis data
  const [count, setCount] = useState(0);
  const handleMenuClick = () => {
    setOpen(!open);
  };

  const handleCloseClick = () => {
    setOpen(false);
  };

  var filteredPersons = [];
  useEffect(() => {
    filteredPersons = allUsers.filter((person) => {
      return person.name.toLowerCase().startsWith(wordentered.toLowerCase());
    });

    setExample(filteredPersons.slice(0, 7));
  }, [wordentered]);

  useEffect(() => {
    if (window.localStorage.getItem("user") !== null) {
      const userLoggedIn = window.localStorage.getItem("user");
      if (userLoggedIn !== null) {
        setUser(JSON.parse(userLoggedIn));
      }
    }
    if (window.localStorage.getItem("searchedAlumni") !== null) {
      const salumni = window.localStorage.getItem("searchedAlumni");
      if (salumni !== null) {
        setResult(JSON.parse(salumni));
      }
    }
    if (window.localStorage.getItem("userData") !== null) {
      const u = window.localStorage.getItem("userData");
      if (u !== null) {
        setUserData(JSON.parse(u));
      }
    }
    const logged = window.localStorage.getItem("loggedin");
    if (logged === "true") {
      setLoggedin(true);
    } else {
      setLoggedin(false);
    }

    const profileI = window.localStorage.getItem("profileIcon");
    if (profileI === "true") {
      setProfileIcon(true);
    }

    const verify = window.localStorage.getItem("verified");
    if (verify === "true") {
      setVerified(true);
    }

    const p = window.localStorage.getItem("profile");
    if (verify === "true") {
      setProfile(JSON.parse(p));
    }
  }, []);

  const handleLogout = () => {
    setUser({});
    navigate("/");
    window.location.reload();
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("searchAlumni");
    window.localStorage.removeItem("profileIcon");
    window.localStorage.removeItem("verified");
    window.localStorage.removeItem("profile");
    setLoggedin(false);
    setProfileIcon(false);
    window.localStorage.removeItem("searchedAlumni");
    window.localStorage.removeItem("userData");
    window.localStorage.setItem("loggedin", false);
    window.localStorage.removeItem("loggedin");
    document.getElementId("google-login").hidden = false;
    // console.log('logout');
  };

  const [isMoreLinksPopupOpen, setIsMoreLinksPopupOpen] = useState(false);

  const handleMoreLinksButtonClick = () => {
    setIsMoreLinksPopupOpen(true);
  };

  const handleCloseMoreLinksPopup = () => {
    setIsMoreLinksPopupOpen(false);
  };

  const handleSearch = () => {
    navigate("/userlist", { state: { allUsers } });
    handleCloseClick();
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      {/* Three-line button */}
      <motion.button
        whileHover={{
          scale: 1.1,
          rotate: 180,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          duration: 0.2,
        }}
        style={{ borderRadius: "50%", position: "fixed", zIndex: 10 }}
        className="menu-btn text-black"
        onClick={handleMenuClick}
      >
        &#8801;
      </motion.button>

      {/* Cross button to close */}
      {open && (
        <button
          className={`close-btn ${isMobile && "mobile-hover"}`}
          onClick={handleCloseClick}
        >
          <motion.img
            whileHover={{
              scale: 1.1,
              rotate: 180,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              duration: 0.2,
            }}
            src={crossImage}
            alt="Close"
            style={{
              position: "fixed",
              top: "10px",
              right: "10px",
              width: "50px",
              zIndex: 10,
            }}
          />
        </button>
      )}

      {/* Conditionally render the container with transition */}
      <div
        className="container"
        style={{
          transform: open ? "translateX(0%)" : "translateX(100%)",
          transition: "transform 0.5s cubic-bezier(0.645, 0.045, 0.355, 1.000)",
          position: "fixed",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          background: "white",
          zIndex: 5,
        }}
        ref={containerRef}
      >
        {/* Render cloud image with text overlay only for non-mobile or when sidebar is closed */}
        {(!isMobile || !open) && (
          <div className="cloud-container">
            <img
              src={cloudImage}
              alt="Cloud"
              className="cloud-image"
              id="cloud-image"
            />
            <div className="cloud-text" id="cloud-text">
              <p>Let's us know</p>
              <p>where you want to go</p>
            </div>
          </div>
        )}

        {/* Render sidebar for mobile */}
        {isMobile && open && (
          <div className="sidebar-mobile">
            <a href="#your-link">
              <div className="sidebar-item">Change Theme</div>
            </a>
            <a href="#your-link">
              <div className="sidebar-item">
                Search and Comment on your Friends
              </div>
            </a>
            <a href="/123">
              <div className="sidebar-item">Your Profile</div>
            </a>
            <a href="#your-link">
              <div className="sidebar-item">More Links</div>
            </a>
          </div>
        )}

        {/* Render divs for laptop */}
        {!isMobile && (
          <div className="arrow-container">
            <div
              className="wiggle absolute top-24 left-60 w-36 h-24 flex items-center rounded-2xl border-2 border-dashed border-black bg-white px-6 py-1 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] hover:bg-green-500 active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
              id="top-left"
            >
              <a href="#your-link">
                <div className="text-center">Change Theme</div>
              </a>
            </div>
            <div
              className="wiggle absolute bottom-24 left-60 w-36 rounded-2xl border-2 border-dashed border-black bg-white px-6 py-1 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] hover:bg-green-500 active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
              id="bottom-left"
            >
              <a>
                <div
                  className="text-center cursor-pointer"
                  onClick={handleSearch}
                >
                  Search and comment on your friends
                </div>
              </a>
            </div>
            <div
              className="wiggle absolute top-24 right-60 w-36 h-24 cursor-pointer flex items-center justify-center rounded-2xl border-2 border-dashed border-black bg-white px-6 py-1 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] hover:bg-green-500 active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
              id="top-right"
            >
              {loggedin && profileIcon && (
                <a href="/123">
                  <div className="text-center cursor-pointer">Your Profile</div>
                </a>
              )}
              {!loggedin && (
                <a href="/login">
                  <div className="text-center cursor-pointer">Login</div>
                </a>
              )}
            </div>
            <div
              className="wiggle absolute bottom-24 right-60 w-36 h-24 flex items-center rounded-2xl border-2 border-dashed border-black bg-white px-6 py-1 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] hover:bg-green-500 active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
              id="bottom-right"
            >
              <a>
                <div
                  className="text-center cursor-pointer"
                  onClick={handleMoreLinksButtonClick}
                >
                  More Links
                </div>
              </a>
            </div>
          </div>
        )}

        <MoreLinksPopup
          isOpen={isMoreLinksPopupOpen}
          onClose={handleCloseMoreLinksPopup}
        />

        {/* Xarrows */}
        {!isMobile && (
          <>
            <Xarrow
              start="cloud-image" // ID of the cloud text element
              end="top-left" // ID of the top-left div
              color="black" // Arrow color
              strokeWidth={2} // Arrow stroke width
              curveness={0.5}
              dashness={true}
              headColor="blue"
            />
            <Xarrow
              start="cloud-image" // ID of the cloud text element
              end="bottom-left" // ID of the bottom-left div
              color="black" // Arrow color
              strokeWidth={2} // Arrow stroke width
              curveness={0.5}
              dashness={true}
              headColor="blue"
            />
            <Xarrow
              start="cloud-image" // ID of the cloud text element
              end="top-right" // ID of the top-right div
              color="black" // Arrow color
              strokeWidth={2} // Arrow stroke width
              curveness={0.3}
              dashness={true}
              headColor="blue"
            />
            <Xarrow
              start="cloud-image" // ID of the cloud text element
              end="bottom-right" // ID of the bottom-right div
              color="black" // Arrow color
              strokeWidth={2} // Arrow stroke width
              curveness={0.5}
              dashness={true}
              headColor="blue"
            />
          </>
        )}
      </div>
    </div>
  );
};

const MoreLinksPopup = ({ isOpen, onClose }) => {
  const {
    loggedin,
    setLoggedin,
    user,
    setUser,
    setLoading,
    allUsers,
    verified,
    setVerified,
    profileIcon,
    setProfileIcon,
    profile,
    setProfile,
    loadingSpinner,
    isStudent,
    setIsStudent,
    setUserData,
    userData,
  } = useContext(LoginContext);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".popup-content")) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="text-lg text-black font-bold mb-4">More Links</div>
        <div className="grid gap-2">
          {loggedin && profileIcon && (
            <button className="w-auto h-auto flex items-center rounded-2xl border-2 border-dashed border-black bg-white px-6 py-1 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] hover:bg-green-500 active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">
              Logout
            </button>
          )}
        </div>
        <button
          onClick={onClose}
          className="w-auto flex items-center justify-center rounded-2xl border-2 border-dashed border-red-500 bg-white px-6 py-1 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] hover:bg-red-500 active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Navbar;
