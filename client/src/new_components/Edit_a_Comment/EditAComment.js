


// -----------------------------------------------------------------------------------------------------------------

// import React, { useContext, useEffect, useState } from "react";
// import { LoginContext } from "../../helpers/Context";
// import "./EditAComment.css";
// import Card from "react-bootstrap/Card";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import alumniData from "../../components/navbar/akumniData.json";
// // import Navbar from '../navbar/navbar'
// import { useParams } from 'react-router-dom';

// const EditAComment = () => {
//   const { result, user, profile, isStudent, setIsStudent, setResult } =
//     useContext(LoginContext);
//   const [userData, setUserData] = useState({});
//   const [comment, setComment] = useState();
//   const { loading, setLoading } = useContext(LoginContext);
//   const [approvedComments, setApprovedComments] = useState([]);
//   const [state, setState] = useState(false);
//   const [comments, setComments] = useState([]);
//   const [message, setMessage] = useState("");
//   const [message2, setMessage2] = useState("");
//   const alumniEmail = alumniData;
//   const [count, setCount] = useState(0);
//   useEffect(() => {
//     if (alumniEmail.includes(user.email)) {
//       setIsStudent(false);
//     } else {
//       setIsStudent(true);
//     }
//   });
//   const navigate = useNavigate();

//   const handleSubmit2 = async (e) => {
//     e.preventDefault();
//     if (comment === "" || comment === undefined) {
//       setMessage("Comment cannot be empty");
//       setTimeout(() => {
//         setMessage("");
//       }, 1500);
//     } else {
//       const confirmed = window.confirm("Are you sure you want to post this comment?");
//       if(confirmed){
//       if (isStudent === false) {
//         await axios
//           .post(process.env.REACT_APP_API_URL + "/comments", {
//             comment_sender_id: profile._id,
//             comment_sender_name: profile.name,
//             comment_sender_roll_no: profile.roll_no,
//             comment_sender_email_id: profile.email,
//             comment_sender_academic_program: profile.academic_program,
//             comment_reciever_id: result[0]._id,
//             comment_reciever_name: result[0].name,
//             comment_reciever_roll_no: result[0].roll_no,
//             comment_reciever_email_id: result[0].email,
//             comment_reciever_academic_program: result[0].academic_program,
//             comment: comment,
//             status: "new",
//           })
//           .then((res) => {
//             console.log(res.data.message);
//             setMessage("Comment Posted Successfully !!");
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       } else {
//         await axios
//           .post(process.env.REACT_APP_API_URL + "/Comments", {
//             comment_sender_id: "",
//             comment_sender_name: user.name,
//             comment_sender_roll_no: "",
//             comment_sender_email_id: user.email,
//             comment_sender_academic_program: profile.academic_program,
//             comment_reciever_id: result[0]._id,
//             comment_reciever_name: result[0].name,
//             comment_reciever_roll_no: result[0].roll_no,
//             comment_reciever_email_id: result[0].email,
//             comment_reciever_academic_program: result[0].academic_program,
//             comment: comment,
//             status: "new",
//           })
//           .then((res) => {
//             console.log(res.data.message);
//             setMessage("Comment Posted Successfully !!");
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       }

//       setTimeout(() => {
//         if (isStudent === true) {
//           navigate("/");
//         } else {
//           navigate(
//             `/profile/${profile.roll_no}/${profile.name}`
//           );
//         }
//       }, 1500);
//       window.localStorage.removeItem("searchAlumni");
//     }
//   }
//   };


//   // // Getting Reciever's Comments
//   // useEffect(() => {
//   //   if(result.length>0){
//   //   axios
//   //     .post(process.env.REACT_APP_API_URL + "/getRecieversComments",{
//   //       comment_reciever_email_id: result[0].email
//   //     })
//   //     .then((res) => {
//   //       if (res.data.message === "No userData found") {
//   //         setMessage2(res.data.message);
//   //         setComments([]);
//   //       } else {
//   //         setComments(res.data.users);
//   //         setMessage2(res.data.message)
//   //       }
//   //     })
//   //     .catch((err) => {
//   //       console.log(err);
//   //     });
//   //   }
//   // },[result]);


//   // useEffect(()=>{
//   //   if (window.localStorage.getItem('searchedAlumni') !== null) {
//   //     const salumni = window.localStorage.getItem('searchedAlumni');
//   //     if (salumni !== null) {
//   //       console.log(salumni)
//   //       setResult(JSON.parse(salumni));
//   //       console.log(JSON.parse(salumni))
//   //       console.log(result)
//   //     }
//   //   }
//   // },[])

//   // console.log(result)

//   const { name } = useParams();

//   console.log("Data related to edit comment",name)

//   // Split the string using the hyphen as a delimiter
// const parts = name.split('-');

// // Extract parts
// const comment_reciever_id_edit = parts[0];
// const comment_id_edit = parts[1];
// const commentFromUrl=parts[2];

// console.log("Part before hyphen:", comment_reciever_id_edit);
// console.log("Part after hyphen1:", comment_id_edit);
// console.log("Part after hyphen2:", commentFromUrl);




// // const [editComments,setEditComments]=useState(commentFromUrl);
// const [editComments,setEditComments]=useState(commentFromUrl || '');
// const [editCommentsUser,setEditCommentsUser]=useState(null);




// // Getting Receiver's Edit Comments
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       if (comment_reciever_id_edit && comment_id_edit) {
//         const response = await axios.post(
//           process.env.REACT_APP_API_URL + "/getEditCommentsInfo",
//           {
//             comment_reciever_id_edit: comment_reciever_id_edit,
//             comment_id_edit: comment_id_edit,
//           }
//         );

//         const data = response.data;

//         if (data.message === "No userData found") {
//           setMessage2(data.message);
//           setEditComments([]);
//           setEditCommentsUser(null);
//         } else {
//           setEditComments(data.comment);
//           setMessage2(data.message);
//           setEditCommentsUser(data.user);
//           // console.log('editCommentsUser:', data.user);
//         }
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   fetchData();
// }, [comment_reciever_id_edit, comment_id_edit]);


// const handleSubmitedit = async (e) => {
//   e.preventDefault();

//   if (editComments === "" || editComments === undefined) {
//     setMessage("Comment cannot be empty");
//     setTimeout(() => {
//       setMessage("");
//     }, 1500);
//   } else {
//     const confirmed = window.confirm("Are you sure you want to edit this comment?");

//     if (confirmed) {
//       try {

//         const res = await axios.post(process.env.REACT_APP_API_URL + "/editComment", {
//           comment:editComments,
//           comment_reciever_id_edit: comment_reciever_id_edit,
//           comment_id_edit: comment_id_edit,
//         });



//         console.log("all Data" ,res.data.message);

//       } catch (err) {
//         console.log(err);
//       }
//     }
//   }
// };






//   return (
//     <>
//        {loading && (
//       <div className="spinner">
//         <span class="loader"></span>
//       </div>
//     )}
//     {!loading && (
//       <div className="containermc">
//         <style>
//           @import
//           url('https://fonts.googleapis.com/css2?family=Quantico&display=swap');
//         </style>
//         <div className="container2">
//           <div className="left1" id="named">
//             <div className="dota">
//               {editCommentsUser && (
//                 <img id="ip" src={editCommentsUser.profile_img} alt="err" />
//               )}
//             </div>
//             {editCommentsUser && (
//               <div className="description" id="desc">
//                 <h2>{editCommentsUser.name}</h2>

//                 <h3 style={{ color: "white" }}>
//                   Roll No: {editCommentsUser.roll_no}
//                 </h3>
//                 <h4 style={{ color: "white" }}>
//                   {editCommentsUser.academic_program}, {editCommentsUser.department}
//                 </h4>
//                 <h3 style={{ color: "white" }}>{editCommentsUser.about}</h3>
//               </div>
//             )}
//           </div>

//             <div className="right1">
//               <h1 id="make">Edit Your Comment</h1>
//               <form>
//                 <textarea
//                   name="comment"
//                   id="commenttext"
//                   cols="85"
//                   rows="25"
//                   placeholder={commentFromUrl}
//                   // placeholder="Previous Comment should display here"
//                   value={editComments}
//                   onChange={(e) => {
//                     setEditComments(e.target.value);
//                   }}
//                 />
//                 <br />
//                 <button
//                   type="submit"
//                   id="post"
//                   onClick={handleSubmitedit}
//                   style={{
//                     color: "white",
//                     float: "right",
//                     background: state ? "#838080" : "#3E185C",
//                   }}
//                   disabled={state}
//                 >
//                   UPDATE!
//                 </button>
//               </form>
//               <h2>{message}</h2>
//             </div>
//           </div>

//           <div id="apcomments">
//             <div style={{ display: "inline" }}>
//               <h1 id="make">Approved Comments</h1>
//             </div>
//             <div id="cards-container">
//               {message2 !== "No userData found" && (

//                   comments.map((val) =>
//                           <Card id='commentcard'
//                             style={{

//                             }}
//                           >
//                             <Card.Img variant="top" />
//                             <Card.Body>
//                               <Card.Text style={{ paddingBottom: "1rem" }}>
//                                 {val.comment}
//                               </Card.Text>
//                               <p id="name" style={{ paddingBottom: "0rem" }}>
//                                 By {val.name}
//                               </p>
//                             </Card.Body>
//                           </Card>
//                 ))
//               }
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default EditAComment;

// ----------------------------------------------------------------------------------------------




import './EditAComment.css';
import profImage from './prof.jpg';
import { commtdata } from './data';
// import { useState } from "react";
import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../helpers/Context";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import alumniData from "../Navbar/akumniData.json";
// import Navbar from '../navbar/navbar'
import { useParams } from 'react-router-dom';


export function Editacomment() {
  const {
    user,
    loading,
    setLoading,
    setProfile,
    item,
    setItem,
    loggedin,
    setLoggedin,
  } = useContext(LoginContext);

  const profile = JSON.parse(window.localStorage.getItem('profile'))
  const [message, setMessage] = useState("");
  const [message2, setMessage2] = useState("");
  const [len, setCommentlen] = useState(0);
  const [comment, setComment] = useState("");

  const handleInputChange = (event) => {
    let inputstr = event.target.value;
    setCommentlen(inputstr.length);
    setComment(inputstr);
  };

  const { userId, commentId } = useParams();

  // console.log("Data related to edit comment", userId)
  // console.log("Data related to edit comment", commentId)



  const comment_reciever_id_edit = userId;
  const comment_id_edit = commentId;


  // console.log("comment_reciever_id_edit", comment_reciever_id_edit);
  // console.log("comment_id_edit:", comment_id_edit);


  const [editComments, setEditComments] = useState();
  // const [editComments, setEditComments] = useState(commentFromUrl || '');
  const [editCommentsUser, setEditCommentsUser] = useState(null);
  // console.log("++++", editComments)
  // console.log("++++",editComments.comment_sender[0].comment)

  // Getting Receiver's Edit Comments
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (comment_reciever_id_edit && comment_id_edit) {
          const response = await axios.post(
            process.env.REACT_APP_API_URL + "/getEditCommentsInfo",
            {
              comment_reciever_id_edit: comment_reciever_id_edit,
              comment_id_edit: comment_id_edit,
            }
          );

          const data = response.data;

          if (data.message === "No userData found") {
            setMessage2(data.message);
            setEditComments('');
            setEditCommentsUser(null);
          } else {
            setEditComments(data.comment.comment_sender[0].comment);
            setMessage2(data.message);
            setEditCommentsUser(data.user);
            // console.log('editCommentsUser:', data.user);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [comment_reciever_id_edit, comment_id_edit]);

  const handleSubmitedit = async (e) => {
    e.preventDefault();

    if (editComments === "" || editComments === undefined) {
      toast("Comment cannot be empty!", {
        theme: "dark",
        autoClose: 3000,
      });
    } else {
      const confirmed = window.confirm("Are you sure you want to edit this comment?");

      if (confirmed) {
        try {

          const res = await axios.post(process.env.REACT_APP_API_URL + "/editComment", {
            comment: editComments,
            comment_reciever_id_edit: comment_reciever_id_edit,
            comment_id_edit: comment_id_edit,
          });



          // console.log("all Data", res.data.message);
          toast("Comment Edited Successfully!", {
            theme: "dark",
            autoClose: 1500,
          });
          const timetonavigate = setTimeout(() => {
            navigate(`/profile/${profile.roll_no}/${profile.name}`);
          }, 2000); // delay execution by 2 second

          return () => clearTimeout(timetonavigate);
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  const comment_reciever_id = userId;
  const [approvedComments, setApprovedComments] = useState([]);
  const navigate = useNavigate();


  // Getting Reciever's Comments
  useEffect(() => {
    if (comment_reciever_id) {
      axios
        .post(process.env.REACT_APP_API_URL + "/getRecieversComments", {
          // comment_reciever_email_id: profile.email,
          comment_reciever_roll_no: comment_reciever_id
        })
        .then((res) => {
          if (res.data.message === "No users found") {
            setMessage2(res.data.message);
            // setMyComments([]);
            setApprovedComments([]);
          } else {
            // setMyComments(res.data.user2);
            // setApprovedComments(res.data.users)
            // Assuming the response contains an 'approvedComments' array
            // const approvedComments = res.data.approvedComments;
            const approvedComments = res.data.user2;
            console.log("Approved Comments:", approvedComments);
            // console.log("New Comments:", res.data.user2);
            setApprovedComments(approvedComments);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [comment_reciever_id]);


  return (
    <div className="manpge fadeInUp bg-cover bg-no-repeat text-black" style={{ backgroundImage: "url('./so-white.png')" }}>
      <ToastContainer />
      <div class='main flex flex-row items-center justify-center'>
        <div class='main2 flex justify-center flex-col w-1/2 h-6/10 ml-0' >
          <div className='mx-auto relative top-10/4 left-10/4'>
            {editCommentsUser && (
              <img src={editCommentsUser.profile_img} class='bg-white rounded-full border-2 border-black m-4' style={{ width: '170px', height: '170px' }}
                alt='profile'></img>
            )}
          </div>
          {editCommentsUser && (
            <div className="info block p-0 ">
              <div class="text-center">
                {/* Profile Data here from backend */}
                <p>{editCommentsUser.name}</p>
                <p>Roll No: {editCommentsUser.roll_no}</p>
                <p>  {editCommentsUser.academic_program}, {editCommentsUser.department}</p>
                <p>  {editCommentsUser.about}</p>
              </div>
            </div>
          )}
        </div>

        <div class="flex justify-center  my-20 flex-col Comment mx-10 items-center" >
          <div className='hed'>
            <h2 class="text-black  text-4xl font-semibold">Edit Your Comment</h2>
          </div>
          <form className='flex flex-col items-center justify-center'>
            <textarea onInput={handleInputChange} value={editComments} maxLength={250} rows={15} cols={50} className="txtarea"
              placeholder=' Add your Comment (upto 250 characters)' style={{ height: "300px" }}
              onChange={(e) => {
                setEditComments(e.target.value);
              }}
            >
            </textarea>
            <p class="text-gray-500 self-end relative">{250 - len}/250</p>
            <button className="self-end mt-1 rounded-2xl border-2 border-dashed border-black bg-white px-6 py-1 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
              onClick={handleSubmitedit}
            > Update Comment </button>
          </form>
          <h2>{message}</h2>
        </div>
      </div>

      <div>
        <div class='hed'>
          <h2 class="text-black text-4xl font-semibold">Approved Comments</h2>
        </div>
        <div className='flex flex-row flex-wrap mt-310'>
          {approvedComments.map((val) => {
            return (
              <div className='info w-1/4 overflow-y-auto h-40'>
                <p className="cmt">{val.comment} </p>
                <p className="cmt">Name: {val.name} </p>
              </div>

            );
          })}
        </div>
      </div>
    </div>

  );
}

export default Editacomment;
