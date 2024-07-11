"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerAsk = void 0;
const express_1 = __importDefault(require("express"));
const QuestionController_1 = require("../Controller/QuestionController");
const routerAsk = express_1.default.Router();
exports.routerAsk = routerAsk;
// Rota para enviar uma pergunta
routerAsk.post('/model/dvizioon/ask', QuestionController_1.askQuestion);
//# sourceMappingURL=QuestionRouter.js.map