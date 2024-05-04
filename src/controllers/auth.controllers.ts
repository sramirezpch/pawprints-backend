import { Request, Response } from "express";

import authService from "@/service/auth.service";

const register = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const user = await authService.createUser(body);
    res.status(201).json({ user });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

export default { register };
