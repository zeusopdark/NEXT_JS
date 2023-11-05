import { User } from "@/models/user";
import { connectDB, cookieSetter, generateToken } from "@/utils/features";
import bcrypt from "bcrypt"
const { asyncError, errorHandler } = require("@/middlewares/error");

const handler = asyncError(async (req, res) => {

    if (req.method != "POST") {
        return errorHandler(400, "The request should be of post type");
    }

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return errorHandler(res, 400, "Please Enter all parameters")
    }
    await connectDB();
    let user = await User.findOne({ email });

    if (user) return errorHandler(res, 400, "User already resgistered with this mail");
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
        name, email, password: hashedPassword
    })
    const token = generateToken(user._id)
    cookieSetter(res, true, token)

    res.status(201).json({
        success: true,
        message: "Registered Successfully",
        user
    })
});

export default handler;