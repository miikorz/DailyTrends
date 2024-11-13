import express from 'express';
import { SERVER_STATUS } from './api/apiConstants';
import router from './api/routes';

const app = express();

app.use(express.json());

// Routes
app.use('/', router);

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      code: SERVER_STATUS.INTERNAL_SERVER_ERROR,
    },
    data: null
  });
});

export default app;
