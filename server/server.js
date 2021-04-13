const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 5000

//Connect to the databse in Robo3T
const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/blog", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})

//Check if we are connected to the Database
mongoose.connection.once("open", () => console.log('We are connected to the Database'))

app.use(cors())
app.use(express.json())

//Define the routes
app.use('/users', require('./routes/users'))
app.use('/auth', require('./routes/auth'))
app.use('/posts', require('./routes/posts'))


app.listen(PORT, () => console.log(`App is listening in port ${PORT}`))