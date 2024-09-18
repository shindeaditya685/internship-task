import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

//routes import
import serviceRouter from "./routes/service.route.js";

// routes declaration
app.use("/api/v1/services", serviceRouter);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use(errorHandler);

export { app };
