import express from 'express';
import cors from 'cors';
import apiRoute from './router/apiRoutes';


const app = express();

app.use(cors());

app.use(express.json());

app.use('/api',apiRoute);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
