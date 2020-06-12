const Chat = require("./chat");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
  

const mailScheme = new Schema({
    ownerId: ObjectId,
    sender: String,
    receiver: String,
    subject: String,
    text: String,
    files: {
        type: [{data: Buffer, contentType: String}]
    },
    sendingTime: Date,
    labels: {
        incoming: {
            type: Boolean,
            required: true
        },
        unread: {
            type: Boolean,
            required: true
        }, 
        spam: Boolean, important: Boolean},
}, {versionKey: false});

const mail = mongoose.model("mail", mailScheme);

class Mail {
    constructor(mailData) {
        this.ownerId = mailData.ownerId;
        this.sender = mailData.sender;
        this.receiver = mailData.receiver;
        this.subject = mailData.subject || "No title";
        this.text = mailData.text;
        this.files  = mailData.files || null;
        this.sendingTime = new Date().toISOString();
        this.labels = {
            incoming: mailData.labels.incoming,
            unread: mailData.labels.unread,
            spam: mailData.labels.spam || false,
            important: mailData.labels.important || false
        };
    }

    static getSubjectAndIdByLogin(login, userId){
        return mail.find({ 
            $and: [
                {$or: [
                    { sender: login }, 
                    { receiver: login }
                ]},
                {ownerId: userId}
            ]
        }, {subject:1, labels: 1});
    }

    static async getById(id) {
        return mail.findById(id);
    }

    static async insert(mailParams, isSender) {

        mailParams.labels = isSender 
            ? {incoming: false, unread: false} 
            : {incoming: true, unread: true};

        const mailObj = new Mail(mailParams);
        const newMail = await new mail(mailObj).save();

        Chat.createMail(newMail.ownerId, newMail.sender, newMail.receiver, newMail._id);

        return newMail._id;
    }

    static update(id, newMail) {
        return mail.findByIdAndUpdate(id, newMail, {new: true}).exec();
    }

    static async delete(id, ownerId) {

        const currMail = await Mail.getById(id);
        await Chat.deleteMail(ownerId, currMail.sender, currMail.receiver, currMail.id);

        return mail.deleteOne({_id: id}).exec();
    }
}

module.exports = Mail;
