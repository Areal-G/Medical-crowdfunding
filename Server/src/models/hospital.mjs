import mongoose from "mongoose";

const HospitalSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  //  name
});

export const Hospital = mongoose.model("Hospital", HospitalSchema);
