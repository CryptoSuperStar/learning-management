import { Router } from 'express';
import { COURSES } from '../mock/Courses';

const router = Router();

router.get('/', (req, res) => {
  const idParam = req.query.id;
  if (idParam) {
    const id: number = parseInt(idParam as string, 10);
    const result = COURSES.filter((item: { id: number }) => item.id == id)[0];
    res.json(result);
  }
});

export default router;
