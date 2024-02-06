import { Router } from "express";
import jwt from 'jsonwebtoken'
import { User } from "../db";
import { isAdmin } from "../middleware";
import mongoose, { ObjectId } from "mongoose";




const router = Router();

const JWT_SECRET = process.env.JWT_SECRET

router.post('/auth', async (req, res) => {
  const { secretCode } = req.body;
  console.log('==============a req came : ' + secretCode)
  if (!secretCode) {
    return res.status(403).json({ msg: 'please provide valid secret code' });
  }
  try {
    const user = await User.findOne({ secretCode });
    if (!user) {
      return res.status(403).json({ msg: 'please provide valid secret code' });
    }

    if (!user.isAdmin) {
      return res.status(403).json({ msg: 'please provide valid secret code' });
    }

    const payload = {
      username: user?.username,
      userId: user?._id
    }
    const token = jwt.sign(payload, JWT_SECRET!);
    return res.json({ token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
})






export default router;
