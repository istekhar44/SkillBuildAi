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



