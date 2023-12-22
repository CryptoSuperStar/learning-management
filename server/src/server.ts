// why is it TS file without types ?
import express from 'express';
import cors from 'cors';
import courseListRouter from './routes/courseList';
import courseDetailRouter from './routes/courseDetail';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/course_detail', courseDetailRouter);
app.use('/api/course_list', courseListRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
