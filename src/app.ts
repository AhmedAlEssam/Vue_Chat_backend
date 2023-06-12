import express from "express";
import "reflect-metadata";
import database from "./database";
import User from "./entities/user";
import Conversation from "./entities/conversation";
import Message from "./entities/message";
import seeding from "./seeds"
import { generateToken, hash, verify } from "./helpers/hash";
import { attachControllers } from "@decorators/express";
import AuthController from "./controllers/authController";
import ConversationController from "./controllers/conversationController";
import cors from "cors";
import { FRONTEND_URL } from './config';
const app = express();

app.use(express.json())
const port = 3000;

app.use(cors());
//  app.use( cors({ origin: FRONTEND_URL })); 

const launch = async () => {

    await database.initialize().then(dataSource => {
        console.log(`The database connected successfully`);
    }).catch(error => {
        console.log(error);
    });

    //seeding 
    const users = await User.find();
    if (users.length == 0) {
        console.log('thier is no data, iniate seeding');
        // imported as {import seeding from "./seeds"}
        await seeding()
    }


    await attachControllers(app, [AuthController, ConversationController]);

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })

}

 
launch(); 