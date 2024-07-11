import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './Router/index';
import path from 'path';
import bodyParser from 'body-parser';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const PORT = process.env.PORT || 3000;
const FRONTEND_CORS = JSON.parse(process.env.LIBERAR_CORS || '[]');

const App = express();

App.use(cors({
    origin: (origin, callback) => {
        if (FRONTEND_CORS.indexOf(origin) !== -1 || !origin) {
            // console.log(origin)
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: false
}));

App.use(bodyParser.json());
App.use(routes)

App.listen(PORT, (err?: NodeJS.ErrnoException) => {
    if (err) {
        console.error('Erro ao iniciar o servidor:', err.message);
        process.exit(1);
    }

    console.log(`Servidor iniciado na porta ${PORT}`);
});

