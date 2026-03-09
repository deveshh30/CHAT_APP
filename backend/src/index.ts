import express from "express";
import authRoutes from "./routes/auth.route.ts"
import dotenv from "dotenv"
import { connectDB } from "./lib/db.ts";
import cookieParser from "cookie-parser"
import messageRoute from "./routes/message.route.ts"

const app = express();
dotenv.config()
const PORT = process.env.PORT

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth" , authRoutes);
app.use("/api/message" , messageRoute);

app.listen(PORT , () => {
    console.log(`server is running on port : ${PORT} `);
    connectDB()
});
