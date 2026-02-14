import { Job } from "../models/job.model.js";
import mongoose from "mongoose";

// Validation utilities
const isValidJobData = (data) => {
  const { title, description, requirements, salary, location, jobType, experience, position, companyId } = data;

  if (!title?.trim() || !description?.trim() || !location?.trim() || !companyId?.trim()) {
    return { valid: false, message: "Title, description, location, and companyId are required" };
  }

  if (!Array.isArray(requirements) && typeof requirements !== "string") {
    return { valid: false, message: "Requirements must be provided" };
  }

  if (isNaN(salary) || Number(salary) < 0) {
    return { valid: false, message: "Salary must be a valid positive number" };
  }

  if (!["full-time", "part-time", "contract", "freelance"].includes(jobType?.toLowerCase())) {
    return { valid: false, message: "Invalid job type" };
  }

  if (!Number.isInteger(Number(experience)) || Number(experience) < 0) {
    return { valid: false, message: "Experience must be a valid non-negative number" };
  }

  if (!Number.isInteger(Number(position)) || Number(position) < 1) {
    return { valid: false, message: "Position count must be a positive number" };
  }

  if (!mongoose.Types.ObjectId.isValid(companyId)) {
    return { valid: false, message: "Invalid company ID" };
  }

  return { valid: true };
};

// Admin job posting
export const postJob = async (req, res) => {
  try {
    const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
    const userId = req.id;

    // Validate input
    const validation = isValidJobData(req.body);
    if (!validation.valid) {
      return res.status(400).json({
        message: validation.message,
        success: false,
      });
    }

    // Parse requirements if it's a string
    const parsedRequirements = typeof requirements === "string" 
      ? requirements.split(",").map((r) => r.trim()).filter((r) => r.length > 0)
      : requirements;

    if (parsedRequirements.length === 0) {
      return res.status(400).json({
        message: "At least one requirement is needed",
        success: false,
      });
    }

    const job = await Job.create({
      title: title.trim(),
      description: description.trim(),
      requirements: parsedRequirements,
      salary: Number(salary),
      location: location.trim(),
      jobType: jobType.toLowerCase(),
      experienceLevel: Number(experience),
      position: Number(position),
      company: companyId,
      created_by: userId,
    });

    await job.populate("company");

    return res.status(201).json({
      message: "Job posted successfully",
      job,
      success: true,
    });
  } catch (error) {
    console.error("Error posting job:", error);
    if (error.kind === "ObjectId") {
      return res.status(400).json({
        message: "Invalid company ID format",
        success: false,
      });
    }
    return res.status(500).json({
      message: "Error posting job",
      success: false,
    });
  }
};

// Get all jobs with search and filtering
export const getAllJobs = async (req, res) => {
  try {
    const { keyword = "", page = 1, limit = 10 } = req.query;

    // Validate pagination
    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit) || 10));
    const skip = (pageNum - 1) * limitNum;

    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query)
      .populate("company")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const totalJobs = await Job.countDocuments(query);

    if (jobs.length === 0) {
      return res.status(200).json({
        message: "No jobs found",
        jobs: [],
        pagination: {
          page: pageNum,
          limit: limitNum,
          total: totalJobs,
          pages: Math.ceil(totalJobs / limitNum),
        },
        success: true,
      });
    }

    return res.status(200).json({
      jobs,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: totalJobs,
        pages: Math.ceil(totalJobs / limitNum),
      },
      success: true,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return res.status(500).json({
      message: "Error fetching jobs",
      success: false,
    });
  }
};

// Get job by ID
export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid job ID format",
        success: false,
      });
    }

    const job = await Job.findById(id)
      .populate("company")
      .populate("applications");

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching job:", error);
    return res.status(500).json({
      message: "Error fetching job",
      success: false,
    });
  }
};

// Get admin jobs
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;

    if (!mongoose.Types.ObjectId.isValid(adminId)) {
      return res.status(400).json({
        message: "Invalid admin ID",
        success: false,
      });
    }

    const jobs = await Job.find({ created_by: adminId })
      .populate("company")
      .sort({ createdAt: -1 });

    if (jobs.length === 0) {
      return res.status(200).json({
        message: "No jobs posted by this admin",
        jobs: [],
        success: true,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching admin jobs:", error);
    return res.status(500).json({
      message: "Error fetching jobs",
      success: false,
    });
  }
};
