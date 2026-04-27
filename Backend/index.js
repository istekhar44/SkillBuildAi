import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import compression from "compression";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import newsletterRoute from "./routes/newsletter.route.js";
import dashboardRoute from "./routes/dashboard.route.js";
import employeeRoute from "./routes/employee.route.js";

dotenv.config();

const app = express();

// Connect to DB eagerly for Vercel serverless cold starts
connectDB().catch(err => console.error("DB connection failed:", err.message));
const PORT = process.env.PORT || 5011;
const NODE_ENV = process.env.NODE_ENV || "development";

// Security Middleware
app.use(helmet());
app.use(compression());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: NODE_ENV === "production" ? 100 : 1000,
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/", limiter);

// Body Parser Middleware
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// CORS Configuration
const corsOptions = {
  origin: (process.env.FRONTEND_URL || "http://localhost:5173,http://localhost:5174").split(","),
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// Health Check Endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
  });
});

// Routes
app.use("/api/user", userRoute);
app.use("/api/company", companyRoute);
app.use("/api/job", jobRoute);
app.use("/api/application", applicationRoute);
app.use("/api/newsletter", newsletterRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/employee", employeeRoute);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  const message = NODE_ENV === "production" ? "Internal Server Error" : err.message;
  res.status(status).json({
    success: false,
    message,
    ...(NODE_ENV !== "production" && { error: err }),
  });
});

// 404 Handling
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
  });
});

// Database Connection and Server Startup
const startServer = async () => {
  try {
    // Validate required environment variables
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI environment variable is not set");
    }
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET environment variable is not set");
    }

    await connectDB();
    console.log(`✅ MongoDB Connected (${NODE_ENV})`);

    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT} (${NODE_ENV})`);
    });

    // Graceful Shutdown
    process.on("SIGTERM", () => {
      console.log("SIGTERM received. Shutting down gracefully...");
      server.close(() => {
        console.log("Server closed");
        process.exit(0);
      });
    });

    process.on("SIGINT", () => {
      console.log("SIGINT received. Shutting down gracefully...");
      server.close(() => {
        console.log("Server closed");
        process.exit(0);
      });
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
};

// Export for Vercel serverless
export default app;

// Only listen when not running on Vercel
if (!process.env.VERCEL) {
  startServer();
}
