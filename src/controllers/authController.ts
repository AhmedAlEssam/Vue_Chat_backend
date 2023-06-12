import { Controller, Get, Post, Req, Res } from "@decorators/express";
import { Request, Response } from "express";
import User from "../entities/user";
import { generateToken, hash, verify } from "../helpers/hash";
import authMiddleware, { RequestWithUser } from "../middlewares/authMiddleware";

@Controller('/auth')
export default class AuthController {

    // @ts-ignore
    @Get('/me', [authMiddleware])
    async me(@Req() req: RequestWithUser, @Res() res: Response) {
        return res.json({ user: req.user })
    }

    @Post('/signup')
    async signup(@Req() req: Request, @Res() res: Response) {
        let fields = ["name", "email", "password"];
        fields.forEach(field => {
            let value = req.body[field];
            if (value == null || value.trim() == "") {
                return res.status(422).json({
                    message: `The field ${field} is required`
                });
            }
        });
        const { name, email, password } = req.body;
        let user = new User();
        let token = generateToken({
            userId: user.id,
        })
        user.name = name;
        user.email = email;
        user.password = await hash(password);
        user.authToken = token
        try {
            await user.save();
        } catch (error: any) {
            return res.status(422).json({
                message: error?.message ?? "Something went wrong."
            })
        }
        return res.json({
            user,
            token,
        });
    }

    @Post('/login')
    async login(@Req() req: Request, @Res() res: Response) {
        const { email, password } = req.body;

        if (email == null || password == null) {
            return res.status(422).json({
                message: "The username and password are required"
            });
        }

        console.log(req.body);
        const user = await User.findOne({
            where: { email }, select: {
                email: true, password: true, id: true, pfp: true, name: true
            }
        });

        if (user == null) {
            return res.status(401).json({
                message: "The username or password is incorrect"
            })
        }

        const verified = await verify(password, user.password);
        if (verified) {
            let token = generateToken({
                userId: user.id,
                email: user.email
            });
            
            user.authToken = token;
            try {
                await user.save();
            } catch (error) {
                return res.status(500).json({
                    message: "Something went wrong."
                })
            }
            return res.json({
                token, user
            });
        }

        return res.status(401).json({
            message: "The username or password is incorrect"
        })
    }

    // @ts-ignore
    @Post('/logout', [authMiddleware])
    async logout(@Req() req: RequestWithUser, @Res() res: Response) {
        const { email } = req.body;

        const user = await User.findOne({
            where: { email }, select: {
                email: true, password: true, id: true, authToken: true
            }
        });

        if (user != null) {
            user.authToken = '';
            try {
                await user.save();
                return res.send('خل نشوفكم')
            } catch (error) {
                return res.status(500).json({
                    message: "Something went wrong."
                })
            }
        }
    }
}