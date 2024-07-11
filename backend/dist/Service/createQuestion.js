"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeApiRequest = makeApiRequest;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const auth_1 = require("../Auth/auth");
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
const URL_API = process.env.API || 'https://www.blackbox.ai/api/chat';
function makeApiRequest(question) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, auth_1.setQuestion)(question);
            const apiUrl = URL_API;
            const requestOptions = {
                method: 'POST',
                headers: auth_1.headers,
                body: JSON.stringify(auth_1.data)
            };
            const response = yield fetch(apiUrl, requestOptions);
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
            }
            const responseData = yield response.text();
            // console.log('Resposta da API (texto):', responseData);
            return responseData;
        }
        catch (error) {
            console.error('Erro na requisição:', error);
            throw error;
        }
    });
}
