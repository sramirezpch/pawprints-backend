import { Router } from "express";
import passport from "passport";

import authControllers from "@/controllers/auth.controllers";
const router = Router();

router.post("/login", (req, res, next) =>
  passport.authenticate(
    "local",
    (err: Error, user: Express.User | false, info: any) => {
      if (err) {
        console.error(err);
        return next(err);
      }
      if (!user) {
        console.log(user);
        return res.status(401).json({ message: "Authentication failed" });
      }
      req.logIn(user, (err) => {
        if (err) return next(err);
        return res.json({ user });
      });
    }
  )(req, res, next)
);

router.post("/register", authControllers.register);

export default router;
