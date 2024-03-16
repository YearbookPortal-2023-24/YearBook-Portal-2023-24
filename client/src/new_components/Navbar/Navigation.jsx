import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";
import { useContext } from "react";
import { LoginContext } from "../../helpers/Context";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

var links = [];

function Navigation() {
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
  console.log(loggedin);
  console.log(user);
  console.log(profile);
  console.log(`/profile/${profile.roll_no}/${profile.name}`);

  if (!loggedin) {
    links = [
      { name: "Home", path: "/" },
      { name: "Change Theme", path: "/changetheme" },
      { name: "Login", path: "/login" },
      { name: "More Links", path: "/footer" },
    ];
  } else {
    links = [
      { name: "Home", path: "/" },
      { name: "Search People", path: "/userlist" },
      {
        name: "My Profile",
        path: `/profile/${profile.roll_no}/${profile.name}`,
      },
      { name: "My Black Card", path: "/blackcard" },
      { name: "Change Theme", path: "/changetheme" },
      { name: "More Links", path: "/footer" },
      { name: "Logout", path: "/logout" },
    ];
  }
  return (
    <motion.ul
      className="z-40 p-6 absolute bottom-12 w-full flex flex-col justify-center items-start"
      variants={variants}
    >
      {links.map((link, index) => (
        <MenuItem key={index} name={link.name} path={link.path} />
      ))}
    </motion.ul>
  );
}

export { Navigation };
