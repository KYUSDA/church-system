import { model, Schema } from "mongoose";

interface TProfile {
  userId: Schema.Types.ObjectId;
  avatar?: {
    public_id: string;
    url: string;
  };
  birthday: Date;
  family: string;
  department: string;
  createdAt: Date;
}

const profileSchema = new Schema<TProfile>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  avatar: {
    public_id: String,
    url: String,
  },
  birthday: {
    type: Date,
    required: [true, "Please enter birthday"],
  },
  family: {
    type: String,
    required: [true, "Please enter family name"],
  },
  department: {
    type: String,
    required: [true, "Please enter department name"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
},{timestamps: true});

// model
const profileModel = model("profile", profileSchema);
export default profileModel;
