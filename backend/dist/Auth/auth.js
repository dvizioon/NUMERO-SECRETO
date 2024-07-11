"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.headers = exports.data = void 0;
exports.setQuestion = setQuestion;
let question = '';
const data = {
    messages: [{ "content": question, "role": "user" }],
    previewToken: null,
    userId: "6e75da85-5501-4825-ae6b-cd19543d582c",
    codeModelMode: true,
    agentMode: {},
    trendingAgentMode: {},
    isMicMode: false,
    isChromeExt: false,
    githubToken: null
};
exports.data = data;
const headers = {
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    "Date": "Tue, 09 Apr 2024 20:26:03 GMT",
    "Connection": "keep-alive",
    "CF-Ray": "871d3add5d4779f1-GIG",
    "CF-Cache-Status": "DYNAMIC",
    "Cache-Control": "private, no-cache, no-store, max-age=0, must-revalidate",
    "Content-Encoding": "gzip",
    "Set-Cookie": "sessionId=eda2d978-14ca-40c0-8b9d-8fea4d07bf98; Path=/; Expires=Sun, 08 Apr 2029 20:26:03 GMT",
    "Vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Url, Accept-Encoding",
    "rndr-id": "9f3df134-ca16-458d",
    "x-powered-by": "Next.js",
    "x-render-origin-server": "Render",
    "Server": "cloudflare",
    "alt-svc": "h3=\":443\"; ma=86400"
};
exports.headers = headers;
function setQuestion(newQuestion) {
    question = newQuestion;
    data.messages[0].content = question;
}
