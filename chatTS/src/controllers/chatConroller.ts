import { Request, Response} from "express";
import {chatModel} from "../models/chatMessage";

// HTTP
class ChatController {
    public getMessages = (_req: Request, res: Response): void => {
        const messages = chatModel.getAll();
        res.json({ messages});
    };
}

export const chatContoller = new ChatController();