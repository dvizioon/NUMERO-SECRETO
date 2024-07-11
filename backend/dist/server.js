"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./Router/index"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
const PORT = process.env.PORT || 3000;
const FRONTEND_CORS = JSON.parse(process.env.LIBERAR_CORS || '[]');
const App = (0, express_1.default)();
App.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (FRONTEND_CORS.indexOf(origin) !== -1 || !origin) {
            // console.log(origin)
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: false
}));
App.use(body_parser_1.default.json());
App.use(index_1.default);
App.listen(PORT, (err) => {
    if (err) {
        console.error('Erro ao iniciar o servidor:', err.message);
        process.exit(1);
    }
    console.log(`Servidor iniciado na porta ${PORT}`);
});
