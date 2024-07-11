"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const QuestionRouter_1 = require("./QuestionRouter");
const routes = (0, express_1.Router)();
routes.use(QuestionRouter_1.routerAsk);
exports.default = routes;
