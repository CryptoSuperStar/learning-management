import { Router } from 'express';
import { COURSES } from '../mock/Courses';

const router = Router();

router.get('/', async (req, res) => {
  res.json(COURSES);
});

export default router;
