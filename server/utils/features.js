import mongoose from "mongoose";
import jwt from "jsonwebtoken" ; 
import { v4 as uuid } from "uuid";
import { v2 as cloudinary } from "cloudinary";
import { getBase64 } from "../lib/helper.js";

const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: "none",
  httpOnly: true,
  secure: true,
};

const connectDB = (uri) => {
  mongoose
    .connect(uri, { dbName: "partha" })
    .then((data) => console.log(`Connected to DB: ${data.connection.host}`))
    .catch((err) => {
      throw err;
    });
};

const sendToken = (res, user, code, message) => {
  const token = jwt.sign({ _id: user._id}, process.env.JWT_SECRET);
  


  return res.status(code).cookie("pjc-token", token,cookieOptions).json({
    success:  true,
    message,
     });
};
const emitEvent = (req,event,user,data) => {
  console.log("Emmiting event",event);
};

// const uploadFilesToCloudinary = async (files = []) => {
//   const uploadPromises = files.map((file) => {
//     return new Promise((resolve, reject) => {
//       cloudinary.uploader.upload(
//         getBase64(file),
//         {
//           resource_type: "auto",
//           public_id: uuid(),
//         },
//         (error, result) => {
//           if (error) return reject(error);
//           resolve(result);
//         }
//       );
//     });
//   })}

const deleteFilesFromCloudnary = async (public_ids) => {
   //delete files from cloudinary
}

export { connectDB, sendToken,cookieOptions ,emitEvent,deleteFilesFromCloudnary};
