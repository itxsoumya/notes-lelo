import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'
import { User } from "../db";


export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.token as string;
  console.log('token: ', token)

  if (!token) {
    return res.status(403).json({ msg: 'admin auth failled' })
  }

  try {
    const JWT_SECRET = process.env.JWT_SECRET;


    const authData = jwt.verify(token, JWT_SECRET!) as { userId: string }
    const admin = await User.findById(authData.userId)
    if (!admin || !admin.isAdmin) {
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
  // console.log(token+'--000-000  is admin or manager check')
  if (!token) {
    return res.status(403).json({ msg: 'admin or manager auth failled' })
  }

  try {
    const JWT_SECRET = process.env.JWT_SECRET;


    const authData = jwt.verify(token, JWT_SECRET!) as { userId: string }
    const admin = await User.findById(authData.userId)
    if (admin && admin.isAdmin) {
      req.body.authData = authData
      next();
    } else if (admin && !admin.isManager) {
      return res.status(403).json({ msg: 'admin or manager auth failled' })
    } else {

      req.body.authData = authData
      next();
    }
  } catch (err) {
    console.log(err);
    return res.status(403).json({ msg: 'admin or manager auth failled' })
  }
}
