import express from "express"
import { getAllUsers } from "../controller/userControllers.js";
const routes = express.Router()
import { novouser } from "../controller/userControllers.js";
routes.get("/", novouser);
routes.get("/", getAllUsers);

export default routes
