import mongoose from "mongoose";
const Taskschema = new mongoose.Schema(
  {
    title: { type: String, require: true, trim: true },
    status: { type: String, enum: ["active", "complete"], default: "active" },
    completeAt: { type: Date, default: null },
  },
  { timestamps: true }
);
const Task = mongoose.model("tasks", Taskschema);
export default Task;
