import { Request, Response, NextFunction } from "express";
import User from "../entities/user";

export interface RequestWithUser extends Request {
    user: User
}

export default async (req: RequestWithUser, res: Response, next: NextFunction) => {

    let authHeader = req.header('Authorization');
    if (authHeader == null) {
        return res.status(401).json({
            message: "Unauthenticated",
        })
    }

    let authToken = authHeader.split(' ').pop();
    if (authToken == null || authToken == authHeader) {
        return res.status(401).json({
            message: "Unauthenticated",
        })
    }

    let user = await User.findOne({
        where: { authToken }, select: {
            name: true,
            id: true,
            email: true,
            authToken: true,
            pfp: true,
        }
    });

    if (user == null) {
        return res.status(401).json({
            message: "Unauthenticated",
        })
    }

    req.user = user;
    try {
        user.lastseen = new Date().toISOString();
        await user.save();
    } catch (e) {
        console.log(e);
    }
    
    next();
}