import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
import 'express-async-errors';
import morgan from 'morgan';

// Security Packages
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';

//production
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

// db and authenticateUser
import connectDB from './db/connect.js';

// routes
import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobsRoutes.js';

// middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import authenticateUser from './middleware/auth.js';

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// only when ready to deploy------------------
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, './client/build')));
//-------------------

app.use(express.json());
// Security Packages
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.get('/api/v1', (req, res) => {
  res.json({ msg: 'bravo' });
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);

// only when ready to deploy-------------------
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});
//-------------------------

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`server is running on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
