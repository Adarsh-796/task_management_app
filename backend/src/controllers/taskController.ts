import { type Request, type Response } from "express";
import { prisma } from "../../lib/prisma.js";

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "UserId is required" });
    }

    const tasks = await prisma.task.findMany({
      where: {
        userId: id,
      },
    });

    return res.json(tasks);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.body;

    if (!taskId) {
      return res.status(400).json({ message: "Task Id should be sent " });
    }

    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      return res.status(400).json({ message: "Task Not Found" });
    }

    return res.json(task);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, userId, status, priority } = req.body;

    if (!title || !userId || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId,
        status,
        priority,
      },
    });

    return res.json(task);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { taskId, title, description, status, priority } = req.body;

    if (!taskId) {
      return res.status(400).json({ message: "Task Id is required" });
    }

    const task = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        title,
        description,
        status,
        priority,
      },
    });

    return res.json(task);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.body;

    if (!taskId) {
      return res.status(400).json({ message: "Task Id is required" });
    }

    const task = await prisma.task.delete({
      where: {
        id: taskId,
      },
    });

    return res.json(task);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateTaskStatus = async(req: Request, res: Response) => {
  try {
    const {taskId, status} = req.body;

    if(!taskId || !status){
      return res.status(400).json({ message: "Task Id and Status are required"})
    }

    const task = await prisma.task.update({
      where: {
        id: taskId
      },
      data: {
        status
      }
    })

    return res.json(task)
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error"})
  }
}