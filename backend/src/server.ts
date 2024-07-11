import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './Router/index';
import path from 'path';
import bodyParser from 'body-parser';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const PORT = process.env.PORT || 3000;
const FRONTEND_CORS: string[] = JSON.parse(process.env.LIBERAR_CORS || '[]');

const App = express();

// Configurando CORS
const whitelist = FRONTEND_CORS;
const corsOptions: cors.CorsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (whitelist.includes(origin || '') || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};

App.use(cors(corsOptions));

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
    if (req.method === 'OPTIONS') res.sendStatus(200);
    else next();
});

App.use(bodyParser.json());
App.use(routes);

App.get("/", (req, res) => {
    res.send(`
        <p>===================</p>
        <p>Vizioon-AI - ONLINE 🟢</p>
        <p>===================</p>
    `)
});

App.listen(PORT, (err?: NodeJS.ErrnoException) => {
    if (err) {
        console.error('Erro ao iniciar o servidor:', err.message);
        process.exit(1);
    }

    console.log(`Servidor iniciado na porta ${PORT}`);
});
