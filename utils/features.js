import { serialize } from "cookie";
import mongoose from "mongoose"
import jwt from "jsonwebtoken";
import { User } from "@/models/user";
export const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connection Established ${connection.host}`)
    }
    catch (err) {
        console.log(`There is error in connecting`)
    }
}
export const cookieSetter = (res, set, token) => {
    res.setHeader("Set-Cookie", serialize("token", set ? token : "", {
        path: '/',
        httpOnly: true,
        maxAge: set ? 15 * 24 * 60 * 60 * 1000 : 0
    }))
}

export const generateToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET)
}

export const checkAuth = async (req) => {
    const cookie = req.headers.cookie;
    // console.log(cookie);
    if (!cookie) return null;

    const token = cookie.split("=")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return await User.findById(decoded._id);
}