import session from "cookie-session";
import cors from "cors";
import "dotenv/config";
import express from "express";
import { config } from "./config/app.config";
import connectDatabase from "./config/database.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";

import passport from "passport";
import "./config/passport.config";
import isAuthenticated from "./middlewares/isAuthenticated.middleware";
import authRoutes from "./routes/auth.route";
import memberRoutes from "./routes/member.route";
import projectRoutes from "./routes/project.route";
import taskRoutes from "./routes/task.route";
import userRoutes from "./routes/user.route";
import workspaceRoutes from "./routes/workspace.route";

const app = express();
const BASE_PATH = config.BASE_PATH;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    name: "session",
    keys: [config.SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000,
    secure: config.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Allow multiple origins via comma-separated FRONTEND_ORIGIN
const allowedOrigins = (config.FRONTEND_ORIGIN || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser clients or same-origin
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error(`CORS: Origin ${origin} not allowed`));
    },
    credentials: true,
  })
);

app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/user`, isAuthenticated, userRoutes);
app.use(`${BASE_PATH}/workspace`, isAuthenticated, workspaceRoutes);
app.use(`${BASE_PATH}/member`, isAuthenticated, memberRoutes);
app.use(`${BASE_PATH}/project`, isAuthenticated, projectRoutes);
app.use(`${BASE_PATH}/task`, isAuthenticated, taskRoutes);

app.use(errorHandler);

app.listen(config.PORT, async () => {
  console.log(`Server listening on port ${config.PORT} in ${config.NODE_ENV}`);
  await connectDatabase();
});
