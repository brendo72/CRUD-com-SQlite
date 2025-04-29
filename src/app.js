import express from "express"
import userRoutes from "./routes/userRoutes.js"
const app = express()

export default app;

app.use(express.json());

app.use("/users", userRoutes);