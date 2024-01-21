import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../helpers/Context';
import axios from 'axios';
import { useContext } from 'react';
import { motion } from 'framer-motion';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react';
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons';
import bcrypt from 'bcryptjs';

const UserList = () => {
  const {
    loggedin,
    setLoggedin,
    user,
    setUser,
    setLoading,
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

  const [allUsers, setAllUsers] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchAcademicProgram, setSearchAcademicProgram] = useState('');
  const [searchRollNo, setSearchRollNo] = useState('');
  const { result, setResult } = useContext(LoginContext);
  const [display, setDisplay] = useState(false);

  const navigate = useNavigate();

  const loadingSpinner2 = () => {
    setLoading(true);
    const Load = async () => {
      await new Promise((r) => setTimeout(r, 7000));
      setLoading((loading) => !loading);
    };

    Load();
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const allUsersParam = params.get('allUsers');

    if (allUsersParam) {
      const parsedData = JSON.parse(decodeURIComponent(allUsersParam));
      setAllUsers(parsedData);
    }
  }, []);

  const filterUsers = () => {
    return allUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchName.toLowerCase()) &&
        user.academic_program.toLowerCase().includes(searchAcademicProgram.toLowerCase()) &&
        user.roll_no.toLowerCase().includes(searchRollNo.toLowerCase())
    );
  };

  return (
    <div className="container p-4">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="flex-1 mr-4 p-2 border"
        />
        <input
          type="text"
          placeholder="Search by academic program"
          value={searchAcademicProgram}
          onChange={(e) => setSearchAcademicProgram(e.target.value)}
          className="flex-1 mr-4 p-2 border"
        />
        <input
          type="text"
          placeholder="Search by roll number"
          value={searchRollNo}
          onChange={(e) => setSearchRollNo(e.target.value)}
          className="flex-1 p-2 border"
        />
      </div>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border p-2 text-center">Name</th>
            <th className="border p-2 text-center">Academic Program</th>
            <th className="border p-2 text-center">Roll No</th>
          </tr>
        </thead>
        <tbody>
          {filterUsers().map((user, index) => (
            <tr
              key={user.id}
              className={`${
                index % 2 === 0 ? 'bg-slate-950' : 'bg-slate-950'
              } hover:bg-slate-500 transition-all`}
            >
              <td className="border p-2">
                <button
                  className={`profile-link text-white hover:text-blue-500	`}
                  onClick={(e) => {
                    e.preventDefault();
                    window.localStorage.removeItem('searchedAlumni');

                    axios
                      .post(process.env.REACT_APP_API_URL + '/searchword', {
                        searchword: user.email,
                      })
                      .then((res) => {
                        setResult(res.data);
                        window.localStorage.setItem(
                          'searchedAlumni',
                          JSON.stringify(res.data)
                        );
                      })
                      .catch((err) => {
                        console.log(err);
                      });

                    // Check if the current user is the logged-in user
                    const isCurrentUser = user.email === profile.email;

                    // Generate the correct profile link based on the user
                    const profileLink = isCurrentUser
                      ? `/profile/${profile.roll_no}/${profile.name}`
                      : `/userlist/profile/${user.roll_no}/${user.name}`;
                      

                    // Use the correct profile link for navigation
                    navigate(`/comment/${user.name}/${user.roll_no}`);
                    loadingSpinner2();

                    // If the clicked user is the logged-in user, navigate to their profile
                    if (isCurrentUser) {
                      navigate(profileLink);
                      loadingSpinner2();
                    }
                  }}
                >
                  {user.name}
                </button>
              </td>
              <td className="border p-2 text-center">{user.academic_program}</td>
              <td className="border p-2 text-center">{user.roll_no}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
