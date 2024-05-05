import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { Error as SequelizeError, DatabaseError } from "sequelize";

import utils from "@/utils";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) =>
  req.isAuthenticated()
    ? next()
    : res.status(401).json({ message: "Access denied. Please log in" });

const sequelizeErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof SequelizeError) {
    const formatedError = utils.formatSequelizeError(err);
    return res.status(400).json({ errors: { ...formatedError } });
  } else if (err instanceof DatabaseError) {
    console.log("Database error:", { name: err.name, message: err.message });
  } else {
    console.log("Unknown error: ", err);
    return res.status(500).json({
      error: err.message || "Unknown error, please see the server logs.",
    });
  }
};

export default { isAuthenticated, sequelizeErrorHandler };
