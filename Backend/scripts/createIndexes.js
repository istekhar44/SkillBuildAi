/**
 * Database Indexes Setup
 * Run this file to create necessary indexes for optimal performance
 * Usage: node scripts/createIndexes.js
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user.model.js";
import Company from "../models/company.model.js";
import Job from "../models/job.model.js";
import Application from "../models/application.model.js";

dotenv.config();

const createIndexes = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✓ Connected to MongoDB");

    // User indexes
    console.log("Creating User indexes...");
    await User.collection.createIndex({ email: 1 }, { unique: true });
    await User.collection.createIndex({ adharcard: 1 }, { unique: true });
    await User.collection.createIndex({ pancard: 1 }, { unique: true });
    await User.collection.createIndex({ role: 1 });
    console.log("✓ User indexes created");

    // Company indexes
    console.log("Creating Company indexes...");
    await Company.collection.createIndex({ name: 1 });
    await Company.collection.createIndex({ userId: 1 });
    console.log("✓ Company indexes created");

    // Job indexes
    console.log("Creating Job indexes...");
    await Job.collection.createIndex({ title: 1 });
    await Job.collection.createIndex({ company: 1 });
    await Job.collection.createIndex({ created_by: 1 });
    await Job.collection.createIndex({ createdAt: -1 });
    await Job.collection.createIndex(
      { title: "text", description: "text" },
      { weights: { title: 10, description: 5 } }
    );
    console.log("✓ Job indexes created");

    // Application indexes
    console.log("Creating Application indexes...");
    await Application.collection.createIndex({ userId: 1 });
    await Application.collection.createIndex({ jobId: 1 });
    await Application.collection.createIndex({ userId: 1, jobId: 1 }, { unique: true });
    await Application.collection.createIndex({ status: 1 });
    console.log("✓ Application indexes created");

    console.log("\n✅ All indexes created successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating indexes:", error.message);
    process.exit(1);
  }
};

createIndexes();
