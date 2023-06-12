//src\database.ts
import { DataSource } from "typeorm";
import User from "./entities/user";
import Conversation from "./entities/conversation";
import Message from "./entities/message";
import Attachment from "./entities/attachment";

const source = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    database: "chat",
    username: "postgres",
    password: "root",
    entities: [
        User,
        Conversation,
        Message,
        Attachment
    ],
    synchronize: true
})

export default source;