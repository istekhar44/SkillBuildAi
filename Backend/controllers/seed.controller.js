import { Job } from "../models/job.model.js";
import { sampleJobs } from "../utils/sampleJobs.js";

export const seedJobs = async (req, res) => {
  try {
    // Clear existing jobs
    await Job.deleteMany({});
    
    // Create a default company if no companyId is provided
    let companyId = req.body.companyId;
    if (!companyId) {
      const Company = (await import('../models/company.model.js')).Company;
      const defaultCompany = await Company.create({
        name: "Tech Innovations Inc",
        description: "A leading technology company",
        website: "https://techinnovations.example.com",
        logo: "https://via.placeholder.com/150",
        location: "Multiple Locations",
        created_by: req.id
      });
      companyId = defaultCompany._id;
    }
    
    // Add company ID to each job
    const jobsWithCompany = sampleJobs.map(job => ({
      ...job,
      company: companyId,
      created_by: req.id // User ID from auth middleware
    }));

    // Create all jobs
    const jobs = await Job.insertMany(jobsWithCompany);

    res.status(201).json({
      message: "Sample jobs created successfully",
      count: jobs.length,
      jobs,
      success: true
    });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({
      message: "Failed to seed jobs",
      error: error.message,
      status: false
    });
  }
};