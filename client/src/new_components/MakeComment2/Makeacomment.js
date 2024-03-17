import "./makecomment.css";
import profImage from "./prof.jpg";
import { commtdata } from "./data";
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'
import alumniData from "../Navbar/akumniData.json";
import { LoginContext } from "../../helpers/Context";

export function Makeacomment() {
  const [len, setCommentlen] = useState(0);
  const [comment, setComment] = useState([]);
  const [user2, setUser2] = useState({});
  const [message2, setMessage2] = useState("");
  const [message, setMessage] = useState("");

  const { name, roll_no} = useParams();

  const {result, profile, isStudent, setIsStudent, user} = useContext(LoginContext)

  const navigate = useNavigate();

  // Getting Reciever's Comments
  useEffect(() => {
    if (roll_no) {
      axios
        .post(process.env.REACT_APP_API_URL + "/getRecieversComments2", {
          comment_reciever_roll_number: roll_no
        })
        .then((res) => {
          if (res.data.message === "User not found for the given roll_no") {
            navigate('/error')
            setMessage2(res.data.message);
            setComment([]);
          } else if (res.data.message === "No userData found") {
            setMessage2(res.data.message);
            setUser2(res.data.user);
            setComment([]);
          }
          else {
            setComment(res.data.approvedComments);
            setMessage2(res.data.message)
            setUser2(res.data.user)
          }

          console.log(res)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [roll_no]);

  // post a comment
  useEffect(() => {
    if (alumniData.includes(user.email)) {
      setIsStudent(false);
    } else {
      setIsStudent(true);
    }
  },[]);

  const handleSubmit2 = async (e) => {

    e.preventDefault();
      const confirmed = window.confirm("Are you sure you want to post this comment?");

      if (confirmed) {
        await axios
          .post(process.env.REACT_APP_API_URL + "/comments", {
            comment_sender_email: user.email,
            comment_reciever_roll_no: roll_no,
            isStudent: isStudent,
            comment: comment,
            status: "new",
          })
          .then((res) => {
            console.log(res.data.message);
            setMessage("Comment Posted Successfully !!");

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
  };


  const handleInputChange = (event) => {
    let inputstr = event.target.value;
    setCommentlen(inputstr.length);
    setComment(inputstr);
  };

  return (
    <div
      className="manpge fadeInUp bg-cover bg-no-repeat text-black"
      style={{ backgroundImage: "url('./so-white.png')" }}
    >
      <div class="main flex flex-row items-center justify-center">
        <div class="main2 flex justify-center flex-col w-1/2 h-6/10 ml-0">
          <div className="mx-auto relative top-10/4 left-10/4">
            <img
              src={user2.profImage}
              class="bg-white rounded-full border-2 border-black m-4"
              style={{ width: "170px", height: "170px" }}
              alt="profile"
            ></img>
          </div>
          <div className="info block p-0 ">
            <div class="text-center">
              {/* Profile Data here from backend */}
              <p>{user2.name}</p>
              <p>{user2.roll_no}</p>
            </div>
          </div>
        </div>

        <div class="flex justify-center  my-20 flex-col Comment mx-10 items-center justify-center">
          <div className="hed">
            <h2 class="text-black  text-4xl font-semibold">Make a Comment</h2>
          </div>
          <textarea
            onInput={handleInputChange}
            value={comment}
            maxLength={250}
            rows={15}
            cols={50}
            className="txtarea"
            placeholder=" Add your Comment (upto 250 characters)"
            style={{ height: "300px" }}
          ></textarea>
          <p class="outof text-gray-500 self-end relative bottom-8 right-12">
            {250 - len}/250
          </p>
          <button onClick={handleSubmit2} className="self-end mr-10 mt-1 w-[190] rounded-2xl border-2 border-dashed border-black bg-white px-6 py-1 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">
            {" "}
            Post!{" "}
          </button>
          <>{message}</>
        </div>
      </div>

      <div>
        <div class="hed">
          <h2 class="text-black text-4xl font-semibold">Approved Comments</h2>
        </div>
        <div className="flex flex-row flex-wrap mt-310">
          {/* {comment.map((val) => {
            return (
              <div className="info w-1/4 overflow-y-auto h-40">
                <p className="cmt">{val.comment} </p>
                <p className="cmt">Name: {val.name} </p>
              </div>
            );
          })} */}
        </div>
      </div>
    </div>
  );
}

export default Makeacomment;
