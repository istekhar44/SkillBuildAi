import mongoose from "mongoose";
const userSchema = new mongoose.Schema(  //What is the schema ?
  {
    fullname: {     //name of the user
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
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    pancard: {
      type: String,
      required: true,
      unique: true,
    },
    adharcard: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["Student", "Recruiter"],
      default: "Student",
      required: true,
    },
    profile: {
      bio: {
        type: String,
      },
      skills: [{ type: String }],
      resume: {
        type: String, // URL to resume file
      },
      resumeOriginalname: {
        type: String, // Original name of resume file
      },
      company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
      },
      profilePhoto: {
        type: String, // URL to profile photo file
        default: "",
      },
      location: {
        type: String,
        default: "",
      },
      education: [
        {
          degree: { type: String, required: true },
          institution: { type: String, required: true },
          year: { type: String },
          gpa: { type: String },
        },
      ],
      projects: [
        {
          name: { type: String, required: true },
          tech: { type: String },
          description: { type: String },
          link: { type: String },
        },
      ],
      savedJobs: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Job",
        },
      ],
    },
    notificationPrefs: {
      emailNotifs: { type: Boolean, default: true },
      appUpdates: { type: Boolean, default: true },
      jobRecommendations: { type: Boolean, default: false },
      interviewReminders: { type: Boolean, default: true },
      marketingEmails: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
