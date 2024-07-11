import { Router } from "express";
import { routerAsk } from "./QuestionRouter";

const routes = Router();

routes.use(routerAsk);

export default routes;
