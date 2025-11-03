"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToken = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const authModel_1 = __importDefault(require("../Models/authModel"));
require("dotenv/config");
class sendToken {
    // create tokens
    createTokens = async (user) => {
        const [at, rt] = await Promise.all([
            // access token
            user.signAccessToken(),
            // refresh token
            typeof user.refreshToken === "function"
                ? user.refreshToken()
                : Promise.resolve(null),
        ]);
        return { accessToken: at, refreshToken: rt };
    };
    // hash refresh token
    hashRefreshToken = async (token) => {
        const salt = await bcrypt_1.default.genSalt(10);
        return bcrypt_1.default.hash(token, salt);
    };
    // save refresh token in the db
    saveRefreshToken = async (userId, refreshToken) => {
        // hash refresh token
        const hashedToken = await this.hashRefreshToken(refreshToken);
        if (refreshToken) {
            await authModel_1.default.findByIdAndUpdate(userId, {
                storedRefreshToken: hashedToken,
            });
        }
    };
}
exports.sendToken = sendToken;
