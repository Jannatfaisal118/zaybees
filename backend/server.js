// server.js
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import paymentRouter from "./routes/paymentRoute.js";
import reviewRouter from "./routes/reviewRoute.js";
import voucherRouter from "./routes/voucherRoute.js";
import translateRouter from "./routes/translateRoute.js";
import dashboardRouter from "./routes/dashboardRoute.js";
import customerRouter from "./routes/customerRoute.js";
import settingsRouter from './routes/settingsRoute.js';
import path from "path";

// App Config
const app = express()
const port = process.env.PORT || 4000
connectDB();
connectCloudinary();

// middlewares
app.use(express.json())

// ✅ CORS configuration
app.use(cors({
  origin: "https://zaybees-frontend.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// api endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)
app.use("/api/payment", paymentRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/voucher", voucherRouter);
app.use("/api/translate", translateRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/customers", customerRouter);
app.use('/api/settings', settingsRouter)

app.get('/', (_req, res) => {
  res.send('API working')
})

app.listen(port, () => console.log('Server started on PORT:', port))
