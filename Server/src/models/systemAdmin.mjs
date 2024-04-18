import mongoose from "mongoose";

const SystemAdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
});

export const SystemAdmin = mongoose.model("SystemAdmin", SystemAdminSchema);
