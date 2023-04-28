import express from "express";
import { connectDB } from "./data/database.js";
import  userRouter  from "./routes/user.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import  taskRouter  from "./routes/task.js";
import cors from "cors";
const app = express();

config({
    path: "./data/config.env"
})

connectDB();

app.listen(4000, () => {
    console.log(`Server is working fine at port ${process.env.PORT} and in ${process.env.NODE_ENV} mode`);
});

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    methods:["GET", "PUT", "DELETE", "POST"],
    credentials: true,
    exposedHeaders: ["set-cookie"]
}))
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);
app.get("/", (req, res) => {
    res.send("Nice Working !!");
})
app.use(errorMiddleware);

