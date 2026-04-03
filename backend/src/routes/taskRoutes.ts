import { Router } from 'express'
import { getAllTasks } from '../controllers/taskController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { getTaskById, createTask, updateTask, deleteTask, updateTaskStatus } from '../controllers/taskController.js';

const taskRoutes: Router = Router();

taskRoutes.get("/tasks", protect, getAllTasks)
taskRoutes.get("/task/:id", protect, getTaskById);
taskRoutes.post("/task", protect, createTask);
taskRoutes.put("/task/:id", protect, updateTask);
taskRoutes.delete("/task/:id", protect, deleteTask);
taskRoutes.put("/task/:id/toggle", protect, updateTaskStatus);

export default taskRoutes;