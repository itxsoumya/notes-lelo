import { Router } from "express";
import AdminRoute from './admin';
import ManagerRoute from './manager';
import NotesRoute from './notes';

const router = Router();

router.get('/manager', ManagerRoute);
router.get('/notes', NotesRoute);
router.get('/admin', AdminRoute);




export default router;