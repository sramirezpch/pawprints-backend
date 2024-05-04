import express from "express";
import session from "express-session";
import passport from "passport";
import bcrypt from "bcryptjs";
import { Strategy as LocalStrategy } from "passport-local";

import { NODE_ENV, SESSION_SECRET } from "./utils/env";
import { User } from "@/models/user.model";
import authRoutes from "@/routes/auth.routes";
import authService from "./service/auth.service";
import middleware from "./middleware";

const app = express();

const sevenDays = 7 * 24 * 60 * 60 * 1000;
const thirtyDays = 30 * 24 * 60 * 60 * 1000;

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: NODE_ENV === "production" ? true : false,
      httpOnly: true,
      maxAge: NODE_ENV === "production" ? sevenDays : thirtyDays,
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      const user = await User.findOne({ where: { email } });
      console.log(user);
      if (!user) {
        return done(null, false, { message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return done(null, false, { message: "Incorrect password" });
      return done(null, user);
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await authService.findUserById(id);
    if (!user) return done("No user found", null);
    return done(null, user);
  } catch (error) {
    console.error(error);
    return done(error, null);
  }
});

app.use("/api", authRoutes);

app.use(middleware.sequelizeErrorHandler);

app.get("/", middleware.isAuthenticated, (req, res) => {
  return res.json({ message: "Authenticated!", user: req.user });
});

app.listen(8080, () => console.log("listening on 8080"));
