import bcrypt from "bcrypt";
import authModel, { IUser } from "../Models/authModel";
import "dotenv/config";

export class sendToken {
  // create tokens
  createTokens = async (user: IUser) => {
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
  private hashRefreshToken = async (token: string) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(token, salt);
  };

  // save refresh token in the db
  saveRefreshToken = async (userId: string, refreshToken: string) => {
    // hash refresh token
    const hashedToken = await this.hashRefreshToken(refreshToken);
    if (refreshToken) {
      await authModel.findByIdAndUpdate(userId, {
        storedRefreshToken: hashedToken,
      });
    }
  };
}
