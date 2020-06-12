const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const chatScheme = new Schema({
    ownerId: ObjectId,
    person1: String,
    person2: String,
    messages: {
        type: [ObjectId],
        required: true
    }
}, { versionKey: false });

const chat = mongoose.model("chat", chatScheme);

class Chat {
    constructor(chatData) {
        this.ownerId = chatData.ownerId;
        this.person1 = chatData.person1;
        this.person2 = chatData.person2;
        this.messages = chatData.messages;
    }
    
    static getAllByOwnerId(ownerId) {
        return chat.find({ ownerId:  ownerId});
    }

    static getById(id) {
        return chat.findById(id).exec();
    }

    static getByIdAndPersons(ownerId, personX, personY)
    {
        return chat.findOne({ $and: [
            { ownerId: ownerId },
            { person1: { $in: [personX, personY] } }, 
            { person2: { $in: [personX, personY] } }
        ] }).exec();
    }

    static async insert(chatParams) {
        const newChat = new Chat(chatParams);
        const promiseChat = await new chat(newChat).save();

        return promiseChat._id;
    }

    static update(id, newChat) {
        return chat.findByIdAndUpdate(id, newChat, { new: true }).exec();
    }

    static deleteById(id) {

        return chat.deleteOne({ _id: id }).exec();
    }

    static async createMail(ownerId, person1, person2, messId) {
        const promiseChat = await Chat.getByIdAndPersons(ownerId, person1, person2);

        if (!promiseChat) {
            Chat.insert({
                ownerId: ownerId, 
                person1: person1, 
                person2: person2, 
                messages: [messId] 
            });
        } else {
            promiseChat.messages.push(messId);
            Chat.update(promiseChat._id, promiseChat);
        }
    }

    static async deleteMail(ownerId, person1, person2, messId) { 
        const promiseChat = await Chat.getByIdAndPersons(ownerId, person1, person2);

        if (promiseChat) {
            for (const i in promiseChat.messages) {
                if (String(promiseChat.messages[i]) === String(messId)) {
                    promiseChat.messages.splice(i, 1);
                }
            }

            if (promiseChat.messages.length === 0) {
                Chat.deleteById(promiseChat._id);
            } else {
                Chat.update(promiseChat._id, promiseChat);
            }
        }
    }
}

module.exports = Chat;