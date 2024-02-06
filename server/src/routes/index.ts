import { Router } from "express";
import AdminRoute from './admin';
import ManagerRoute from './manager';
import NotesRoute from './notes';

const router = Router();

router.use('/manager', ManagerRoute);
router.use('/notes', NotesRoute);
router.use('/admin', AdminRoute);




export default router;