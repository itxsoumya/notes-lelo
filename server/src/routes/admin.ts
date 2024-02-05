import { Router } from "express";
import jwt from 'jsonwebtoken'
import { Admin, Manager, User } from "../db";
import { isAdmin } from "../middleware";


const router = Router();

const JWT_SECRET = process.env.JWT_SECRET

router.post('/auth', async (req, res) => {
    const { secretCode } = req.body;
    if (!secretCode) {
        return res.status(403).json({ msg: 'please provide valid secret code' });
    }
    try {
        const user = await User.findOne({ secretCode });
        if (!user) {
            res.status(403).json({ msg: 'please provide valid secret code' });
        }
        const admin = await Admin.findOne({ userId: user?._id });
        if (!admin) {
            res.status(403).json({ msg: 'please provide valid secret code' });
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