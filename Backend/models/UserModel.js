const mongoose=require("mongoose");

const userSchema=new mongoose.Schema(
    {
        username:{
            type:String,
            required:[true,"Username is required"],
        },
        email:{
            type:String,
            required:[true,"Email is required"],
        },
        password:{
            type:String,
            required:[true,"Password is required"],
        },
        notes:[{
            type : mongoose.Types.ObjectId,
            ref:"Note",
        }],
        sharedNotes: [{ type: mongoose.Types.ObjectId, ref: "Note" }],
        createdAt: { type: Number, default: null, trim: true },
        updatedAt: { type: Number, default: null, trim: true },
    },
    {
        timestamps:true
    }
);

const userModel=mongoose.model("User",userSchema);
module.exports=userModel;