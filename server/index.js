const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/userRoutes')
const roomRoutes = require('./routes.roomRoutes')
const messageRoutes = require('./routes/messageRoutes')

const app = express(); 
const PORT = process.env.PORT || 3001;

app.use(bodyParse.json())

moongoose.connect('mongodb://localhost:27017/chatapp', {
    userNewUrlParser: true,
    useUnifiedTOpology: true
})

app.use(userRoutes)
app.use(roomRoutes)
app.use(messageRoutes)

app.listen(PORT, () => {
    console.log(`Server is runnig on port ${PORT}`)
})