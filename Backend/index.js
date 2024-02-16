const express=require('express')
const cors=require('cors')
const dotenv=require('dotenv');
const connectDB = require('./config/db')
const bodyParser = require('body-parser');
const PORT=process.env.PORT || 4000;
const userRoutes = require("./routes/UserRoutes");
const noteRoutes = require("./routes/NoteRoutes");

const setupAndStartServer = async () => {
    const app=express();
    connectDB();
    dotenv.config();
    app.use(bodyParser.json());
    app.use(express.json());
    app.use("/api/v1/user",userRoutes);
    app.use("/api/v1/note",noteRoutes);
    app.use(bodyParser.urlencoded({extended:true}));
    app.listen(PORT,()=>{
      console.log(`Server is running on PORT ${PORT}`);
    });
}

setupAndStartServer();