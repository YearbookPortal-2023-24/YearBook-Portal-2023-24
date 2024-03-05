import './makecomment.css';
import profImage from './prof.jpg';
import { commtdata } from './data';  
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../../helpers/Context";
import alumniData from "../navbar/akumniData.json";


export function MakeAComment() {
  
  const [len, setCommentlen] = useState(0);
  // const [comment, setComment] = useState("");
  const { result, user, profile, isStudent, setIsStudent, setResult } =
    useContext(LoginContext);
  const [userData, setUserData] = useState({});
  const [comment, setComment] = useState();
  const { loading, setLoading } = useContext(LoginContext);
  const [approvedComments, setApprovedComments] = useState([]);
  const [state, setState] = useState(false);
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");
  const [message2, setMessage2] = useState("");
  const alumniEmail = alumniData;
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (alumniEmail.includes(user.email)) {
      setIsStudent(false);
    } else {
      setIsStudent(true);
    }
  });
  const navigate = useNavigate();

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    if (comment === "" || comment === undefined) {
      setMessage("Comment cannot be empty");
      setTimeout(() => {
        setMessage("");
      }, 1500);
    } else {
      const confirmed = window.confirm("Are you sure you want to post this comment?");
      if(confirmed){
      if (isStudent === false) {
        await axios
          .post(process.env.REACT_APP_API_URL + "/comments", {
            comment_sender_id: profile._id,
            comment_sender_name: profile.name,
            comment_sender_roll_no: profile.roll_no,
            comment_sender_email_id: profile.email,
            comment_sender_academic_program: profile.academic_program,
            comment_reciever_id: result[0]._id,
            comment_reciever_name: result[0].name,
            comment_reciever_roll_no: result[0].roll_no,
            comment_reciever_email_id: result[0].email,
            comment_reciever_academic_program: result[0].academic_program,
            comment: comment,
            status: "new",
          })
          .then((res) => {
            console.log(res.data.message);
            setMessage("Comment Posted Successfully!");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        await axios
          .post(process.env.REACT_APP_API_URL + "/comments", {
            comment_sender_id: "",
            comment_sender_name: user.name,
            comment_sender_roll_no: "",
            comment_sender_email_id: user.email,
            comment_sender_academic_program: profile.academic_program,
            comment_reciever_id: result[0]._id,
            comment_reciever_name: result[0].name,
            comment_reciever_roll_no: result[0].roll_no,
            comment_reciever_email_id: result[0].email,
            comment_reciever_academic_program: result[0].academic_program,
            comment: comment,
            status: "new",
          })
          .then((res) => {
            console.log(res.data.message);
            setMessage("Comment Posted Successfully!");
          })
          .catch((err) => {
            console.log(err);
          });
      }

      setTimeout(() => {
        if (isStudent === true) {
          navigate("/");
        } else {
          navigate(
            `/profile/${profile.roll_no}/${profile.name}`
          );
        }
      }, 1500);
      window.localStorage.removeItem("searchAlumni");
    }
  }
  };



  // Getting Reciever's Comments
  useEffect(() => {
    if(result.length){
    axios
      .post(process.env.REACT_APP_API_URL + "/getRecieversComments",{
        comment_reciever_email_id: result[0].email,
        comment_reciever_id: result[0]._id,
        comment_reciever_roll_no: result[0].roll_no,

      })
      .then((res) => {
        if (res.data.message === "No userData found") {
          setMessage2(res.data.message);
          setComments([]);
        } else {
          // setComments(res.data.users);
          setComments(res.data.approvedComments);
          console.log(res.data.approvedComments)
          setMessage2("yes")
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  },[result]);
  
  const handleInputChange = (event) => {
    let inputstr = event.target.value;
    setCommentlen(inputstr.length);
    setComment(inputstr);
  };

  console.log(result);

  return (
    <div className="manpge fadeInUp bg-cover bg-no-repeat text-black" style={{ backgroundImage: "url('./so-white.png')" }}>
      <div className='main flex flex-row items-center justify-center'>
        <div className='main2 flex justify-center flex-col w-1/2 h-6/10 ml-0' >
           <div className='mx-auto relative top-10/4 left-10/4'>
              {result.length && (
                  <img id="ip" className='bg-white rounded-full border-2 border-black m-4' style={{ width: '170px', height: '170px' }} src={result[0].profile_img} alt="Profile" />
              )}
            </div>
            <div className="info block p-0 ">
              <div className="text-center">
                {/* Profile Data here from backend */}
                <p>{result.length && result[0].name}</p>
                <p>Roll No: {result.length && result[0].roll_no}</p>
              </div>
            </div>
        </div>
        
        <div className="flex justify-center my-20 flex-col Comment mx-10 items-center" >
            <div className='hed'>
              <h2 className="text-black  text-4xl font-semibold">Make a Comment</h2>
            </div>
            <textarea onInput={handleInputChange} value={comment} maxLength={250} rows={15} cols={50} className="txtarea"  placeholder=' Add your Comment (upto 250 characters)' style={{ height: "300px" }}>
            </textarea>
            <p className="outof text-gray-500 self-end relative bottom-8 right-12">{250-len}/250</p>
            <button  onClick={handleSubmit2} className="self-end mr-10 mt-1 w-28 rounded-2xl border-2 border-dashed border-black bg-white px-6 py-1 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"> Post! </button>
        </div>
      </div>

        <div>
          <div className='hed'>
            <h2 className="text-black text-4xl font-semibold">Approved Comments</h2>
          </div>
          <div className='flex flex-row flex-wrap mt-310'>
          {comments && comments.map((val) => {
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

export default MakeAComment;
