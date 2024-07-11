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
// Configurando CORS
const whitelist = FRONTEND_CORS;
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.includes(origin || '') || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};
App.use((0, cors_1.default)(corsOptions));
// Middleware para CORS e Pre-flight
App.use((req, res, next) => {
    const origin = req.get('referer');
    const isWhitelisted = whitelist.includes('*') || (origin && whitelist.some(w => origin.includes(w)));
    if (isWhitelisted) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
    }
    if (req.method === 'OPTIONS')
        res.sendStatus(200);
    else
        next();
});
App.use(body_parser_1.default.json());
App.use(index_1.default);
App.get("/", (req, res) => {
    res.send(`
        <p>===================</p>
        <p>Vizioon-AI - ONLINE 🟢</p>
        <p>===================</p>
    `);
});
App.listen(PORT, (err) => {
    if (err) {
        console.error('Erro ao iniciar o servidor:', err.message);
        process.exit(1);
    }
    console.log(`Servidor iniciado na porta ${PORT}`);
});
//# sourceMappingURL=server.js.map