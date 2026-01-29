import { Router} from "express";
import { chatContoller } from "../controllers/chatConroller";

// Роутер слоя Controller для REST-эндпоинтов
const router = Router();

// Отдаем историю сообщений
router.get("/api/messages", chatContoller.getMessages);

export default router;