import { Router } from "express";
import jwt from 'jsonwebtoken';
import { Manager, User } from "../db";
import { isAdmin } from "../middleware";


const JWT_SECRET = process.env.JWT_SECRET
const router = Router()

router.post('/auth', async (req, res) => {
    const { secretCode } = req.body;

    if (!secretCode) {
        return res.status(403).json({ msg: 'please provide a valid secret code' });
    }
    try {
        const user = await User.findOne({ secretCode });
        if (!user) {
            return res.status(403).json({ msg: 'please provide a valid secret code' });
        }
        const manager = await Manager.findOne({ userId: user._id });
        if (!manager) {
            return res.status(403).json({ msg: 'please provide a valid secret code' });
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

const random5digit = () => {
    const chs: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789'

    let code: string = '';
    for (let i = 0; i < 5; i++) {
        const rand = Math.floor(Math.random() * chs.length);
        console.log(rand, ' ', chs[rand])
        code += chs[rand];
    }
    return code;
}


// to add a manager (only admin can do it)
router.post('/addmanager', isAdmin, async (req, res) => {
    const { name, username } = req.body;
    if (!name || !username) {
        return res.status(400).json({ msg: 'please provide name and username' })
    }

    try {
        const newUser = new User({
            name: name,
            username: username,
            secretCode: random5digit(),
        })
        const user = await newUser.save();
        const newManager = new Manager({
            userId: user._id
        })
        await newManager.save();
        return res.json({ msg: 'a new manager added successfully' })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'some unexpected error in server' })
    }

})

// only admin can access


router.get('/all', isAdmin, async (req, res) => {
    try {
        const managersList = await Manager.find().select('+userId');
        let userList = managersList.map(async e => {
            return await User.findOne({ _id: e.userId })
        })

        return res.json({ msnsgers: userList });


    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'internal server error' })
    }

})


export default router;