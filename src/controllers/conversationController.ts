import { Controller, Get, Post, Req, Res } from "@decorators/express";
import authMiddleware, { RequestWithUser } from "../middlewares/authMiddleware";
import { Response } from "express";
import Conversation from "../entities/conversation";
import Message from "../entities/message";
import { Equal, In } from "typeorm";
import User from "../entities/user";
// @ts-ignore
@Controller('/conversations', [authMiddleware])
export default class ConversationController {


    @Get('/:conversationId/messages')
    async getMessages(@Req() req: RequestWithUser, @Res() res: Response) {

        let conversationId = Number(req.params.conversationId)
        let conversation = await Conversation.findOneBy({ id: conversationId })
        if (conversation == null) {
            return res.status(404);
        }
        let messages = await Message.find({
            where: {
                conversation: Equal(conversationId)
            },

        })

        res.json({ messages })
    }


    // @ts-ignore
    @Post('/check',)
    async log(@Req() req: RequestWithUser, @Res() res: Response) { 
        interface romanType {   
            [key: number]: string;
          } 
        const field  = "email"
        let value :any;
        let val2 : romanType;
        // console.log( typeof  req.body)
        // if (req.body)
        // if (Object.keys(req.body).length != 0)
       
        //     if (req.body[field] != null)
        //         value = req.body[field]
        // if (value == null || value.trim() == "") {
        //     return res.status(422).json({
        //         message: `The field ${field} is required`
        //     });
        // }
        // const { email    } = req.body;

        // console.log(req.body);
        // if (email == null) {
        //     console.log('no email');
        //     return res.status(422).json({
        //         message: "The username are required"
        //     });
        // }
        // const user = await User.findOne({
        //     where: { email }, select: {
        //         email: true, id: true, authToken: true
        //     }
        // });
        // if (user == null) {
        //     return res.status(401).json({
        //         message: "The email is not valid"
        //     })
        // }
        // let token = user.authToken;
        // console.log('accessed')
        // return res.json({
        //     token
        // });
    }



    @Post('/:conversationId/messages')
    async createMessage(@Req() req: RequestWithUser, @Res() res: Response) {

        let conversationId = Number(req.params.conversationId)
        let conversation = await Conversation.findOneBy({ id: conversationId })
        if (conversation == null) {
            return res.status(404);
        }
        if (req.body.text == "") {
            return res.status(422).send();
        }
        let message = new Message();
        message.conversation = conversation;
        message.user = req.user;
        message.text = req.body.text;
        try {
            await message.save();
        } catch (e) {
            console.log(e)
        }
        res.json({ message })
    }

    @Post('/')
    async createNewConversation(@Req() req: RequestWithUser, @Res() res: Response) {
        let conversation = new Conversation();

        conversation.title = req.body.title;
        let user = req.user;
        let users = await User.findBy({ id: In(req.body.users) });
        console.log(users);
        conversation.users = users;
        try {
            await conversation.save();
            return res.json(conversation);

        } catch (e) {
            console.log(e);
            return res.status(422).send();
        }
    }

    @Get('/')
    async getAllConversations(@Req() req: RequestWithUser, @Res() res: Response) {
        const conversations = await Conversation.find({
            relations: {
                messages: true,
                users: true
            }
        });
        return res.json({
            conversations: conversations
        })
    }

    @Get('/users')
    async getAllUsers(@Req() req: RequestWithUser, @Res() res: Response) {
        const users = await User.find();
        return res.json({
            users
        })
    }

}