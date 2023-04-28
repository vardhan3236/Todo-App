import jwt from "jsonwebtoken";

export const sendCookie = (user, res, message, statusCode = 200) => {

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    console.log("Token generated while logging in", token);  
    res
        .status(statusCode)
        .cookie(
            'token', token, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
            sameSite: "lax",
            secure: false
        }
        )
        .json({
            success: true,
            message,
        });
        console.log("Whole Request Object", req);
        console.log("Fetching Token in sendCookie()", req.cookies.token);
};