import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import productsRoutes from './routes/products.routes.js'
import usersRoutes from './routes/user.routes.js'
import agenciasRoutes from './routes/agencia.routes.js'
import rolRoutes from './routes/rol.routes.js'
import boletaRoutes from './routes/boleta.routes.js'
import movimientoRoutes from './routes/movimiento.routes.js'
import salidaRoutes from './routes/salida.routes.js'


const app = express();

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/api',authRoutes);
app.use('/api',productsRoutes);
app.use('/api',usersRoutes);
app.use('/api',agenciasRoutes);
app.use('/api',rolRoutes);
app.use('/api',boletaRoutes);
app.use('/api',movimientoRoutes);
app.use('/api',salidaRoutes);



export default app;