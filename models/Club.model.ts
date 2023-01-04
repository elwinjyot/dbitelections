import mongoose, { Schema } from "mongoose";
import { IClub, IMember } from "../types";

const ClubSchema: Schema<IClub> = new mongoose.Schema<IClub>({
  clubName: { type: String, required: true },
  imgUri: { type: String },
  clubMembers: {
    type: [{ memberId: { type: Number, unique: true }, name: String, course: String, position: String, votes: Number }],
  },
});

const SClub = mongoose.models.Club || mongoose.model<IClub>("Club", ClubSchema);

export default SClub