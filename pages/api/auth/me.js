import { asyncError, errorHandler } from "@/middlewares/error";
import { checkAuth } from "@/utils/features";


const handler = asyncError(async (req, res) => {
    if (req.method !== "GET")
        return errorHandler(res, 400, "Only GET Method is allowed");
    // console.log("I got requested");
    const user = await checkAuth(req);

    if (!user) return errorHandler(res, 401, "Login First");
    // console.log(user);
    res.status(200).json({
        success: true,
        user,
    });
});

export default handler;