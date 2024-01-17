const asyncHandler = require('express-async-handler')
require('dotenv').config()
const mongoose = require('mongoose')
const Users = require('../models/userModel')
const Comments = require('../models/comments')
const rejectedcomments = require('../models/rejectedcomments')

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

const getComments = asyncHandler(async (req, res) => {
    const email = req.body.email;
    console.log(email);
    //Get all Comments from MongoDb
    // const User = await Comments.find()

    const users = await Comments.find({
        comment_sender: {
            $elemMatch: {
                email_id: email,
            },
        },
    });
    let comments = [];
    users.forEach((user) => {
        const comment = user.comment_sender.find((sender) => sender.email_id === email);
        console.log(user.name)
        if (comment) {
            comments.push({ name: user.comment_reciever_name, comment: comment.comment });
        }
    });

    console.log(comments)

    //If no comments
    if (!comments) {
        return res.send({ message: 'No comments found' });
    }
    return res.send({ message: 'Comment found', User: comments });
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

    try {
        const user = await Comments.findOne({
            comment_reciever_email_id: comment_reciever_email_id,
            'comment_sender.email_id': comment_sender_email_id,
            'comment_sender.comment': comment,
        })

        if (!user) {
            return res.status(404).send({ message: 'No user found' })
        }

        const ind = user.comment_sender.findIndex(
            (sender) => sender.email_id === comment_sender_email_id && sender.comment === comment
        );

        if (ind !== -1) {
            user.comment_sender[ind].status = 'rejected';

            await rejectedcomments.create({
                id: user.comment_sender[ind].id,
                name: user.comment_sender[ind].name,
                roll_no: user.comment_sender[ind].roll_no,
                email_id: user.comment_sender[ind].email_id,
                academic_program: user.comment_sender[ind].academic_program,
                comment: user.comment_sender[ind].comment,
                status: 'rejected',
            });

            await user.save();

            return res.send({ message: 'comment added in rejected section', user });
        } else {
            return res.status(404).send({ message: 'Comment not found' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
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

const getRejectedComments = asyncHandler(async (req, res) => {
    const comment_reciever_email_id = req.body.comment_reciever_email_id

    //Get all usersData from MongoDb
    const users = await Comments.find({ comment_reciever_email_id: comment_reciever_email_id })
    console.log(users)
    //If no usersData
    if (users.length === 0) {
        console.log("reached")
        return res.send({ message: 'No userData found' })
    }
    var rejectedComments = []
    users.map(user => {
        rejectedComments = user.comment_sender.filter(sender => sender.status === "rejected")

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
    removeCommentFromApprovedComments
}