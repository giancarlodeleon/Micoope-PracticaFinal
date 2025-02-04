import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import productsRoutes from './routes/products.routes.js'
import clientRoutes from './routes/client.routes.js'
import usersRoutes from './routes/user.routes.js'
import rolRoutes from './routes/rol.routes.js'
import historialRoutes from './routes/historial.routes.js'
import solicitudRoutes from './routes/solicitud.routes.js'
import pedidoRoutes from './routes/pedido.routes.js'
import gastoRoutes from './routes/gasto.routes.js'
import ventaRoutes from './routes/venta.routes.js'
import proveedorRoutes from './routes/proveedor.routes.js'
import solicitud_compraRoutes from './routes/solicitud_compra.routes.js'
import pedido_compraRoutes from './routes/pedido_compra.routes.js'


const app = express();

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/api',authRoutes);
app.use('/api',clientRoutes);
app.use('/api',productsRoutes);
app.use('/api',usersRoutes);
app.use('/api',rolRoutes);
app.use('/api',historialRoutes);
app.use('/api',solicitudRoutes);
app.use('/api',pedidoRoutes);
app.use('/api',gastoRoutes);
app.use('/api',ventaRoutes);
app.use('/api',proveedorRoutes);
app.use('/api',pedido_compraRoutes);
app.use('/api',solicitud_compraRoutes);


export default app;