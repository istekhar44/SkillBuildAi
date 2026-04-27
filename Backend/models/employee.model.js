import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: true,
      unique: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
    },
    department: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    dateOfJoining: {
      type: Date,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "on-leave"],
      default: "active",
    },
    profile: {
      bio: {
        type: String,
      },
      skills: [{ type: String }],
      profilePhoto: {
        type: String,
        default: "",
      },
      location: {
        type: String,
        default: "",
      },
      education: [
        {
          degree: { type: String },
          institution: { type: String },
          year: { type: String },
        },
      ],
      experience: [
        {
          company: { type: String },
          role: { type: String },
          duration: { type: String },
        },
      ],
    },
  },
  { timestamps: true }
);

export const Employee = mongoose.model("Employee", employeeSchema);
