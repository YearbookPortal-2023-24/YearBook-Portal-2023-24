import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";
import { useContext, useState, useEffect } from "react";
import { LoginContext } from "../../helpers/Context";
import alumniData from "./akumniData.json";

const variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  closed: {
    opacity: 1,
    y: -20,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

function Navigation({ isOpen }) {
  const loggedin = localStorage.getItem("loggedin");
  const profile = useContext(LoginContext);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    if (isOpen) {
      
      if (!loggedin) {
        setLinks([
          { name: "Home", path: "/" },
          { name: "Change Theme", path: "/changetheme" },
          { name: "Login", path: "/login" },
          { name: "More Links", path: "/footer" },
        ]);
      } else {
        if (alumniData.includes(profile.email)) {
          setLinks([
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
          ]);
        } else {
          setLinks([
            { name: "Home", path: "/" },
            { name: "Search People", path: "/userlist" },
            {
              name: "My Profile",
              path: `/profile/${profile.roll_no}/${profile.name}`,
            },
            { name: "My Gold Card", path: "/goldcard" },
            { name: "Change Theme", path: "/changetheme" },
            { name: "More Links", path: "/footer" },
            { name: "Logout", path: "/logout" },
          ]);
        }
      }
    } else {
      
      const delay = setTimeout(() => {
        setLinks([]);
      }, 500); // 
      
      return () => clearTimeout(delay);
    }
  }, [isOpen, loggedin, profile]);

  return (
    <motion.ul
      className="z-40 p-6 absolute bottom-12 w-full flex flex-col justify-center items-start"
      variants={variants}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
    >
      {links.map((link, index) => (
        <MenuItem key={index} name={link.name} path={link.path} />
      ))}
    </motion.ul>
  );
}
export { Navigation };