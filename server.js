const express = require('express')
const dotenv = require('dotenv')
const connectDb = require('./config/db')
const router = require('./routes/complaintRoutes')
dotenv.config()
const app = express()
app.use(express.json())

const PORT = process.env.PORT

app.use("/api/complaints",router)

app.listen(PORT,()=>{
    connectDb()
    console.log(`Server Running at ${PORT}`);
    
})