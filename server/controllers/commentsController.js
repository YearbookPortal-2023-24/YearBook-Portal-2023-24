const asyncHandler = require('express-async-handler')
require('dotenv').config()
const mongoose = require('mongoose')
const Users = require('../models/userModel')
const Comments = require('../models/comments')

const comments = asyncHandler(async (req, res) => {
    const comment_sender_id = req.body.comment_sender_id
    const comment_sender_name = req.body.comment_sender_name
    const comment_sender_roll_no = req.body.comment_sender_roll_no
    const comment_sender_email_id = req.body.comment_sender_email_id
    const comment_sender_academic_program =
        req.body.comment_sender_academic_program
    const comment_reciever_id = req.body.comment_reciever_id
    const comment_reciever_name = req.body.comment_reciever_name
    const comment_reciever_roll_no = req.body.comment_reciever_roll_no
    const comment_reciever_email_id = req.body.comment_reciever_email_id
    const comment_reciever_academic_program =
        req.body.comment_reciever_academic_program
    const comment = req.body.comment
    const status = req.body.status

    console.log(comment_reciever_email_id)

    const User = await Comments.find({
        comment_reciever_email_id: comment_reciever_email_id,
    })
    try {
        if (!User?.length) {
            const newUser = await Comments.create({
                comment_reciever_id,
                comment_reciever_name,
                comment_reciever_roll_no,
                comment_reciever_email_id,
                comment_reciever_academic_program,
            })

            const newUser2 = await Comments.findOneAndUpdate(
                { comment_reciever_email_id: newUser.comment_reciever_email_id },
                {
                    $push: {
                        comment_sender: {
                            id: comment_sender_id,
                            name: comment_sender_name,
                            roll_no: comment_sender_roll_no,
                            email_id: comment_sender_email_id,
                            comment: comment,
                            status: status,
                            academic_program: comment_sender_academic_program,
                        },
                    },
                },
            )

            return res.send({ message: 'Comment added', newUser2 })
        }

        const newUser2 = await Comments.findOneAndUpdate(
            { comment_reciever_email_id: User[0].comment_reciever_email_id },
            {
                $push: {
                    comment_sender: {
                        id: comment_sender_id,
                        name: comment_sender_name,
                        roll_no: comment_sender_roll_no,
                        email_id: comment_sender_email_id,
                        academic_program: comment_sender_academic_program,
                        comment: comment,
                        status: status,
                    },
                },
            },
        )
        return res.send({ message: 'Comment added', newUser2 })
    } catch (err) {
        console.log(err)
    }
})

// const getComments = asyncHandler(async (req, res) => {
//     const email = req.body.email;
//     console.log(email);
//     //Get all Comments from MongoDb
//     // const User = await Comments.find()

//     const users = await Comments.find({
//         comment_sender: {
//             $elemMatch: {
//                 email_id: email,
//             },
//         },
//     });
//     let comments = [];
//     users.forEach((user) => {
//         const comment = user.comment_sender.find((sender) => sender.email_id === email);
//         console.log(user.name)
//         if (comment) {
//             comments.push({ name: user.comment_reciever_name, comment: comment.comment });
//         }
//     });

//     console.log(comments)

//     //If no comments
//     if (!comments) {
//         return res.send({ message: 'No comments found' });
//     }
//     return res.send({ message: 'Comment found', User: comments });
// });

const getComments = asyncHandler(async (req, res) => {
    const email = req.body.email;
    console.log(email);
  
    const users = await Comments.find({
      comment_sender: {
        $elemMatch: {
          email_id: email,
        },
      },
    });
  
    let comments = [];
  
    users.forEach((user) => {
      comments = comments.concat(
        user.comment_sender
          .filter((sender) => sender.email_id === email)
          .map((comment) => ({
            name: user.comment_reciever_name,
            comment: comment.comment,
          }))
      );
    });
  
    console.log(comments);
  
    // If no comments
    if (comments.length === 0) {
      return res.send({ message: 'No comments found' });
    }
  
    return res.send({ message: 'Comments found', User: comments });
  });
  
  

const setApprovedComments = asyncHandler(async (req, res) => {
    const comment_reciever_email_id = req.body.comment_reciever_email_id
    const comment_sender_email_id = req.body.comment_sender_email_id
    const comment = req.body.comment

    const user = await Comments.find({
        comment_reciever_email_id: comment_reciever_email_id,
    })
    if (!user?.length) {
        return res.send({ message: 'No user found' })
    }
    for (var i = 0; i <= user[0].comment_sender.length; i++) {
        if (
            user[0].comment_sender[i].email_id === comment_sender_email_id &&
            user[0].comment_sender[i].comment === comment
        ) {
            user[0].comment_sender[i].status = 'approved'
            await user[0].save()
            break
        }
    }
    res.send({ message: 'comment added in approved section', user })
})

const setRejectedComments = asyncHandler(async (req, res) => {
    const comment_reciever_email_id = req.body.comment_reciever_email_id
    const comment_sender_email_id = req.body.comment_sender_email_id
    const comment = req.body.comment

    const user = await Comments.find({
        comment_reciever_email_id: comment_reciever_email_id,
    })
    if (!user?.length) {
        return res.send({ message: 'No user found' })
    }

    for (var i = 0; i <= user[0].comment_sender.length; i++) {

        if (
            user[0].comment_sender[i].email_id === comment_sender_email_id &&
            user[0].comment_sender[i].comment === comment
        ) {
            user[0].comment_sender[i].status = 'rejected'

            await user[0].save()
            break
        }
    }
    res.send({ message: 'comment added in rejected section', user })
})

const getRecieversComments = asyncHandler(async (req, res) => {
    const comment_reciever_email_id = req.body.comment_reciever_email_id

    //Get all usersData from MongoDb
    const users = await Comments.find({ comment_reciever_email_id: comment_reciever_email_id })
    console.log(users)
    //If no usersData
    if (users.length === 0) {
        console.log("reached")
        return res.send({ message: 'No userData found' })
    }
    var approvedComments = []
    users.map(user => {
        approvedComments = user.comment_sender.filter(sender => sender.status === "approved")

    })

    const comments = [];

    users.forEach(user => {
        user.comment_sender.forEach(comment => {
            if (comment.status === "new") {
                comments.push({ name: comment.name, comment: comment.comment, email_id: comment.email_id });
            }

        });
    });
    const approvedUsers = approvedComments.map(user => ({
        name: user.name,
        comment: user.comment,
        email: user.email_id
    }))

    console.log(approvedComments)

    return res.send({ message: "Approved users found", users: approvedUsers, user2: comments })

})

const updateCommentOrder= asyncHandler(async(req,res)=>{


    // --------------------------------------------------------------------------------------------
    // working 2
    // try {
    //   const { comment_reciever_email_id, updatedOrder } = req.body;
    
    //   // Log the received data
    //   console.log('Received data:', comment_reciever_email_id, updatedOrder);
    
    //   // Iterate through updatedOrder and update the order in MongoDB
    //   await Promise.all(
    //     updatedOrder.map(async (commentData, index) => {
    //       const { comment, order } = commentData;
    
    //       // Log the comment data being processed
    //       console.log('Processing comment:', comment, order);
    
    //       // Update the comment order in your database
    //       const result = await Comments.updateOne(
    //         {
    //           comment_reciever_email_id,
    //           'comment_sender.comment': comment,
    //         },
    //         { $set: { 'comment_sender.$.order': index } }
    //       );
    
    //       // Log the result of the update operation
    //       console.log('Update result:', result);
    //     })
    //   );
    
    //   // Fetch the updated result after the update operation
    //   const updatedResult = await Comments.findOne({ comment_reciever_email_id });
    
    //    // Sort the comments by order in ascending order
    //    updatedResult.comment_sender.sort((a, b) => a.order - b.order);
    
    //   // Log the updated result
    //   console.log('Updated Result after API call:', updatedResult);
    
    //   // Send a response to the frontend
    //   return res.status(200).json({
    //     message: 'Updated comment order in MongoDB successfully',
    //   });
    // } catch (error) {
    //   console.error('Error updating comment order:', error);
    
    //   // Send an error response to the frontend
    //   return res.status(500).json({ error: 'Internal server error' });
    // }
    // ---------------------------------------------------------------------------------------------
    try {
      const { comment_reciever_email_id, updatedOrder } = req.body;
    
     
      console.log('Received data:', comment_reciever_email_id, updatedOrder);
    
    
      await Promise.all(
        updatedOrder.map(async (commentData, index) => {
          const { comment, order } = commentData;
    
          
          console.log('Processing comment:', comment, order);
    
          
          const result = await Comments.updateOne(
            {
              comment_reciever_email_id,
              'comment_sender.comment': comment,
            },
            { $set: { 'comment_sender.$.order': index } }
          );
    
        
          console.log('Update result:', result);
        })
      );
    
      let updatedResult = await Comments.findOne({ comment_reciever_email_id });
    
      
      updatedResult.comment_sender.sort((a, b) => a.order - b.order);
    
     
      await Comments.updateOne(
        { comment_reciever_email_id },
        { $set: { 'comment_sender': updatedResult.comment_sender } }
      );
    
     
      updatedResult = await Comments.findOne({ comment_reciever_email_id });
    
      
      console.log('Updated Result after API call:', updatedResult);
    
      
      return res.status(200).json({
        message: 'Updated comment order in MongoDB successfully',
        comments: updatedResult.comment_sender,
      });
    } catch (error) {
      console.error('Error updating comment order:', error);
    
      
      return res.status(500).json({ error: 'Internal server error' });
    }
    
    
    
    })
    

const removeCommentFromMyComments = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const comment = req.body.comment;

    const users = await Comments.find({
        comment_sender: {
            $elemMatch: {
                email_id: email,
                comment: comment,
            },
        },
    });

    await Promise.all(users.map(async (user) => {
        const commentIndex = user.comment_sender.findIndex((sender) => sender.email_id === email && sender.comment === comment);
        if (commentIndex !== -1) {
            user.comment_sender.pull(user.comment_sender[commentIndex]);
            await user.save();
        }
    }));

    res.send({ message: 'Comment removed successfully' });
})

const removeCommentFromApprovedComments = asyncHandler(async (req, res) => {
    const comment_reciever_email_id = req.body.comment_reciever_email_id
    const comment = req.body.comment
    const email = req.body.email

    //Get all usersData from MongoDb
    const users = await Comments.find({ comment_reciever_email_id: comment_reciever_email_id })

    //If no usersData
    if (users.length === 0) {
        return res.send({ message: 'No userData found' })
    }
    let commentRemoved = false;
    await Promise.all(users.map(async (user) => {
        const commentIndex = user.comment_sender.findIndex((sender) => sender.email_id === email && sender.comment === comment && sender.status === "approved");
        if (commentIndex !== -1) {
            user.comment_sender[commentIndex].status = "new"
            await user.save();
            commentRemoved = true;
        }
    }));

    if (!commentRemoved) {
        return res.send({ message: 'Comment not found in approved comments' });
    }

    return res.send({ message: "Comment removed from approved comments" })
})

module.exports = {
    comments,
    getComments,
    setApprovedComments,
    setRejectedComments,
    getRecieversComments,
    removeCommentFromMyComments,
    removeCommentFromApprovedComments,
    updateCommentOrder
}