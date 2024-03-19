// const asyncHandler = require('express-async-handler')
// require('dotenv').config()
// const mongoose = require('mongoose')
// const Users = require('../models/userModel')
// const Comments = require('../models/comments')

// const comments = asyncHandler(async (req, res) => {
//     const comment_sender_id = req.body.comment_sender_id
//     const comment_sender_name = req.body.comment_sender_name
//     const comment_sender_roll_no = req.body.comment_sender_roll_no
//     const comment_sender_email_id = req.body.comment_sender_email_id
//     const comment_sender_academic_program =
//         req.body.comment_sender_academic_program
//     const comment_reciever_id = req.body.comment_reciever_id
//     const comment_reciever_name = req.body.comment_reciever_name
//     const comment_reciever_roll_no = req.body.comment_reciever_roll_no
//     const comment_reciever_email_id = req.body.comment_reciever_email_id
//     const comment_reciever_academic_program =
//         req.body.comment_reciever_academic_program
//     const comment = req.body.comment
//     const status = req.body.status

//     console.log(comment_reciever_email_id)

//     const User = await Comments.find({
//         comment_reciever_email_id: comment_reciever_email_id,
//     })
//     try {
//         if (!User?.length) {
//             const newUser = await Comments.create({
//                 comment_reciever_id,
//                 comment_reciever_name,
//                 comment_reciever_roll_no,
//                 comment_reciever_email_id,
//                 comment_reciever_academic_program,
//             })

//             const newUser2 = await Comments.findOneAndUpdate(
//                 { comment_reciever_email_id: newUser.comment_reciever_email_id },
//                 {
//                     $push: {
//                         comment_sender: {
//                             id: comment_sender_id,
//                             name: comment_sender_name,
//                             roll_no: comment_sender_roll_no,
//                             email_id: comment_sender_email_id,
//                             comment: comment,
//                             status: status,
//                             academic_program: comment_sender_academic_program,
//                         },
//                     },
//                 },
//             )

//             return res.send({ message: 'Comment added', newUser2 })
//         }

//         const newUser2 = await Comments.findOneAndUpdate(
//             { comment_reciever_email_id: User[0].comment_reciever_email_id },
//             {
//                 $push: {
//                     comment_sender: {
//                         id: comment_sender_id,
//                         name: comment_sender_name,
//                         roll_no: comment_sender_roll_no,
//                         email_id: comment_sender_email_id,
//                         academic_program: comment_sender_academic_program,
//                         comment: comment,
//                         status: status,
//                     },
//                 },
//             },
//         )
//         return res.send({ message: 'Comment added', newUser2 })
//     } catch (err) {
//         console.log(err)
//     }
// })

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

// const setApprovedComments = asyncHandler(async (req, res) => {
//     const comment_reciever_email_id = req.body.comment_reciever_email_id
//     const comment_sender_email_id = req.body.comment_sender_email_id
//     const comment = req.body.comment

//     const user = await Comments.find({
//         comment_reciever_email_id: comment_reciever_email_id,
//     })
//     if (!user?.length) {
//         return res.send({ message: 'No user found' })
//     }
//     for (var i = 0; i <= user[0].comment_sender.length; i++) {
//         if (
//             user[0].comment_sender[i].email_id === comment_sender_email_id &&
//             user[0].comment_sender[i].comment === comment
//         ) {
//             user[0].comment_sender[i].status = 'approved'
//             await user[0].save()
//             break
//         }
//     }
//     res.send({ message: 'comment added in approved section', user })
// })

// const setRejectedComments = asyncHandler(async (req, res) => {
//     const comment_reciever_email_id = req.body.comment_reciever_email_id
//     const comment_sender_email_id = req.body.comment_sender_email_id
//     const comment = req.body.comment

//     const user = await Comments.find({
//         comment_reciever_email_id: comment_reciever_email_id,
//     })
//     if (!user?.length) {
//         return res.send({ message: 'No user found' })
//     }

//     for (var i = 0; i <= user[0].comment_sender.length; i++) {

//         if (
//             user[0].comment_sender[i].email_id === comment_sender_email_id &&
//             user[0].comment_sender[i].comment === comment
//         ) {
//             user[0].comment_sender[i].status = 'rejected'

//             await user[0].save()
//             break
//         }
//     }
//     res.send({ message: 'comment added in rejected section', user })
// })

// const getRecieversComments = asyncHandler(async (req, res) => {
//     const comment_reciever_email_id = req.body.comment_reciever_email_id

//     //Get all usersData from MongoDb
//     const users = await Comments.find({ comment_reciever_email_id: comment_reciever_email_id })
//     console.log(users)
//     //If no usersData
//     if (users.length === 0) {
//         console.log("reached")
//         return res.send({ message: 'No userData found' })
//     }
//     var approvedComments = []
//     users.map(user => {
//         approvedComments = user.comment_sender.filter(sender => sender.status === "approved")

//     })

//     const comments = [];

//     users.forEach(user => {
//         user.comment_sender.forEach(comment => {
//             if (comment.status === "new") {
//                 comments.push({ name: comment.name, comment: comment.comment, email_id: comment.email_id });
//             }

//         });
//     });
//     const approvedUsers = approvedComments.map(user => ({
//         name: user.name,
//         comment: user.comment,
//         email: user.email_id
//     }))

//     console.log(approvedComments)

//     return res.send({ message: "Approved users found", users: approvedUsers, user2: comments })

// })

// const removeCommentFromMyComments = asyncHandler(async (req, res) => {
//     const email = req.body.email;
//     const comment = req.body.comment;

//     const users = await Comments.find({
//         comment_sender: {
//             $elemMatch: {
//                 email_id: email,
//                 comment: comment,
//             },
//         },
//     });

//     await Promise.all(users.map(async (user) => {
//         const commentIndex = user.comment_sender.findIndex((sender) => sender.email_id === email && sender.comment === comment);
//         if (commentIndex !== -1) {
//             user.comment_sender.pull(user.comment_sender[commentIndex]);
//             await user.save();
//         }
//     }));

//     res.send({ message: 'Comment removed successfully' });
// })

// const removeCommentFromApprovedComments = asyncHandler(async (req, res) => {
//     const comment_reciever_email_id = req.body.comment_reciever_email_id
//     const comment = req.body.comment
//     const email = req.body.email

//     //Get all usersData from MongoDb
//     const users = await Comments.find({ comment_reciever_email_id: comment_reciever_email_id })

//     //If no usersData
//     if (users.length === 0) {
//         return res.send({ message: 'No userData found' })
//     }
//     let commentRemoved = false;
//     await Promise.all(users.map(async (user) => {
//         const commentIndex = user.comment_sender.findIndex((sender) => sender.email_id === email && sender.comment === comment && sender.status === "approved");
//         if (commentIndex !== -1) {
//             user.comment_sender[commentIndex].status = "new"
//             await user.save();
//             commentRemoved = true;
//         }
//     }));

//     if (!commentRemoved) {
//         return res.send({ message: 'Comment not found in approved comments' });
//     }

//     return res.send({ message: "Comment removed from approved comments" })
// })

// module.exports = {
//     comments,
//     getComments,
//     setApprovedComments,
//     setRejectedComments,
//     getRecieversComments,
//     removeCommentFromMyComments,
//     removeCommentFromApprovedComments
// }

// --------------------------------------------------------------------------------------------------------------


const asyncHandler = require('express-async-handler')
require('dotenv').config()
const mongoose = require('mongoose')
const Users = require('../models/userModel')
const Comments = require('../models/comments')
const auth = require('../models/authModel')


//Adding the comment
const comments = asyncHandler(async (req, res) => {
    
    const comment_sender_email_id = req.body.comment_sender_email
    const comment_reciever_roll_no = req.body.comment_reciever_roll_no
    const comment = req.body.comment
    const status = req.body.status
    const isStudent = req.body.isStudent

    //finding id of receiver
    const receiver = await Users.findOne({
        roll_no: comment_reciever_roll_no
    })
    console.log("reciever++++--",receiver)

    comment_reciever_id = receiver._id.toString();

    var sender;

    //if sender is a student
    if(isStudent){
        sender = auth.findOne({
            email : comment_sender_email_id
        })
    }else{
        sender = await Users.findOne({
            email : comment_sender_email_id
        })
    }

    const User = await Comments.findOne({
        comment_reciever_id : comment_reciever_id
    })

    // console.log("sender+++---",sender)
    console.log("user+++++--",User)
    
    try {
        var newUser
        if (!User) {
            newUser = await Comments.create({
                comment_reciever_id: comment_reciever_id
            })
        }

            const newUser2 = await Comments.findOneAndUpdate(
                { comment_reciever_id: !User ? newUser.comment_reciever_id :  User.comment_reciever_id},
                {
                    $push: {
                        comment_sender: {
                            id: sender._id.toString(),
                            comment: comment,
                            status: status,
                            order : !User ? 1 : User.comment_sender.length +1
                        },
                    },
                },
            )

            return res.send({ message: 'Comment added', newUser2 })
    } catch (err) {
        console.log(err)
    }
})


const getComments = asyncHandler(async (req, res) => {
    let comment_reciever_id = req.body.comment_reciever_id;

    const users = await Comments.find({
        comment_sender: {
            $elemMatch: {
                id: comment_reciever_id,
            },
        },
    })
        .populate('comment_reciever_id');

        console.log("++++++",users)

    const allComments = [];

    users.forEach(user => {
        if (user.comment_reciever_id && user.comment_reciever_id.name && user.comment_sender) {
            user.comment_sender.forEach(comment => {
                if (comment && comment.id === comment_reciever_id) {
                    allComments.push({
                        comment: comment.comment,
                        comment_reciever_name: user.comment_reciever_id.name,
                        comment_id: comment._id,
                        user_comment_reciever_id: user.comment_reciever_id._id,
                    });
                }
            });
        }
    });

    if (allComments.length === 0) {
        return res.send({ message: 'No comments found' });
    }

    console.log("++++++++++++",allComments)

    res.json({ message: 'Comments found', User: allComments });

});

const setApprovedComments = asyncHandler(async (req, res) => {
    // const comment_reciever_email_id = req.body.comment_reciever_email_id
    // const comment_reciever_id = req.body.comment_reciever_id
    // const comment_sender_email_id = req.body.comment_sender_email_id
    const comment_reciever_roll_no=req.body.comment_reciever_roll_no
    const comment = req.body.comment
    const _id = req.body._id
    // const comment_sender_id = req.body.id
    console.log("approved comment default", _id)
    console.log("comment_reciever_roll_no",comment_reciever_roll_no)

    // console.log( comment)
    const usersId = await Users.findOne({
        roll_no: comment_reciever_roll_no
       })

    const user = await Comments.find({
        comment_reciever_id: usersId._id,
    })
    
    console.log("User:", user);
    console.log("User+++:", user[0].comment_sender);

    if (!user?.length || !user[0] || !user[0].comment_sender) {
        console.log("it goes inside")
        return res.send({ message: 'No user found' })
    }

    for (var i = 0; i < user[0].comment_sender.length; i++) {
        if (
            user[0].comment_sender[i] &&
            user[0].comment_sender[i]._id == _id &&
            user[0].comment_sender[i].comment === comment &&
            user[0].comment_sender[i].status == 'new'
        ) {
            // console.log( user[0].comment_sender[i])
            console.log("Updating status to 'approved'");
            // user[0].comment_sender[i].status = 'approved';
            user[0].comment_sender[i].status = 'approved'
            await user[0].save()
            break
        }
    }

    // -----------------------------------------------------------------------------
    // const user = await Comments.find({
    //     comment_sender: {
    //         $elemMatch: {
    //             _id: _id,
    //         },
    //     },
    // })
    
    // console.log("user req comment:", user);
    
    // if (!user || user.length === 0) {
    //     console.log("No user found");
    //     return res.send({ message: 'No user found' });
    // }
    
    //

    res.send({ message: 'comment added in approved section', user })
})

const setRejectedComments = asyncHandler(async (req, res) => {
    // const comment_reciever_email_id = req.body.comment_reciever_email_id
    // const comment_sender_email_id = req.body.comment_sender_email_id
    // const comment = req.body.comment

    // const comment_reciever_email_id = req.body.comment_reciever_email_id
    // const comment_reciever_id = req.body.comment_reciever_id
    // const comment_sender_email_id = req.body.comment_sender_email_id
    const comment_reciever_roll_no=req.body.comment_reciever_roll_no
    const comment = req.body.comment
    const _id = req.body._id
    // const comment_sender_id = req.body.id
    // console.log("rejected comment default",_id)
    // console.log("rejected comment default",comment_sender_id)

    const usersId = await Users.findOne({
        roll_no: comment_reciever_roll_no
       })

    const user = await Comments.find({
         comment_reciever_id: usersId._id,
    })
    if (!user?.length) {
        return res.send({ message: 'No user found' })
    }

    for (var i = 0; i <= user[0].comment_sender.length; i++) {

        if (
            user[0].comment_sender[i]._id == _id &&
            user[0].comment_sender[i].comment === comment
        ) {
            user[0].comment_sender[i].status = 'rejected'

            await user[0].save()
            break
        }
    }
    res.send({ message: 'comment added in rejected section', user })
})



// 6582a3be44e2daae019909a8
// 6582ad281aa809bdc81221e6
// ------------------------------------------------------------------------------------------------
const getRecieversComments = asyncHandler(async (req, res) => {
    try{
    // const comment_reciever_email_id = req.body.comment_reciever_email_id
    // let comment_reciever_id = req.body.comment_reciever_id
    const comment_reciever_roll_no=req.body.comment_reciever_roll_no
    // console.log("before +++",comment_reciever_id)
    console.log("before +++",comment_reciever_roll_no)

    // if(comment_reciever_id===undefined){
        const usersId = await Users.findOne({
            roll_no: comment_reciever_roll_no
           })

        // console.log(usersId)

        const comment_reciever_id = usersId._id.toString();
        //    if (usersId && usersId._id) {
        //     comment_reciever_id = usersId._id.toString();
        //     console.log("after +++",comment_reciever_id)
        //   } else {
        //     // Handle the case when usersId or usersId._id is not available
        //     return res.status(404).json({ success: false, message: 'User not found for the given roll_no' });
        //   }
        // }

    // console.log("the id is++++++++++++++++++++++++",comment_reciever_email_id);/
    // console.log("the id is++++++++++++++++++++++++",comment_reciever_id);

    //Get all usersData from MongoDb
    const users = await Comments.findOne({
         comment_reciever_id: comment_reciever_id 
        })
        .populate('comment_sender.id');
        // .populate({path:"id"});
    // console.log("user1+++++++++",users.comment_sender[0])
    // console.log("user0+++++++++",users.comment_sender[1])

    //If no usersData
    if (!users) {
        console.log("reached")
        return res.send({ message: 'No userData found' })
    }
    // console.log("testing")
    // console.log(users.user[0])


    const approvedComments = users.comment_sender.filter(sender => sender.status === 'approved');
    // console.log("Approved Comments:", approvedComments);
    const newComments = users.comment_sender.filter(sender => sender.status === 'new');
    // console.log("new Comments:", newComments);
    


    // Extract the relevant data and send it to the frontend
    const responseData = approvedComments.map(comment => ({
        _id:comment._id,
        id:comment.id,
        comment: comment.comment,
        name: comment.id ? comment.id.name : 'N/A',  
        roll_no: comment.id ? comment.id.roll_no : 'N/A',  
        email_id: comment.id ? comment.id.email : 'N/A',  
        academic_program: comment.id ? comment.id.academic_program : 'N/A',  
        // Add more fields as needed
    })); //object
     const responseData2 = newComments.map(comment => ({
        _id:comment._id,
        id:comment.id,
        comment: comment.comment,
        name: comment.id ? comment.id.name : 'N/A',  
        roll_no: comment.id ? comment.id.roll_no : 'N/A',  
        email_id: comment.id ? comment.id.email : 'N/A',  
        academic_program: comment.id ? comment.id.academic_program : 'N/A',  
        // Add more fields as needed
    }));
    // console.log(typeof responseData2);




    // console.log("approvedcomments+++++++++++++++",responseData)
    // console.log("newcomments++++++++++++++++++++",responseData2)
    res.json({ approvedComments: responseData  ,user2: responseData2});

    }
    catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
      }
    

})
// const getRecieversComments = asyncHandler(async (req, res) => {
//     try{
//         const comment_
//     }
//     catch{

//     }

// })

const getRecieverComments2 = asyncHandler(async (req, res) => {
    try {

        const comment_reciever_roll_no = req.body.comment_reciever_roll_number

        console.log("before +++", comment_reciever_roll_no)

        const usersId = await Users.findOne({
            roll_no: comment_reciever_roll_no
        })
        if (usersId && usersId._id) {
            comment_reciever_id = usersId._id.toString();
        } else {
            // Handle the case when usersId or usersId._id is not available
            return res.status(404).json({ success: false, message: 'User not found for the given roll_no' });
        }

        //Get all usersData from MongoDb
        const users = await Comments.findOne({
            comment_reciever_id: comment_reciever_id
        })
            .populate('comment_sender.id');

        // console.log(users)

        const user = {
            name : usersId.name,
            roll_no: usersId.roll_no,
            profImage: usersId.profile_img,
            email : usersId.email
        }

        //If no usersData
        if (!users) {
            console.log("reached")
            return res.send({ message: 'No userData found', user : user})
        }


        const approvedComments = users.comment_sender.filter(sender => sender.status === 'approved');

        // Extract the relevant data and send it to the frontend
        const responseData = approvedComments.map(comment => ({
            _id: comment._id,
            id: comment.id,
            comment: comment.comment,
            name: comment.id ? comment.id.name : 'N/A',
            roll_no: comment.id ? comment.roll_no : 'N/A',
            profImage : comment.id ? comment.profile_img : 'N/A',
            email_id: comment.id ? comment.email_id : 'N/A',
            // academic_program: comment.id ? comment.id.academic_program : 'N/A',
            // Add more fields as needed
        })); //object

        

        console.log(responseData);
        res.json({ approvedComments: responseData, user : user});

    }
    catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
    

})


const updateCommentOrder = asyncHandler(async (req, res) => {

    try {
        const comment_reciever_roll_no=req.body.comment_reciever_roll_no
        const usersId = await Users.findOne({
            roll_no: comment_reciever_roll_no
        })
    //     const user = await Comments.find({
    //         comment_reciever_id: usersId._id,
    //    })
    const comment_reciever_id=usersId._id;

        const {  updatedOrder } = req.body;
        console.log("Update Order just after sending data to backend", updatedOrder)

        await Promise.all(
            updatedOrder.map(async (commentData, index) => {
                const { _id, order } = commentData;

                const result = await Comments.updateOne(
                    {
                        // comment_reciever_email_id,
                        comment_reciever_id,
                        'comment_sender._id': commentData._id,
                    },
                    { $set: { 'comment_sender.$.order': index } }
                );
            })
        );


        const updateQuery = {
            $push: {
                comment_sender: {
                    $each: [],
                    $sort: { order: 1 },
                },
            },
        };

        // await Comments.updateOne({ comment_reciever_email_id }, updateQuery);
        await Comments.updateOne({ comment_reciever_id }, updateQuery);

        // let updatedResult = await Comments.findOne({ comment_reciever_email_id });
        let updatedResult = await Comments.findOne({ comment_reciever_id });
        console.log("After sorting updatedorder is", updatedResult)

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
    // const comment_reciever_email_id = req.body.comment_reciever_email_id
    // const comment = req.body.comment
    // const email = req.body.email

    const comment_reciever_email_id = req.body.comment_reciever_email_id
    const comment_reciever_id = req.body.comment_reciever_id
    const comment_sender_email_id = req.body.comment_sender_email_id
    const comment = req.body.comment
    const _id = req.body._id
    const comment_sender_id = req.body.id

    //Get all usersData from MongoDb
    const user = await Comments.findOne(
        { comment_reciever_id: comment_reciever_id }
    )

    //If no usersData
    // if (users.length === 0) {
    //     return res.send({ message: 'No userData found' })
    // }
    // let commentRemoved = false;
    // await Promise.all(users.map(async (user) => {
    //     const commentIndex = user.comment_sender.findIndex((sender) => sender.email_id === email && sender.comment === comment && sender.status === "approved");
    //     if (commentIndex !== -1) {
    //         user.comment_sender[commentIndex].status = "new"
    //         await user.save();
    //         commentRemoved = true;
    //     }
    // }));

    if (!user?.length) {
        return res.send({ message: 'No user found' })
    }

    for (var i = 0; i <= user[0].comment_sender.length; i++) {

        if (
            user[0].comment_sender[i]._id == _id &&
            user[0].comment_sender[i].comment === comment
        ) {
            user[0].comment_sender[i].status = 'new'

            await user[0].save()
            break
        }
    }
    res.send({ message: 'comment added in new section', user })

})

// let sharedEditComment;

const editComment = asyncHandler(async (req, res) => {

    const EditComment = req.body.comment
    console.log("comment after edit", EditComment)
    const comment_reciever_id_edit = req.body.comment_reciever_id_edit
    console.log("comment after edit", comment_reciever_id_edit)
    const comment_id_edit = req.body.comment_id_edit
    console.log("comment_reciever_id_edit", comment_reciever_id_edit)
    console.log("comment_id_edit", comment_id_edit)

    try {
        const result = await Comments.updateOne(
            { 'comment_sender._id': comment_id_edit },
            {
                $set: {
                    'comment_sender.$.comment': EditComment,
                    'comment_sender.$.status': 'new',
                }
            }
        );

        if (result.nModified === 0) {
            return res.status(404).json({ message: 'Comment not found or not modified' });
        }

        console.log('Edited comment successfully');
        res.status(200).json({ message: 'Comment edited successfully' });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }

});


const getEditCommentsInfo = asyncHandler(async (req, res) => {
    try {
        const comment_reciever_id_edit = req.body.comment_reciever_id_edit
        const comment_id_edit = req.body.comment_id_edit
        console.log("comment_reciever_id_edit",comment_reciever_id_edit)
        // console.log("comment_id_edit",comment_id_edit)

        const user = await Users.findOne(
            { roll_no: comment_reciever_id_edit }
        )
        const comment = await Comments.findOne(
            { 'comment_sender._id': comment_id_edit },
            { 'comment_sender.$': 1 } // Projection to return only the matching array element
        )

        console.log("user is", user)
        console.log("comment is", comment)
        // console.log("comment after edit2222",sharedEditComment)

        if (!user) {
            return res.send({ message: 'No user found' })
        }


        res.json({ user: user, comment: comment });

    }


    catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }

})



module.exports = {
    comments,
    getComments,
    setApprovedComments,
    setRejectedComments,
    getRecieversComments,
    removeCommentFromMyComments,
    removeCommentFromApprovedComments,
    updateCommentOrder,
    getEditCommentsInfo,
    editComment,
    getRecieverComments2
}