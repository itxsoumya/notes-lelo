import { Router } from "express";
import jwt from 'jsonwebtoken';
import { User } from "../db";
import { isAdmin, isAdminOrManager } from "../middleware";


const JWT_SECRET = process.env.JWT_SECRET
const router = Router()


router.post('/me', isAdminOrManager, async (req, res) => {
  try {
    const user = await User.findById(req.body.authData.userId).select('-secretCode');
    if (!user) {
      return res.status(403).json({ msg: 'not a manager / admin' });
    }
    return res.json(user)
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
})

router.post('/auth', async (req, res) => {
  const { secretCode } = req.body;

  if (!secretCode) {
    return res.status(403).json({ msg: 'please provide a valid secret code' });
  }
  try {
    const user = await User.findOne({ secretCode }).select('-secretCode');
    if (!user) {
      return res.status(403).json({ msg: 'please provide a valid secret code' });
    }
    if (user && !user.isManager) {

      return res.status(403).json({ msg: 'please provide a valid secret code' })
    }
    const payload = {
      username: user?.username,
      userId: user?._id
    }
    const token = jwt.sign(payload, JWT_SECRET!);
    return res.json({ token,user });
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
      isManager: true
    })
    const user = await newUser.save();

    return res.json({ msg: 'a new manager added successfully' })

  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'some unexpected error in server' })
  }

})

// only admin can access

// it will return all available managers
router.get('/all', isAdmin, async (req, res) => {
  try {
    const managersList = await User.find({ isManager: true })
    return res.json({ managersList });


  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'internal server error' })
  }

})


export default router;
