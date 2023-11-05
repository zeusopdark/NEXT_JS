import { cookieSetter } from "@/utils/features";
const { asyncError, errorHandler } = require("@/middlewares/error");

const handler = asyncError(async (req, res) => {

    if (req.method != "GET") {
        return errorHandler(400, "The GET request should be of post type");
    }

    cookieSetter(res, false, null)

    res.status(200).json({
        success: true,
        message: `Logout Successfully `
    })
});

export default handler;