import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import productsRoutes from './routes/products.routes.js'
import gastosRoutes from './routes/gastos.routes.js'
import datosRoutes from './routes/dato.routes.js'


const app = express();

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());


app.use('/api',productsRoutes);
app.use('/api',gastosRoutes);
app.use('/api',datosRoutes);



export default app;