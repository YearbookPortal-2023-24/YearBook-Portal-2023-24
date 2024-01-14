import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
// import { useRouteLoaderData } from "react-router-dom";
import './Navbar.scss';
import { LoginContext } from '../../helpers/Context';
import { useContext } from 'react';
import axios from 'axios';
import alumniData from './akumniData.json'
import { motion } from 'framer-motion'

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react';
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons';
// import { json } from 'react-router';
import bcrypt from 'bcryptjs';


const Navbar = () => {

  const variants = {
    open: { y: 0, transition: {} },
    closed: { y: "-96%" },
  }

  const { loggedin, setLoggedin, user, setUser, setLoading, allUsers, verified, setVerified, profileIcon, setProfileIcon, profile, setProfile, loadingSpinner, isStudent, setIsStudent, setUserData, userData } = useContext(LoginContext);

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
  const [isOpen, setIsOpen] = useState(false)
  const [example, setExample] = useState([]);
  const alumniEmail = alumniData; //geeting all the alumnis data
  const [count, setCount] = useState(0)


  //Use ReactFilter
  var filteredPersons = []
  useEffect(() => {
    filteredPersons = allUsers.filter(
      person => {
        return (
          person
            .name
            .toLowerCase()
            .startsWith(wordentered.toLowerCase())
        );
      }
    );

    setExample(filteredPersons.slice(0,7));
  }, [wordentered])


  //loading spinner function
  const loadingSpinner2 = () => {
    setLoading(true)
    const Load = async () => {
      await new Promise((r) => setTimeout(r, 7000))

      setLoading((loading) => !loading)
    }

    Load()
  }

  //After refreshing the page user is still signed in 
  useEffect(() => {

    if (window.localStorage.getItem('user') !== null) {
      const userLoggedIn = window.localStorage.getItem('user');
      if (userLoggedIn !== null) {
        setUser(JSON.parse(userLoggedIn));
      }
    }
    if (window.localStorage.getItem('searchedAlumni') !== null) {
      const salumni = window.localStorage.getItem('searchedAlumni');
      if (salumni !== null) {
        setResult(JSON.parse(salumni));
      }
    }
    if (window.localStorage.getItem('userData') !== null) {
      const u = window.localStorage.getItem('userData');
      if (u !== null) {
        setUserData(JSON.parse(u));
      }
    }
    const logged = (window.localStorage.getItem('loggedin'));
    if (logged === "true") {
      setLoggedin(true);
    }
    else {
      setLoggedin(false);
    }

    const profileI = (window.localStorage.getItem('profileIcon'));
    if (profileI === "true") {
      setProfileIcon(true);
    }

    const verify = (window.localStorage.getItem('verified'));
    if (verify === 'true') {
      setVerified(true);
    }

    const p = (window.localStorage.getItem('profile'));
    if (verify === "true") {
      setProfile(JSON.parse(p));
    }

  },[])

  // console.log(loggedin);
  // console.log(verified);

  //Logout Function
  const handleLogout = () => {
    setUser({});
    navigate('/');
    window.location.reload();
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('searchAlumni');
    window.localStorage.removeItem('profileIcon');
    window.localStorage.removeItem('verified');
    window.localStorage.removeItem('profile')
    setLoggedin(false);
    setProfileIcon(false);
    window.localStorage.removeItem('searchedAlumni');
    window.localStorage.removeItem('userData');
    window.localStorage.setItem('loggedin', false)
    window.localStorage.removeItem('loggedin')
    document.getElementId("google-login").hidden = false;

    // console.log('logout');


  }

  //adding sidebar on smaller screens
  const handleNavbar = () => {
    setNavopen(!navOpen)
  };
  const handleDropdownclick = (e) => {
    e.stopPropagation();
  };
  const handleNavopen = () => {
    if (navOpen) {
      setNavopen(!navOpen)
    }
  };
  const renderNav = () => {
    if (navOpen) {
      return "links active"
    } else {
      return "links deactivate";
    }
  }


  // Token Generation 

  const token = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  };

  if (loggedin === true) {
    document.getElementById("google-login").hidden = true;
  }



  if (alumniEmail.includes(user.email)) {
    setIsStudent(false);
  }
  else {
    setIsStudent(true);
  }

  const searchAWord = (event) => {
    setWordentered(event.target.value);
    setInputValue(event.target.value);
  }
  const handleSearchButtonClick = () => {
    // Pass all data to UserList page
    navigate(`/userlist?allUsers=${encodeURIComponent(JSON.stringify(allUsers))}`);
  };


  return (
    <>
      <div className='navbar-laptop'>
        <div className="overflow-x-hidden" id='abd'>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Quantico&display=swap');
          </style>
          <div className='header22'>
            <img src='/images/1.png' alt='err' />
            <div className='navbar'>
              <ul>
                <div onClick={handleNavopen} className={renderNav()}>
                  <Link id='av' to="/">HOME</Link>
                  <Link id='av' to="/about">ABOUT</Link>
                  <Link id='av' to="/team">DEVELOPERS</Link>
                  {loggedin &&
                    <>
                      {(profileIcon) ?
                        <div id='contain'>
                          <Menu>
                            <MenuButton as={Button} w='29%' ml={2} rightIcon={<ChevronDownIcon />}>
                              <img src="../../../images/profile.jpg" alt="" id='profilepic' />
                            </MenuButton>
                            <MenuList>
                              <><Link id='avl' to={`profile/${profile._id}/${profile.name}/${token(32)}`}>
                                <MenuItem id='avl' bgColor={'#4d1a6c'}>My Profile</MenuItem></Link></>
                              <MenuItem bgColor={'#4d1a6c'} onClick={handleLogout}>Sign Out</MenuItem>
                            </MenuList>
                          </Menu>
                        </div> :
                        <>
                          <button id='logout' onClick={handleLogout}>Sign Out</button>
                        </>
                      }
                    </>}
                  {loggedin && profileIcon && <><button
                    className={renderNav()} onClick={handleLogout}>SIGN OUT</button></>}
                  {loggedin && profileIcon && <button id='prof' className={renderNav()}><Link to={`profile/${profile._id}/${profile.name}/${token(32)}`}>PROFILE</Link></button>}
                </div>

                <div onClick={handleNavbar} className="hamburger-toggle">
                  <HamburgerIcon />
                </div>

                <div id='google-login'>
                </div>

                <>
                {loggedin && (
            <div className="searchr" style={{ width: '70%', display: "flex" }}>
              {/* Render the button, but make it disabled when certain conditions are not met */}
              <button
                id='av'
                onClick={handleSearchButtonClick}
                disabled={!isStudent && !verified}
              >
                SEARCH
              </button>
            </div>
          )}
                </>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}



export default Navbar;
