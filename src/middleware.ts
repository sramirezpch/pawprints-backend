import { NextFunction, Request, Response } from "express";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) =>
  req.isAuthenticated()
    ? next()
    : res.status(401).json({ message: "Access denied. Please log in" });

export default { isAuthenticated };
