const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const defaulUserImg = "https://res.cloudinary.com/dlnpmqydd/image/upload/v1569785232/samples/animals/cat.jpg";

const userScheme = new Schema({
    login: String,
    passwordHash: String,
    role: Number,
    fullname: String,
    registeredAt: Date,
    avaUrl: String,
    description: String,
    publicKey: String
}, {versionKey: false});
  
const user = mongoose.model("user", userScheme);

class User{
    constructor(userData){
        this.login = userData.login;
        this.passwordHash = userData.passwordHash;
        this.role = 0; // 0 - user, 1 - admin
        this.fullname = userData.fullname || "";
        this.registeredAt = new Date();
        this.avaUrl = userData.avaUrl || defaulUserImg;
        this.description = "";
        this.publicKey = userData.publicKey;
    };
    
    
    static getAll(){
        return user.find({}).exec();
    };
    
    static getById(id) { 

        return user.findById(id).exec();
    };

    static getByLogin(login){
        return user.findOne({login: login}).exec();
    }

    static async insert(userParams) {
        const params = userParams;
        params.passwordHash = await User.hashPassword(userParams.password);

        const newUser = new User(params);
        const promiseUser = await new user(newUser).save();

        return promiseUser._id;
    }

    static update(id, userParams) {
        return user.findByIdAndUpdate(id, userParams, {new: true}).exec();
    }

    static deleteById(id) {
        return user.deleteOne({_id: id}).exec();
    }

    static async validatePassword(login, password){
        const currUser = await user.findOne({login}).exec();
        return bcrypt.compare(password, currUser.passwordHash);
    }

    static async hashPassword(password){
        return bcrypt.hash(password, 10);
    }

}

module.exports = User;