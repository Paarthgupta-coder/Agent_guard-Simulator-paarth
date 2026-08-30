import mongoose, { Schema } from "mongoose";

const PatchHistorySchema = new Schema(
  {
    version: Number,
    reason: String,
    at: Number,
  },
  { _id: false }
);

const AgentStateSchema = new Schema(
  {
    _id: { type: String, required: true },
    prompt: { type: String, required: true },
    version: { type: Number, required: true },
    history: { type: [PatchHistorySchema], default: [] },
  },
  { versionKey: false }
);

export const AgentStateModel = mongoose.models.AgentState ?? mongoose.model("AgentState", AgentStateSchema);
