/**
 * API Response Handler Utility
 * Standardizes all API responses across the application
 */

export class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export class ApiError extends Error {
  constructor(statusCode, message, errors = [], stack = "") {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * Utility function to send successful responses
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {Object} data - Response data
 * @param {string} message - Success message
 */
export const sendSuccess = (res, statusCode = 200, data, message = "Success") => {
  return res.status(statusCode).json(new ApiResponse(statusCode, data, message));
};

/**
 * Utility function to send error responses
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 * @param {Array} errors - Array of specific errors (optional)
 */
export const sendError = (res, statusCode = 500, message = "Internal Server Error", errors = []) => {
  return res.status(statusCode).json(new ApiError(statusCode, message, errors));
};

export const RESPONSE_MESSAGES = {
  // Success Messages
  SUCCESS: "Operation successful",
  LOGIN_SUCCESS: "Login successful",
  LOGOUT_SUCCESS: "Logout successful",
  REGISTRATION_SUCCESS: "Registration successful",
  PROFILE_UPDATED: "Profile updated successfully",
  JOB_POSTED: "Job posted successfully",
  APPLICATION_SUBMITTED: "Application submitted successfully",
  COMPANY_REGISTERED: "Company registered successfully",

  // Error Messages
  INVALID_CREDENTIALS: "Invalid email or password",
  INVALID_INPUT: "Invalid input provided",
  MISSING_FIELDS: "Missing required fields",
  EMAIL_EXISTS: "Email already exists",
  USER_NOT_FOUND: "User not found",
  JOB_NOT_FOUND: "Job not found",
  COMPANY_NOT_FOUND: "Company not found",
  UNAUTHORIZED: "Unauthorized access",
  FORBIDDEN: "Insufficient permissions",
  SERVER_ERROR: "Internal server error",
  TOKEN_EXPIRED: "Token has expired",
  INVALID_TOKEN: "Invalid token",
  FILE_UPLOAD_ERROR: "File upload failed",
  DATABASE_ERROR: "Database operation failed",
};

export default {
  ApiResponse,
  ApiError,
  sendSuccess,
  sendError,
  RESPONSE_MESSAGES,
};
