"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALL = exports.UserRole = void 0;
const mongoose_1 = require("mongoose");
const Schema = mongoose_1.Schema;
const validator_1 = __importDefault(require("validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = require("crypto");
const { isEmail } = validator_1.default;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var UserRole;
(function (UserRole) {
    UserRole["MEMBER"] = "member";
    UserRole["ELDER"] = "elder";
    UserRole["ADMIN"] = "admin";
    UserRole["SUPERADMIN"] = "superadmin";
})(UserRole || (exports.UserRole = UserRole = {}));
exports.ALL = [
    UserRole.ELDER,
    UserRole.ADMIN,
    UserRole.SUPERADMIN,
];
const authSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "please enter your firstName"],
    },
    lastName: {
        type: String,
        required: [true, "please enter your lastName"],
    },
    email: {
        type: String,
        required: [true, "please enter your email"],
        validate: [isEmail, "please enter a valid email"],
        lowerCase: true,
        unique: true,
    },
    registration: {
        type: String,
        required: [true, "please enter your registration number"],
        minlength: [10, "please enter a minlength of 10"],
        unique: true,
    },
    course: {
        type: String,
        required: [true, "please enter your course"],
    },
    avatar: {
        public_id: String,
        url: String,
    },
    year: {
        type: Number,
        required: [true, "please enter year of study"],
    },
    phoneNumber: {
        type: String,
        required: [true, "please enter your phone number"],
    },
    birthday: {
        type: Date,
        default: null,
    },
    scores: {
        type: Number,
        default: 0,
    },
    easyNumber: {
        type: Number,
        default: 0,
    },
    mediumNumber: {
        type: Number,
        default: 0,
    },
    hardNumber: {
        type: Number,
        default: 0,
    },
    password: {
        type: String,
        required: [true, "please enter your password"],
        minlength: [8, "please enter 8 or more characters"],
    },
    familyLocated: {
        type: String,
        default: "not yet assigned",
    },
    role: {
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.MEMBER, // Default role is MEMBER
    },
    createdAt: { type: Date, default: Date.now },
    storedRefreshToken: {
        type: String,
        default: null,
    },
    passwordResetToken: String,
    resetTokenSetAt: Date,
    resetTokenExpires: Date,
}, { timestamps: true });
//bcrypt hash password
authSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt_1.default.hash(this.password, 10);
});
//compare passwords
authSchema.methods.comparePasswords = async function (password) {
    return await bcrypt_1.default.compare(password, this.password);
};
// reset token
authSchema.methods.resetToken = async function () {
    const token = (0, crypto_1.randomBytes)(32).toString("hex");
    const saltRounds = 10;
    this.passwordResetToken = await bcrypt_1.default.hash(token, saltRounds); // Hash the token
    this.resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1-hour expiration
    console.log("Generated Token (Plain):", token);
    console.log("Stored Hashed Token:", this.passwordResetToken);
    return token; // Send the plain token in the email
};
//sign access token
authSchema.methods.signAccessToken = function () {
    return jsonwebtoken_1.default.sign({ id: this.id }, process.env.ACCESS_TOKEN, {
        expiresIn: "1h",
    });
};
// refresh token
authSchema.methods.refreshToken = async function () {
    return jsonwebtoken_1.default.sign({ id: this.id }, process.env.REFRESH_TOKEN, {
        expiresIn: "7d",
    });
};
const authModel = (0, mongoose_1.model)("member", authSchema);
exports.default = authModel;
