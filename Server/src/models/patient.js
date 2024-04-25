const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema(
  {
    name: {
      am: { type: String, required: [true, 'enter name in amharic'] },
      en: { type: String, required: [true, 'enter name in english'] },
    },
    email: {
      type: String,
      required: [true, 'enter email'],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'patient',
    },
    // dateOfBirth: {
    //   type: Date,
    //   required: [true, 'Date of birth is required'],
    // },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    accountStatus: {
      type: String,
      // enum: {
      //   values: ["Active", "Inactive"],
      //   message:
      //     "Invalid status value. Must be one of: Pending, Active, Inactive, Suspended, Archived.",
      // },
      // default: status.ACTIVE,
      // required: [true, "Status is required"],
    },
    //   hospital: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Hospital',
    //     required: true,
    //   },
  }
  // hospital id
  // campaign id
);

const Patient = mongoose.model('Patient', PatientSchema);

module.exports = Patient;
