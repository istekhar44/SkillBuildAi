import { Application } from "../models/application.model.js";
import { User } from "../models/user.model.js";

export const getDashboardStats = async (req, res) => {
    try {
        const userId = req.id;

        // Get all applications by this user
        const applications = await Application.find({ applicant: userId });

        const totalApplications = applications.length;
        const interviews = applications.filter(
            (a) => a.status === "accepted"
        ).length;
        const rejected = applications.filter(
            (a) => a.status === "rejected"
        ).length;
        const pending = applications.filter(
            (a) => a.status === "pending"
        ).length;

        // Profile completion calculation
        const user = await User.findById(userId);
        let completion = 0;
        if (user) {
            if (user.fullname) completion += 15;
            if (user.email) completion += 10;
            if (user.phoneNumber) completion += 10;
            if (user.profile?.bio) completion += 15;
            if (user.profile?.skills?.length > 0) completion += 15;
            if (user.profile?.resume) completion += 15;
            if (user.profile?.profilePhoto) completion += 10;
            if (user.profile?.education?.length > 0) completion += 5;
            if (user.profile?.projects?.length > 0) completion += 5;
        }

        return res.status(200).json({
            success: true,
            stats: {
                totalApplications,
                interviews,
                rejected,
                pending,
                profileCompletion: Math.min(completion, 100),
            },
        });
    } catch (error) {
        console.error("Dashboard stats error:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching dashboard stats",
        });
    }
};
