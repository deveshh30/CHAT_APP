import type { Request, Response, NextFunction } from "express";
import User from "../models/user.model.ts"
import jwt from "jsonwebtoken"

interface JwtPayload {
    userId: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.jwt;

        if(!token) {
            return res.status(401)
            .json({ message: "un authorized request, no token is provided"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

        if(!decoded) {
            return res.status(401)
            .json({ message : "Invalid Token"})
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user) {
            return res.status(404)
            .json({message : "User not found"})
        }

        req.user = user 
        next()
    } catch (error) {
        console.log("error in protectRoute middleware", error);
        res.status(500).json({ message: "Internal server error" });
    }
}