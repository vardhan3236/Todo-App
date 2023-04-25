import { deleteTask, getTask, newTask, updateTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";
import express from "express";
const router = express.Router();

router.post("/new", isAuthenticated, newTask);
router.get("/getTask", isAuthenticated, getTask);
router
    .route("/:id")
    .put(isAuthenticated, updateTask)
    .delete(isAuthenticated, deleteTask)

export default router;