import express, {Application } from "express";
import http from "http" ;
import path from "path";
import cors from "cors";
import {Server as SocketIOServer} from "socket.io";
import chatRoutes from "./routes/chatRoutes";
import {SocketService} from "./services/socketService";

// Порт приложения, можно переопределеить через переменную
const PORT = Number(process.env.PORT) || 3035;

// Создаем и настраиваем экземпляр Express
const app: Application = express();

// Обработка CORS - если фронтенд будет открыт на другом домене
app.use(cors());
// Позволяем читать JSON из тела запросов (напрример, если хотим добавить POST API)
app.use(express.json());

// Восстанавливаем руть до статической папки, используем process.cwd(),
// Чтобы путь был корректен и в dev (ts-node), и в прод-сборке (node dist/...).
const publicDir = path.resolve(process.cwd(), "public");
app.use(express.static(publicDir));

// Подключаем REST-маршруты
app.use(chatRoutes);

// Простейший healthcheck для тестов
app.get("/health", (_req, res) => {
    res.json({ status: "ok"});
});

// Создаем HTTP-сервер и навешиваем на него Socket.io
const server = http.createServer(app);
const io = new SocketIOServer(server, {
    cors: {
        origin: "*",
    },
});

//Инициализируем сервис работы с сокетами
const socketService = new SocketService(io);
socketService.init();

//ЗАпускаем сервер
server.listen(PORT, () => {
    console.log(`Mario chat is running on http://localhost:${PORT}`);
});