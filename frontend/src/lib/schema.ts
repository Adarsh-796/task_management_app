import { z } from "zod";

export const registrationSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const TaskStatus = z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]);
export const Priority = z.enum(["LOW", "MEDIUM", "HIGH"]);

export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: TaskStatus,
  priority: Priority,
  dueDate: z.string().optional(),
});
