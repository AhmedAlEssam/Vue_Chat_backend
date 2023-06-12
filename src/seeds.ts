//seeds.ts
import User from './entities/user'
import Conversation from './entities/conversation'
import Message from './entities/message'
import { generateToken, hash } from "./helpers/hash";


const seeding    = async (): Promise<number> =>  {

    await createUser('1', 'Ahmed', 'a@b.c', '123', 'male', 'src/assets/imgs/default-pfp-m.svg')
    await createUser('2', 'Azzam', 'azzam@b.c', '123', 'male', 'src/assets/imgs/default-pfp-m.svg')
    await createUser('3', 'Rawan', 'rawan@b.c', '123', 'female', 'src/assets/imgs/default-pfp-f.svg')
    await createConv(1, 'test conv', [2], 'src/assets/imgs/default-pfp-m.svg')
    await createConv(2, 'Rawan', [3], 'src/assets/imgs/default-pfp-f.svg')
    await createConv(3, 'New Group', [3, 2], 'src/assets/imgs/default-group-p.svg')
    await createMsg(1,1,'Hello Azzam')
    await createMsg(1,2,'Hello Ahmed :)')
    await createMsg(2,1,'Hey Rawan, How R U?! ')
    await createMsg(2,3,'هلو احمد شلونك')
    await createMsg(3,2,'هلو شباب شلونكم')
    await createMsg(3,1,'Hi')
    await createMsg(3,3,'Hello')
    console.log('seeding new data complete')
    return 0;
}
const createUser = async (id: any, name: any, email: any, password: any, gender: any, pfp: any) => {
    let user = new User();
    let token = generateToken({
        userId: id,
    })
    user.name = name;
    user.email = email;
    user.password = await hash(password);
    user.authToken = token
    user.gender = gender
    user.pfp = pfp
    try {
        await user.save();
    } catch (error: any) {
        console.log(error)
    }
}

const createConv = async (id: any, title: any, users: any, imgUrl: any) => {
    let conversation = new Conversation();
    conversation.id = id;
    conversation.title = title;
    conversation.users = users;
    conversation.imgUrl = imgUrl;
    try {
        await conversation.save();
    } catch (e) {
        console.log(e);
    }
}

const createMsg = async (convId: any, user: any, text: any) => {
    let message = new Message();
    message.user = user;
    message.text = text;
    message.conversation = convId;
    try {
        await message.save();
    } catch (e) {
        console.log(e)
    }
}

export default seeding 