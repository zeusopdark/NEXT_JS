import { User } from "@/models/user";
import { connectDB, cookieSetter, generateToken } from "@/utils/features";
import bcrypt from "bcrypt"
const { asyncError, errorHandler } = require("@/middlewares/error");

const handler = asyncError(async (req, res) => {

    if (req.method != "POST") {
        return errorHandler(400, "The request should be of post type");
    }

    const { email, password } = req.body;
    if (!email || !password) {
        return errorHandler(res, 400, "Please Enter all parameters")
    }
    await connectDB();
    const user = await User.findOne({ email }).select("+password");

    if (!user) return errorHandler(res, 400, "Inavlid Mail or Password");
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return errorHandler(res, 400, "Inavlid Mail or Password");
    }
    const token = generateToken(user._id)
    cookieSetter(res, true, token)

    res.status(200).json({
        success: true,
        message: `Welcome back ${user.name} `,
        user
    })
});

export default handler;