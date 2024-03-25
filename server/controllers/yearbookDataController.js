const asyncHandler = require('express-async-handler')
require('dotenv').config()
const mongoose = require('mongoose')

const getYearbookData = asyncHandler(async (req, res) => {
    return res.send('Hello from getYearbookData')
})

module.exports = { getYearbookData }