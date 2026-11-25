const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");


const server = http.createServer((request, response) => {
    // Egyszerű CORS-beállítás: a böngésző engedélyezi a szerver válaszait.
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    if (request.method === "OPTIONS") {
        response.writeHead(204);
        response.end();
        return;
    }


    const staticFiles = {
        "style.css": { file: "css/style.css", contentType: "text/css; charset=utf-8" },
        "script.js": { file: "js/script.js", contentType: "text/javascript; charset=utf-8" },
    };


    const staticFile = staticFiles[request.url];

    console.log(staticFiles)

    if (request.method === "GET" && staticFile) {
        fs.readFile(path.join(__dirname, staticFile.file), (error, content) => {
            if (error) {
                response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
                response.end("A felület fájljai most nem érhetők el.");
                return;
            }

            response.writeHead(200, { "Content-Type": staticFile.contentType });
            response.end(content);
        });
        return;
    }


    const url = new URL(request.url, "http://localhost:8080");

    if (request.method === "GET" && url.pathname === "/") {
        fs.readFile(path.join(__dirname, "index.html"), (error, content) => {
            if (error) {
                response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
                response.end("A felület fájljai most nem érhetők el.");
                return;
            }

            response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            response.end(content);
        });
        return;
    }

    response.writeHead(404, "Content-Type: charset=utf-8");
    response.end("Nincs ilyen útvonal.");
});

server.listen(8080, "127.0.0.1", () => {
    console.log("A szerver fut: http://127.0.0.1:8080");
});
