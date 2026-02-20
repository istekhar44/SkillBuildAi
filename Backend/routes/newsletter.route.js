import express from "express";
import { Newsletter } from "../models/newsletter.model.js";
import nodemailer from "nodemailer";

const router = express.Router();

// POST /api/newsletter/subscribe
router.post("/subscribe", async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required.",
            });
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address.",
            });
        }

        // Check if already subscribed
        const existing = await Newsletter.findOne({ email: email.toLowerCase() });
        if (existing) {
            return res.status(409).json({
                success: false,
                message: "You are already subscribed to our newsletter!",
            });
        }

        // Save subscriber
        await Newsletter.create({ email: email.toLowerCase() });

        // Send confirmation email
        try {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.SMTP_EMAIL,
                    pass: process.env.SMTP_PASSWORD,
                },
            });

            const mailOptions = {
                from: `"SkillBuildAi" <${process.env.SMTP_EMAIL}>`,
                to: email,
                subject: "🎉 Welcome to SkillBuildAi Newsletter!",
                html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #0d0d14; color: #ffffff; border-radius: 16px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #4f46e5, #7c3aed); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; font-size: 28px; color: #ffffff;">Welcome to SkillBuildAi! 🚀</h1>
            </div>
            <div style="padding: 30px;">
              <p style="color: #d1d5db; font-size: 16px; line-height: 1.6;">
                Hey there! 👋
              </p>
              <p style="color: #d1d5db; font-size: 16px; line-height: 1.6;">
                Thank you for subscribing to the <strong style="color: #818cf8;">SkillBuildAi</strong> newsletter!
                You're now part of our community of ambitious professionals and job seekers.
              </p>
              <p style="color: #d1d5db; font-size: 16px; line-height: 1.6;">
                Here's what you'll receive:
              </p>
              <ul style="color: #d1d5db; font-size: 15px; line-height: 2;">
                <li>🔥 Latest job opportunities curated for you</li>
                <li>📚 Career tips and interview preparation guides</li>
                <li>🏆 Upcoming hackathons and competitions</li>
                <li>💡 Industry insights and skill-building resources</li>
              </ul>
              <div style="text-align: center; margin-top: 30px;">
                <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}" style="display: inline-block; background: linear-gradient(135deg, #4f46e5, #7c3aed); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 12px; font-weight: bold; font-size: 16px;">
                  Explore Jobs →
                </a>
              </div>
              <p style="color: #6b7280; font-size: 13px; margin-top: 30px; text-align: center;">
                You registered with: <strong>${email}</strong>
              </p>
            </div>
            <div style="background: #111827; padding: 20px; text-align: center; border-top: 1px solid rgba(255,255,255,0.1);">
              <p style="color: #6b7280; font-size: 12px; margin: 0;">
                © 2026 SkillBuildAi. All rights reserved.
              </p>
            </div>
          </div>
        `,
            };

            await transporter.sendMail(mailOptions);
        } catch (emailErr) {
            // Don't fail subscription if email sending fails
            console.error("Email sending failed:", emailErr.message);
        }

        return res.status(201).json({
            success: true,
            message: "Successfully subscribed to SkillBuildAi newsletter! Check your email for confirmation.",
        });
    } catch (err) {
        console.error("Newsletter subscription error:", err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again.",
        });
    }
});

export default router;
