import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'
import { Admin, Manager } from "../db";


export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.token as string;

    if (!token) {
        return res.status(403).json({ msg: 'admin auth failled' })
    }

    try {
        const JWT_SECRET = process.env.JWT_SECRET;


        const authData = jwt.verify(token, JWT_SECRET!) as { userId: string }
        const admin = await Admin.findById(authData.userId)
        if (!admin) {
            return res.status(403).json({ msg: 'Admin authentication failed: User is not an admin' });
        }
        req.body.authData;
        next();
    } catch (err) {
        console.log(err);
        return res.status(403).json({ msg: 'admin auth failled' })
    }

}

export const isAdminOrManager = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.token as string;
    if (!token) {
        return res.status(403).json({ msg: 'admin or manager auth failled' })
    }

    try {
        const JWT_SECRET = process.env.JWT_SECRET;


        const authData = jwt.verify(token, JWT_SECRET!) as { userId: string }
        const admin = await Admin.findById(authData.userId)
        if (admin) {
            next();
        }
        const manager = await Manager.findById(authData.userId);
        if (!manager) {
            return res.status(403).json({ msg: 'admin or manager auth failled' })
        }
        next();
    } catch (err) {
        console.log(err);
        return res.status(403).json({ msg: 'admin or manager auth failled' })
    }
}