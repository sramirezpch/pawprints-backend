import { NextFunction, Request, Response } from "express";

import authService from "@/service/auth.service";

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;

  try {
    const user = await authService.createUser(body);
    res.status(201).json({ user });
  } catch (error: any) {
    next(error)
  }
};

export default { register };
