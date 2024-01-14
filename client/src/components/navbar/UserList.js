import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../helpers/Context';
import axios from 'axios';
import { useContext } from 'react';
import './UserList.css';
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


const UserList = () => {
  const { loggedin, setLoggedin, user, setUser, setLoading,  verified, setVerified, profileIcon, setProfileIcon, profile, setProfile, loadingSpinner, isStudent, setIsStudent, setUserData, userData } = useContext(LoginContext);

  const [allUsers, setAllUsers] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchAcademicProgram, setSearchAcademicProgram] = useState('');
  const [searchRollNo, setSearchRollNo] = useState('');
  const { result, setResult } = useContext(LoginContext);
  const [display, setDisplay] = useState(false);

  const navigate = useNavigate();


  const loadingSpinner2 = () => {
    setLoading(true)
    const Load = async () => {
      await new Promise((r) => setTimeout(r, 7000))

      setLoading((loading) => !loading)
    }

    Load()
  }


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
    <div className="container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="form-control"
        />
        <input
          type="text"
          placeholder="Search by academic program"
          value={searchAcademicProgram}
          onChange={(e) => setSearchAcademicProgram(e.target.value)}
          className="form-control"
        />
        <input
          type="text"
          placeholder="Search by roll number"
          value={searchRollNo}
          onChange={(e) => setSearchRollNo(e.target.value)}
          className="form-control"
        />
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Academic Program</th>
            <th>Roll No</th>
          </tr>
        </thead>
        <tbody>
          {filterUsers().map((user) => (
            <tr key={user.id}>
              <td>
                <button className="profile-link" onClick={(e) => {
                                  e.preventDefault();
                                  window.localStorage.removeItem('searchedAlumni')
                                  setDisplay(false);
                                  // loadingSpinner();
                                  
                                  
                                  
                                  axios.post(process.env.REACT_APP_API_URL + '/searchword', {
                                    searchword: user.email
                                  }).then((res) => {
                                    setResult(res.data);
                                    window.localStorage.setItem('searchedAlumni', JSON.stringify(res.data));

                                  }).catch((err) => {
                                    console.log(err)
                                  })
                 navigate(`/comment/${user.name}/${user.roll_no}`)
                 loadingSpinner2();
                }
                
              }>
                   
                  {user.name}
                </button>
              </td>
              <td>{user.academic_program}</td>
              <td>{user.roll_no}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default UserList;