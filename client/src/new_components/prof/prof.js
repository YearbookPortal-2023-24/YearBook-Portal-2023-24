import React, { useContext, useEffect, useState } from "react";
import "./prof.css";
import axios from "axios";
import { LoginContext } from "../../helpers/Context";
import { useNavigate, useParams } from "react-router-dom";

export const Prof = () => {
  const { user, loading, setLoading, profile } = useContext(LoginContext);
  const [state, setState] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [imageSelected, setImageSelected] = useState(false);
  const [message, setMessage] = useState("");
  const [imageadded, setImageadded] = useState(false);
  const [wait, setWait] = useState(false);
  const navigate = useNavigate();
  const [newComments, setNewComments] = useState([]);
  const [message2, setMessage2] = useState("");

  const { roll } = useParams();
  if (roll !== profile.roll_no) {
    window.location.href = `/profile/${profile.roll_no}/${profile.name}`;
  }

  // Getting Reciever's Comments
  useEffect(() => {
    if (profile.email && profile._id) {
      axios
        .post(process.env.REACT_APP_API_URL + "/getRecieversComments", {
          comment_reciever_email_id: profile.email,
          comment_reciever_id: profile._id,
        })
        .then((res) => {
          if (res.data.message === "No users found") {
            setMessage2(res.data.message);
            setNewComments([]);
          } else {
            setNewComments(res.data.user2);
            console.log("New Comments:", res.data.user2);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [profile]);
  const approvedComment = [
    {
      comment: "aiwqhosanlqlnqwlndqdlqwnqwndq",
      name: "XYZ",
    },

    {
      comment:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam veniam dicta mollitia voluptate commodi quae culpa tempora officiis? Non reprehenderit omnis ex commodi! Neque, corrupti facere. Cum officia error et.",
      name: "XYZ",
    },
  ];

  const newcomment = [
    {
      comment: "aiwqhosanlqlnqwlndqdlqwnqwndq",
      name: "XYZ",
    },
    {
      comment: "aiwqhosanlqlnqwlndqdlqwnqwndq",
      name: "XYZ",
    },
    {
      comment: "aiwqhosanlqlnqwlndqdlqwnqwndq",
      name: "XYZ",
    },
    {
      comment: "aiwqhosanlqlnqwlndqdlqwnqwndq",
      name: "XYZ",
    },
    {
      comment: "aiwqhosanlqlnqwlndqdlqwnqwndq",
      name: "XYZ",
    },
    {
      comment: "aiwqhosanlqlnqwlndqdlqwnqwndq",
      name: "XYZ",
    },

    {
      comment:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam veniam dicta mollitia voluptate commodi quae culpa tempora officiis? Non reprehenderit omnis ex commodi! Neque, corrupti facere. Cum officia error et.",
      name: "XYZ",
    },
  ];

  const MyComment = [
    {
      comment: "aiwqhosanlqlnqwlndqdlqwnqwndq",
      name: "XYZ",
    },

    {
      comment:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam veniam dicta mollitia voluptate commodi quae culpa tempora officiis? Non reprehenderit omnis ex commodi! Neque, corrupti facere. Cum officia error et.",
      name: "XYZ",
    },
    {
      comment:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam veniam dicta mollitia voluptate commodi quae culpa tempora officiis? Non reprehenderit omnis ex commodi! Neque, corrupti facere. Cum officia error et.",
      name: "XYZ",
    },
    {
      comment:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam veniam dicta mollitia voluptate commodi quae culpa tempora officiis? Non reprehenderit omnis ex commodi! Neque, corrupti facere. Cum officia error et.",
      name: "XYZ",
    },
    {
      comment:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam veniam dicta mollitia voluptate commodi quae culpa tempora officiis? Non reprehenderit omnis ex commodi! Neque, corrupti facere. Cum officia error et.",
      name: "XYZ",
    },
    {
      comment:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam veniam dicta mollitia voluptate commodi quae culpa tempora officiis? Non reprehenderit omnis ex commodi! Neque, corrupti facere. Cum officia error et.",
      name: "XYZ",
    },
    {
      comment:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam veniam dicta mollitia voluptate commodi quae culpa tempora officiis? Non reprehenderit omnis ex commodi! Neque, corrupti facere. Cum officia error et.",
      name: "XYZ",
    },
    {
      comment:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam veniam dicta mollitia voluptate commodi quae culpa tempora officiis? Non reprehenderit omnis ex commodi! Neque, corrupti facere. Cum officia error et.",
      name: "XYZ",
    },
    {
      comment:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam veniam dicta mollitia voluptate commodi quae culpa tempora officiis? Non reprehenderit omnis ex commodi! Neque, corrupti facere. Cum officia error et.",
      name: "XYZ",
    },
    {
      comment:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam veniam dicta mollitia voluptate commodi quae culpa tempora officiis? Non reprehenderit omnis ex commodi! Neque, corrupti facere. Cum officia error et.",
      name: "XYZ",
    },
  ];

  const [approvedComments, setApprovedComments] = useState(approvedComment);
  const [comments, setComments] = useState(newcomment);
  const [myComments, setMyComments] = useState(MyComment);

  // const approveComment = (index) => {
  //   const approvedComment = myComments[index];
  //   setApprovedComments([...approvedComments, approvedComment]);
  //   setMyComments(myComments.filter((_, i) => i !== index));
  // };

  // const rejectComment = (index) => {
  //   setMyComments(myComments.filter((_, i) => i !== index));
  // };

  const removeApprovedComment = (index) => {
    setApprovedComments(approvedComments.filter((_, i) => i !== index));
  };

  const HandlEdit = (val) => {
    console.log("Clicked on edit");
    navigate(`/comment/edit/${val.user_comment_reciever_id}/${val.comment_id}`);
    // navigate(`/comment/edit/${val.user_comment_reciever_id}-${val.comment_id}-${val.comment}`);
  };

  return (
    <div>
      <div className="containerls py-20">
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.0.1/css/font-awesome.min.css"
        ></link>
        <div className="container2ls ">
          <div class="comm1 fadeInLeft">
            <div>
              <h1 id="cmtm">Approved Comments</h1>
            </div>
            <div id="commentsscroll">
              {approvedComments && approvedComments.length !== 0 && (
                <>
                  {approvedComments.map((val, index) => (
                    <div id="comment">
                      <p id="commentp">{val.comment}</p>
                      <p id="commentby">-{val.name}</p>
                      <button
                        id="ogout2"
                        className="rounded-2xl border-2 border-dashed border-black bg-white px-6 py-1 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
                        onClick={() => {
                          const ans = window.confirm(
                            "Are you sure you want to remove your Approved Comment?"
                          );
                          if (ans) {
                            removeApprovedComment(index);
                          }
                        }}
                      >
                        Remove Comment
                      </button>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
          <div className="profle fadeInRight">
            <div className="dotsl">
              {/* <img className="ipp" id="ip" src={profile.profile_img} /> */}
            </div>
            <br></br>
            <br></br>
            <div className="about1"></div>
            <div className="edit">
              <button
                style={{ width: "30%", color: "white" }}
                //   onClick={editProfile}
                id="edti"
                className="mr-2 rounded-2xl border-2 border-dashed border-black bg-white px-6 py-1 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
                onClick={() => {
                  const ans = window.confirm(
                    "Are you sure you want to edit your Profile?"
                  );
                  if (ans) {
                    ///////////////////////
                    // Navigate to edit profile/
                    ///////////////////////
                  }
                }}
              >
                EDIT YOUR PROFILE
              </button>
              <input
                type="file"
                id="memo"
                // onChange={(event) => {
                //   setImageSelected(event.target.files[0]);
                // }}
              ></input>
              <button
                id="upd2"
                className="rounded-2xl border-2 border-dashed border-black bg-white px-6 py-0 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
                //   onClick={uploadImage}
              >
                Upload Memories Image
              </button>
            </div>
            {wait && <p>Wait... while Image is Uploading</p>}
            {imageUploaded && imageadded && <p>{message}</p>}
          </div>
        </div>

        <div className="container2sl">
          <div className="comm2 fadeInLeft">
            <h1 id="cmtm">My Comments</h1>

            <div id="commentsscroll">
              {comments && comments.length !== 0 && (
                <>
                  {comments.map((val) => (
                    <div id="comment">
                      <p id="commentp">{val.comment}</p>
                      <button
                        id="ebtn"
                        className="rounded-2xl border-2 border-dashed border-black bg-white px-6 py-1 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
                        onClick={() => {
                          const ans = window.confirm(
                            "Are you sure you want to Edit this comment?"
                          );
                          if (ans) {
                            //////////////////
                            // Navigate to edit comment
                            //////////////////
                          }
                        }}
                      >
                        Edit Comment
                      </button>
                      <p id="commentby">-{val.name}</p>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
          <div className="comm3 fadeInRight">
            <h1 id="cmtm">New Comments</h1>
            <ul style={{ display: "block" }}>
              {newComments && newComments.length !== 0 && (
                <>
                  {newComments.map((val, index) => (
                    <li key={index} id="comment5">
                      <p className="newComment">{val.comment}</p>
                      <p className="newCommentUserName"> - {val.name}</p>
                      <button
                        id="check"
                        disabled={state}
                        style={{
                          backgroundColor: state ? "grey" : "transparent",
                        }}
                        onClick={async (e) => {
                          e.preventDefault();
                          const confirmed = window.confirm(
                            "Are you sure you want to approve this comment?"
                          );
                          if (confirmed) {
                            await axios
                              .put(
                                process.env.REACT_APP_API_URL +
                                  "/setApprovedComments",
                                {
                                  comment_reciever_email_id: profile.email,
                                  comment_sender_email_id: val.email_id,
                                  _id: val._id,
                                  id: val.id,
                                  comment_reciever_id: profile._id,
                                  comment: val.comment,
                                }
                              )
                              .then((res) => {
                                // console.log(res.data)
                              })
                              .catch((err) => {
                                console.log(err);
                              });

                            setState(true);
                            setTimeout(() => {
                              setState(false);
                            }, 7000);
                            window.location.reload();
                          }
                        }}
                      >
                        <i
                          className="fa fa-check-circle"
                          style={{ display: "inline" }}
                        ></i>
                      </button>
                      <p style={{ display: "inline" }}> </p>
                      <button
                        id="check"
                        disabled={state}
                        style={{
                          backgroundColor: state ? "grey" : "transparent",
                        }}
                        onClick={async (e) => {
                          e.preventDefault();
                          const confirmed = window.confirm(
                            "Are you sure you want to reject this comment?"
                          );
                          if (confirmed) {
                            await axios
                              .post(
                                process.env.REACT_APP_API_URL +
                                  "/setRejectedComments",
                                {
                                  comment: val.comment,
                                  comment_reciever_email_id: profile.email,
                                  comment_sender_email_id: val.email_id,
                                  _id: val._id,
                                  id: val.id,
                                  comment_reciever_id: profile._id,
                                }
                              )
                              .then((res) => {
                                // console.log(res.data)
                              })
                              .catch((err) => {
                                console.log(err);
                              });

                            setState(true);
                            setTimeout(() => {
                              setState(false);
                            }, 20000);
                            window.location.reload();
                          }
                        }}
                      >
                        <a href="" className="fa fa-times-circle"></a>
                      </button>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>

          <div
            style={{
              height: "50px",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Prof;
