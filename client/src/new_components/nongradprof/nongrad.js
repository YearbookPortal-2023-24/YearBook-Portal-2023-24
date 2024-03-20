import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LoginContext } from "../../helpers/Context";
import { useNavigate, useParams } from "react-router-dom";

const Nongrad = () => {
  const { name, email } = useParams();

  const [message2, setMessage2] = useState("");
  const [comments, setComments] = useState([]);
  
  useEffect(() => {
    if (email) {
      axios
        .post(process.env.REACT_APP_API_URL + "/ungradmycomment", {
          // comment_reciever_id: profile._id,
          comment_reciever_email:email
        })
        .then((res) => {
          if (res.data.message === "No users found") {
            setMessage2(res.data.message);
            setComments([]);
          } else {
            setComments(res.data.User);
            console.log("wassupmycomments++",res.data.User);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  return (
    <div className="w-screen h-screen bg-bg-white flex flex-col-reverse gap-y-4 md:flex-row justify-center items-center" >
      <div className="comm2 ">
        <h1 id="cmtm" className="text-center mt-0">My Comments</h1>
        <p className="text-lg mt-48">Start Commenting on other people to view your comments here. <a href="/" className="hover:underline">Comment Now</a></p>
      </div>
      <div className="flex flex-col md:ml-12">
        <div className="name3 mt-4 md:mt-8">
          <h3>Name:</h3>
        </div>
        <div className="name3 mt-4 md:mt-8">
          <h3>Email:</h3>
        </div>
      </div>
    </div>
  );
};


export default Nongrad;


// const ungradmycomment = asyncHandler(async (req, res) => {
//   const  comment_reciever_email=req.body.comment_reciever_email

//   const usersEmail = await Users.findOne({
//     email: comment_reciever_email,
//   });



//   // let comment_reciever_id = req.body.comment_reciever_id;
//   let comment_reciever_id = usersEmail._id.toString();
//   console.log("nongrd",comment_reciever_id)

//   const users = await Comments.find({
//       comment_sender: {
//           $elemMatch: {
//               id: comment_reciever_id,
//           },
//       },
//   })
//       .populate('comment_reciever_id');

//       // console.log("++++++",users)

//   const allComments = [];

//   users.forEach(user => {
//       if (user.comment_reciever_id && user.comment_reciever_id.name && user.comment_sender) {
//           user.comment_sender.forEach(comment => {
//               if (comment && comment.id === comment_reciever_id) {
//                   allComments.push({
//                       comment: comment.comment,
//                       comment_reciever_name: user.comment_reciever_id.name,
//                       comment_id: comment._id,
//                       user_comment_reciever_id: user.comment_reciever_id._id,
//                   });
//               }
//           });
//       }
//   });

//   if (allComments.length === 0) {
//       return res.send({ message: 'No comments found' });
//   }

//   console.log("++++++++++++alllllllllllll",allComments)

//   res.json({ message: 'Comments found', User: allComments });
// });
