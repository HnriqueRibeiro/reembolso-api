import { Router } from "express";
import { usersRoutes } from "./users-routes";

const routes = Router()

//rotas publicas

routes.use("/users", usersRoutes)

export {routes}