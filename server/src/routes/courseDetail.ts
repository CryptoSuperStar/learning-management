import { Router } from 'express';
import { COURSES } from '../mock/Courses';

const router = Router();

router.get('/', (req, res) => {
  const idParam = req.query.id;
  if (idParam) {
    const id: number = parseInt(idParam as string, 10); // id is a mostly string in real life cases
    const result = COURSES.find((item: { id: number }) => item.id == id);
    res.json(result);
  }
});

export default router;
