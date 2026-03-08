import express from "express";
import authRoutes from "./routes/auth.route.ts"
import dotenv from "dotenv"
import { connectDB } from "./lib/db.ts";
import cookieParser from "cookie-parser"

const app = express();
dotenv.config()
const PORT = process.env.PORT

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth" , authRoutes);

app.listen(PORT , () => {
    console.log(`server is running on port : ${PORT} `);
    connectDB()
});
