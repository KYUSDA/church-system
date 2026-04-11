import { model, Schema } from "mongoose";

interface TProfile {
  userId: Schema.Types.ObjectId;
  avatar?: {
    public_id: string;
    url: string;
  };
  birthday: Date;
  family?: string;
  department?: TDepartment;
  baptized: boolean;
  createdAt: Date;
}

interface TDepartment {
  name: string;
  position?: string;
  joinedAt: Date;
  updatedAt: Date;
}

const profileSchema = new Schema<TProfile>(
  {
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
    },
    department: {
      type: Object,
    },
    baptized: {
      type: Boolean,
      required: [true, "Please specify if baptized"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

// model
const profileModel = model("profile", profileSchema);
export default profileModel;
