import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloud.js";

// Utility function to validate email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Utility function to validate phone
const isValidPhone = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone.replace(/\D/g, ""));
};

// Utility function to validate password strength
const isStrongPassword = (password) => {
  return password.length >= 8;
};

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, adharcard, pancard, role } = req.body;

    // Validate required fields
    if (!fullname?.trim() || !email?.trim() || !phoneNumber?.trim() || !password || !role || !pancard?.trim() || !adharcard?.trim()) {
      return res.status(400).json({
        message: "Missing or invalid required fields",
        success: false,
      });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({
        message: "Invalid email format",
        success: false,
      });
    }

    // Validate phone number
    if (!isValidPhone(phoneNumber)) {
      return res.status(400).json({
        message: "Invalid phone number. Must be 10 digits",
        success: false,
      });
    }

    // Validate password strength
    if (!isStrongPassword(password)) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long",
        success: false,
      });
    }

    // Validate role
    if (!["student", "recruiter"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role",
        success: false,
      });
    }

    // Check duplicate email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (user) {
      return res.status(409).json({
        message: "Email already exists",
        success: false,
      });
    }

    // Check duplicate Aadhar
    const existingAdharcard = await User.findOne({ adharcard });
    if (existingAdharcard) {
      return res.status(409).json({
        message: "Aadhar number already exists",
        success: false,
      });
    }

    // Check duplicate PAN
    const existingPancard = await User.findOne({ pancard });
    if (existingPancard) {
      return res.status(409).json({
        message: "PAN number already exists",
        success: false,
      });
    }

    // Validate file upload
    const file = req.file;
    if (!file) {
      return res.status(400).json({
        message: "Profile image is required",
        success: false,
      });
    }

    // Validate file type
    const allowedMimes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedMimes.includes(file.mimetype)) {
      return res.status(400).json({
        message: "Only JPEG, PNG, and GIF images are allowed",
        success: false,
      });
    }

    // Upload to Cloudinary
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
      resource_type: "auto",
      folder: "skillbuild/profiles",
    });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      fullname: fullname.trim(),
      email: email.toLowerCase(),
      phoneNumber,
      adharcard,
      pancard,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });

    await newUser.save();

    return res.status(201).json({
      message: `Account created successfully for ${fullname}`,
      success: true,
    });
  } catch (error) {
    console.error("Register error:", error);
    if (error.name === "MongoError" && error.code === 11000) {
      return res.status(409).json({
        message: "Duplicate field error",
        success: false,
      });
    }
    res.status(500).json({
      message: "Error registering user",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Validate required fields
    if (!email?.trim() || !password || !role) {
      return res.status(400).json({
        message: "Missing required fields",
        success: false,
      });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({
        message: "Invalid email format",
        success: false,
      });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    // Verify role
    if (user.role !== role) {
      return res.status(403).json({
        message: "Invalid role for this account",
        success: false,
      });
    }

    // Generate JWT token
    const tokenData = {
      userId: user._id,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Sanitize user data
    const sanitizedUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "Lax" : "Strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user: sanitizedUser,
        success: true,
      });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Error during login",
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      message: "Error during logout",
      success: false,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;

    const userId = req.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Validate and update fields
    if (fullname) {
      if (typeof fullname !== "string" || fullname.trim().length === 0) {
        return res.status(400).json({
          message: "Invalid fullname",
          success: false,
        });
      }
      user.fullname = fullname.trim();
    }

    if (email) {
      if (!isValidEmail(email)) {
        return res.status(400).json({
          message: "Invalid email format",
          success: false,
        });
      }
      const existingUser = await User.findOne({ email: email.toLowerCase(), _id: { $ne: userId } });
      if (existingUser) {
        return res.status(409).json({
          message: "Email already in use",
          success: false,
        });
      }
      user.email = email.toLowerCase();
    }

    if (phoneNumber) {
      if (!isValidPhone(phoneNumber)) {
        return res.status(400).json({
          message: "Invalid phone number",
          success: false,
        });
      }
      user.phoneNumber = phoneNumber;
    }

    if (bio) {
      if (typeof bio !== "string" || bio.length > 500) {
        return res.status(400).json({
          message: "Bio must be a string and less than 500 characters",
          success: false,
        });
      }
      user.profile.bio = bio;
    }

    if (skills) {
      if (typeof skills !== "string") {
        return res.status(400).json({
          message: "Skills must be a comma-separated string",
          success: false,
        });
      }
      user.profile.skills = skills.split(",").map((s) => s.trim()).filter((s) => s.length > 0);
    }

    // Handle resume upload
    if (file) {
      const allowedMimes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      if (!allowedMimes.includes(file.mimetype)) {
        return res.status(400).json({
          message: "Only PDF and DOC files are allowed for resume",
          success: false,
        });
      }

      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: "auto",
        folder: "skillbuild/resumes",
      });
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname;
    }

    await user.save();

    const updatedUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
      success: true,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      message: "Error updating profile",
      success: false,
    });
  }
};

// Get authenticated user's profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      user,
      success: true,
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      message: "Error fetching profile",
      success: false,
    });
  }
};

// Change password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.id;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Current and new password are required",
        success: false,
      });
    }

    if (!isStrongPassword(newPassword)) {
      return res.status(400).json({
        message: "New password must be at least 8 characters long",
        success: false,
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Current password is incorrect",
        success: false,
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res.status(200).json({
      message: "Password changed successfully",
      success: true,
    });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({
      message: "Error changing password",
      success: false,
    });
  }
};

// Update notification preferences
export const updateNotificationPrefs = async (req, res) => {
  try {
    const userId = req.id;
    const { emailNotifs, appUpdates, jobRecommendations, interviewReminders, marketingEmails } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (emailNotifs !== undefined) user.notificationPrefs.emailNotifs = emailNotifs;
    if (appUpdates !== undefined) user.notificationPrefs.appUpdates = appUpdates;
    if (jobRecommendations !== undefined) user.notificationPrefs.jobRecommendations = jobRecommendations;
    if (interviewReminders !== undefined) user.notificationPrefs.interviewReminders = interviewReminders;
    if (marketingEmails !== undefined) user.notificationPrefs.marketingEmails = marketingEmails;

    await user.save();

    return res.status(200).json({
      message: "Notification preferences updated",
      notificationPrefs: user.notificationPrefs,
      success: true,
    });
  } catch (error) {
    console.error("Update notification prefs error:", error);
    res.status(500).json({
      message: "Error updating notification preferences",
      success: false,
    });
  }
};

// Add education
export const addEducation = async (req, res) => {
  try {
    const userId = req.id;
    const { degree, institution, year, gpa } = req.body;

    if (!degree?.trim() || !institution?.trim()) {
      return res.status(400).json({
        message: "Degree and institution are required",
        success: false,
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    user.profile.education.push({ degree: degree.trim(), institution: institution.trim(), year, gpa });
    await user.save();

    return res.status(201).json({
      message: "Education added",
      education: user.profile.education,
      success: true,
    });
  } catch (error) {
    console.error("Add education error:", error);
    res.status(500).json({ message: "Error adding education", success: false });
  }
};

// Delete education
export const deleteEducation = async (req, res) => {
  try {
    const userId = req.id;
    const eduId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    user.profile.education = user.profile.education.filter(
      (e) => e._id.toString() !== eduId
    );
    await user.save();

    return res.status(200).json({
      message: "Education removed",
      education: user.profile.education,
      success: true,
    });
  } catch (error) {
    console.error("Delete education error:", error);
    res.status(500).json({ message: "Error removing education", success: false });
  }
};

// Add project
export const addProject = async (req, res) => {
  try {
    const userId = req.id;
    const { name, tech, description, link } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        message: "Project name is required",
        success: false,
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    user.profile.projects.push({ name: name.trim(), tech, description, link });
    await user.save();

    return res.status(201).json({
      message: "Project added",
      projects: user.profile.projects,
      success: true,
    });
  } catch (error) {
    console.error("Add project error:", error);
    res.status(500).json({ message: "Error adding project", success: false });
  }
};

// Delete project
export const deleteProject = async (req, res) => {
  try {
    const userId = req.id;
    const projectId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    user.profile.projects = user.profile.projects.filter(
      (p) => p._id.toString() !== projectId
    );
    await user.save();

    return res.status(200).json({
      message: "Project removed",
      projects: user.profile.projects,
      success: true,
    });
  } catch (error) {
    console.error("Delete project error:", error);
    res.status(500).json({ message: "Error removing project", success: false });
  }
};

// Save a job
export const saveJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    if (user.profile.savedJobs.includes(jobId)) {
      return res.status(400).json({ message: "Job already saved", success: false });
    }

    user.profile.savedJobs.push(jobId);
    await user.save();

    return res.status(200).json({
      message: "Job saved",
      savedJobs: user.profile.savedJobs,
      success: true,
    });
  } catch (error) {
    console.error("Save job error:", error);
    res.status(500).json({ message: "Error saving job", success: false });
  }
};

// Unsave a job
export const unsaveJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    user.profile.savedJobs = user.profile.savedJobs.filter(
      (id) => id.toString() !== jobId
    );
    await user.save();

    return res.status(200).json({
      message: "Job unsaved",
      savedJobs: user.profile.savedJobs,
      success: true,
    });
  } catch (error) {
    console.error("Unsave job error:", error);
    res.status(500).json({ message: "Error unsaving job", success: false });
  }
};

// Get saved jobs
export const getSavedJobs = async (req, res) => {
  try {
    const userId = req.id;

    const user = await User.findById(userId).populate({
      path: "profile.savedJobs",
      populate: { path: "company" },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    return res.status(200).json({
      savedJobs: user.profile.savedJobs,
      success: true,
    });
  } catch (error) {
    console.error("Get saved jobs error:", error);
    res.status(500).json({ message: "Error fetching saved jobs", success: false });
  }
};

