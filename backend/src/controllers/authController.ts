import { type Request, type Response } from "express";
import { prisma } from "../../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

//@desc Login a user
//@route POST /api/auth/register
//@access Public
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = await req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const foundUser = await prisma.user.findUnique({ where: { username } });

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      foundUser.passwordHash,
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const accessToken = jwt.sign(
      {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "15m",
      },
    );

    const refreshToken = jwt.sign(
      {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      // secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ accessToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//@desc Get Refresh token
//@route GET /api/auth/refresh
//@access Public
export const refresh = async (req: Request, res: Response) => {
  try{
    const cookies = req.cookies;

  if (!cookies.jwt) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const refreshToken = cookies.jwt;

  jwt.verify(refreshToken, process.env.JWT_SECRET!, async (err: any, decoded: any) => {
    if(err){
        return res.status(403).json({message: "Forbidden"})
    }   

    const findUser = await prisma.user.findUnique({ where: { id: decoded.id } })

    if(!findUser){
        return res.status(401).json({message: "Unauthorized"})
    }

    const accessToken = jwt.sign(
      {
        id: findUser.id,
        username: findUser.username,
        email: findUser.email,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "15m",
      },
    );

    return res.json({ accessToken });

  })
  }catch(error){
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//@desc Register a user
//@route POST /api/auth/register
//@access Public
export const registration = async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const foundUser = await prisma.user.findUnique({ where: { username } });

    if (foundUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        passwordHash,
        email,
      },
    });

    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//@desc Logout a user
//@route POST /api/auth/logout
//@access Public
export const logout = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies.jwt) {
    return res.sendStatus(204);
  }
  res.clearCookie("jwt", { httpOnly: true, sameSite: "none" });
  return res.json({ message: "Cookie Cleared" });
};

//@desc Get user profile
//@route GET /api/auth/profile
//@access Private
export const getUserProfile = async (req: Request, res: Response) => {
    try{
        //I don't want to return password Hash to user
        const user = await prisma.user.findUnique({ where: { id: req.userId }, omit: {passwordHash: true} });
        if(!user){
            return res.status(400).json({ message: "User Not Found"})
        }

        return res.json(user)

    }catch(error){
        return res.status(500).json({message: "Internal server error"})
    }
}

//@desc Update user profile
//@route PUT /api/auth/profile
//@access Private
export const updateUserProfile = async (req: Request, res: Response) => {
    try{
        const { username, email } = await req.body;

        if(!username || !email){
            return res.status(400).json({ message: "All fields are required"})
        }

        const updatedUser = await prisma.user.update({
            where: { id: req.userId },
            data: {
                username,
                email,
            },
        })

        return res.json(updatedUser)
    }catch(error){
        return res.status(500).json({message: "Internal server error"})
    }
}
