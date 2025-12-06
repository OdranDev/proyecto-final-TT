import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';
import productsRoutes from './routes/products.routes.js';

import notFoundMiddleware from './middlewares/notFound.middleware.js';
import errorMiddleware from './middlewares/error.middleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const rawOrigins = process.env.CORS_ORIGINS || '*';

let corsOptions = {};
if (rawOrigins === '*') {
  corsOptions = { origin: '*' };
} else {
  const allowed = rawOrigins.split(',').map(o => o.trim());
  corsOptions = {
    origin: function (origin, callback) {
      if (!origin || allowed.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('No permitido por CORS'));
    }
  };
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use('/auth', authRoutes);
app.use('/api/products', productsRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
