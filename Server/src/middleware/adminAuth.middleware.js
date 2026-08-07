import jwt from "jsonwebtoken";

import User from "../models/User.js";

export const protectAdmin = async (
    req,
    res,
    next
) => {

    try {

        let token;

        if (

            req.headers.authorization &&

            req.headers.authorization.startsWith("Bearer")

        ) {

            token =
                req.headers.authorization.split(" ")[1];

        }

        if (!token) {

            return res.status(401).json({

                success: false,

                message: "No token provided.",

            });

        }

        const decoded = jwt.verify(

            token,

            process.env.JWT_SECRET

        );

        if (decoded.type !== "admin") {

            return res.status(403).json({

                success: false,

                message: "Invalid admin token.",

            });

        }

        const admin = await User.findById(decoded.id)

            .select("-password -__v");

        if (!admin) {

            return res.status(401).json({

                success: false,

                message: "Admin not found.",

            });

        }

        if (!admin.roles.includes("admin")) {

            return res.status(403).json({

                success: false,

                message: "Access denied.",

            });

        }

        req.admin = admin;

        next();

    }

    catch {

        return res.status(401).json({

            success: false,

            message: "Unauthorized.",

        });

    }

};