import jwt  from "jsonwebtoken";
import { type Request, type Response, type NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      username?: string;
      userId?: string;
      email?: string;
    }
  }
}

export const protect = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;

        if(!token && token?.startsWith("Bearer ")){
            return res.status(401).json({message: "Unauthorized"})
        }

        const accessToken = token?.split(" ")[1];

        const decoded = jwt.verify(accessToken!, process.env.ACCESS_TOKEN!, async (err: any, decoded: any) => {
            if(err){
                return res.status(403).json({ messages: 'Forbidden'})
            }

            req.username = decoded.username;
            req.userId = decoded.userId;
            req.email = decoded.email
            next();
        })

    } catch (error) {
        return res.status(401).json({ message: "Not Authorized" });
    }
}
