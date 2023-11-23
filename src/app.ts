import cors from 'cors';
import express, { Application, Request, Response } from 'express';
const app: Application = express();

//parser

app.use(express.json());
app.use(cors());

const getAController = (req: Request, res: Response) => {
  res.send('Hello World!');
};

app.get('/', getAController);

export default app;
