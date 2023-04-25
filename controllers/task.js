import { Task } from "../models/task.js";
import ErrorHandler from "../middlewares/error.js";

export const newTask = async (req, res, next) => {

    try {
        const { title, description } = req.body;
        await Task.create({
            title,
            description,
            user: req.user
        });

        res.status(200).json({
            success: true,
            message: "Task Created Successfully"
        });
    }

    catch (error) {
        next(error);
    }
}

export const getTask = async (req, res, next) => {

    try {
        const id = req.user._id;
        const tasks = await Task.find({ user: id });
        res.status(200).json({
            success: true,
            tasks
        });
    }

    catch (error) {
        next(error);
    }
}

export const updateTask = async (req, res, next) => {

    try {

        const task = await Task.findById(req.params.id);

        if (!task)
            return next(new ErrorHandler("Task Not Found !", 404));

        task.isCompleted = !task.isCompleted;
        await task.save();

        res.status(201).json({
            success: true,
            message: "Task Updated !!"
        });

    }
    catch (error) {
        next(error);
    }
}

export const deleteTask = async(req, res, next) => {

    try {
    const task = await Task.findById(req.params.id);
    if(!task) return next(new ErrorHandler("Task Not Found !!", 404));

    task.deleteOne();

    res.status(202).json({
        success: true,
        message: "Task Deleted Successfully"
    });
}
catch(error) {
    next(error);
}
}