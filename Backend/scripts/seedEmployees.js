import mongoose from "mongoose";
import dotenv from "dotenv";
import { Employee } from "../models/employee.model.js";

dotenv.config();

const employeesData = [
  {
    employeeId: "EMP001",
    fullname: "Aarav Sharma",
    email: "aarav.sharma@skillbuild.com",
    phoneNumber: "+91-9876543210",
    department: "Engineering",
    designation: "Senior Software Engineer",
    dateOfJoining: new Date("2022-01-15"),
    salary: 95000,
    status: "active",
    profile: {
      bio: "Full-stack developer with 5+ years of experience in building scalable web applications.",
      skills: ["JavaScript", "React", "Node.js", "MongoDB", "TypeScript"],
      profilePhoto: "https://randomuser.me/api/portraits/men/1.jpg",
      location: "Bangalore, India",
      education: [
        { degree: "B.Tech in Computer Science", institution: "IIT Delhi", year: "2018" },
      ],
      experience: [
        { company: "Infosys", role: "Software Engineer", duration: "2018 - 2020" },
        { company: "SkillBuild AI", role: "Senior Software Engineer", duration: "2022 - Present" },
      ],
    },
  },
  {
    employeeId: "EMP002",
    fullname: "Priya Patel",
    email: "priya.patel@skillbuild.com",
    phoneNumber: "+91-9876543211",
    department: "Design",
    designation: "UI/UX Lead",
    dateOfJoining: new Date("2021-06-01"),
    salary: 85000,
    status: "active",
    profile: {
      bio: "Creative designer passionate about user-centered design and accessibility.",
      skills: ["Figma", "Adobe XD", "CSS", "Design Systems", "Prototyping"],
      profilePhoto: "https://randomuser.me/api/portraits/women/2.jpg",
      location: "Mumbai, India",
      education: [
        { degree: "M.Des in Interaction Design", institution: "NID Ahmedabad", year: "2019" },
      ],
      experience: [
        { company: "Flipkart", role: "UI Designer", duration: "2019 - 2021" },
        { company: "SkillBuild AI", role: "UI/UX Lead", duration: "2021 - Present" },
      ],
    },
  },
  {
    employeeId: "EMP003",
    fullname: "Rahul Verma",
    email: "rahul.verma@skillbuild.com",
    phoneNumber: "+91-9876543212",
    department: "Engineering",
    designation: "Backend Developer",
    dateOfJoining: new Date("2023-03-10"),
    salary: 72000,
    status: "active",
    profile: {
      bio: "Backend specialist focused on microservices architecture and database optimization.",
      skills: ["Python", "Django", "PostgreSQL", "Redis", "Docker"],
      profilePhoto: "https://randomuser.me/api/portraits/men/3.jpg",
      location: "Hyderabad, India",
      education: [
        { degree: "B.Tech in Information Technology", institution: "BITS Pilani", year: "2021" },
      ],
      experience: [
        { company: "Zoho", role: "Junior Developer", duration: "2021 - 2023" },
        { company: "SkillBuild AI", role: "Backend Developer", duration: "2023 - Present" },
      ],
    },
  },
  {
    employeeId: "EMP004",
    fullname: "Sneha Gupta",
    email: "sneha.gupta@skillbuild.com",
    phoneNumber: "+91-9876543213",
    department: "Human Resources",
    designation: "HR Manager",
    dateOfJoining: new Date("2020-09-20"),
    salary: 78000,
    status: "active",
    profile: {
      bio: "HR professional with expertise in talent acquisition and employee engagement.",
      skills: ["Recruitment", "Employee Relations", "HRIS", "Payroll Management", "Training"],
      profilePhoto: "https://randomuser.me/api/portraits/women/4.jpg",
      location: "Delhi, India",
      education: [
        { degree: "MBA in Human Resources", institution: "XLRI Jamshedpur", year: "2018" },
      ],
      experience: [
        { company: "Deloitte", role: "HR Associate", duration: "2018 - 2020" },
        { company: "SkillBuild AI", role: "HR Manager", duration: "2020 - Present" },
      ],
    },
  },
  {
    employeeId: "EMP005",
    fullname: "Vikram Singh",
    email: "vikram.singh@skillbuild.com",
    phoneNumber: "+91-9876543214",
    department: "Engineering",
    designation: "DevOps Engineer",
    dateOfJoining: new Date("2022-07-05"),
    salary: 88000,
    status: "on-leave",
    profile: {
      bio: "DevOps engineer specializing in CI/CD pipelines and cloud infrastructure.",
      skills: ["AWS", "Kubernetes", "Terraform", "Jenkins", "Linux"],
      profilePhoto: "https://randomuser.me/api/portraits/men/5.jpg",
      location: "Pune, India",
      education: [
        { degree: "B.E in Computer Engineering", institution: "Pune University", year: "2019" },
      ],
      experience: [
        { company: "TCS", role: "System Engineer", duration: "2019 - 2022" },
        { company: "SkillBuild AI", role: "DevOps Engineer", duration: "2022 - Present" },
      ],
    },
  },
  {
    employeeId: "EMP006",
    fullname: "Ananya Reddy",
    email: "ananya.reddy@skillbuild.com",
    phoneNumber: "+91-9876543215",
    department: "Marketing",
    designation: "Digital Marketing Specialist",
    dateOfJoining: new Date("2023-01-15"),
    salary: 62000,
    status: "active",
    profile: {
      bio: "Digital marketer with a knack for SEO, content strategy, and social media campaigns.",
      skills: ["SEO", "Google Analytics", "Content Marketing", "Social Media", "Email Marketing"],
      profilePhoto: "https://randomuser.me/api/portraits/women/6.jpg",
      location: "Chennai, India",
      education: [
        { degree: "BBA in Marketing", institution: "Christ University", year: "2021" },
      ],
      experience: [
        { company: "Byju's", role: "Marketing Intern", duration: "2021 - 2022" },
        { company: "SkillBuild AI", role: "Digital Marketing Specialist", duration: "2023 - Present" },
      ],
    },
  },
  {
    employeeId: "EMP007",
    fullname: "Arjun Nair",
    email: "arjun.nair@skillbuild.com",
    phoneNumber: "+91-9876543216",
    department: "Engineering",
    designation: "Frontend Developer",
    dateOfJoining: new Date("2023-08-20"),
    salary: 68000,
    status: "active",
    profile: {
      bio: "Frontend developer passionate about creating beautiful and responsive user interfaces.",
      skills: ["React", "Next.js", "TailwindCSS", "JavaScript", "TypeScript"],
      profilePhoto: "https://randomuser.me/api/portraits/men/7.jpg",
      location: "Kochi, India",
      education: [
        { degree: "B.Tech in Computer Science", institution: "NIT Calicut", year: "2022" },
      ],
      experience: [
        { company: "Freshworks", role: "Frontend Intern", duration: "2022 - 2023" },
        { company: "SkillBuild AI", role: "Frontend Developer", duration: "2023 - Present" },
      ],
    },
  },
  {
    employeeId: "EMP008",
    fullname: "Meera Joshi",
    email: "meera.joshi@skillbuild.com",
    phoneNumber: "+91-9876543217",
    department: "Finance",
    designation: "Financial Analyst",
    dateOfJoining: new Date("2021-11-01"),
    salary: 75000,
    status: "active",
    profile: {
      bio: "Finance professional with experience in budgeting, forecasting, and financial reporting.",
      skills: ["Financial Modeling", "Excel", "SAP", "Power BI", "Accounting"],
      profilePhoto: "https://randomuser.me/api/portraits/women/8.jpg",
      location: "Ahmedabad, India",
      education: [
        { degree: "CA (Chartered Accountant)", institution: "ICAI", year: "2020" },
      ],
      experience: [
        { company: "KPMG", role: "Audit Associate", duration: "2020 - 2021" },
        { company: "SkillBuild AI", role: "Financial Analyst", duration: "2021 - Present" },
      ],
    },
  },
  {
    employeeId: "EMP009",
    fullname: "Karthik Menon",
    email: "karthik.menon@skillbuild.com",
    phoneNumber: "+91-9876543218",
    department: "Engineering",
    designation: "Data Scientist",
    dateOfJoining: new Date("2022-04-18"),
    salary: 92000,
    status: "active",
    profile: {
      bio: "Data scientist with expertise in machine learning and natural language processing.",
      skills: ["Python", "TensorFlow", "NLP", "SQL", "Pandas"],
      profilePhoto: "https://randomuser.me/api/portraits/men/9.jpg",
      location: "Bangalore, India",
      education: [
        { degree: "M.Tech in AI & ML", institution: "IISc Bangalore", year: "2021" },
      ],
      experience: [
        { company: "Amazon", role: "ML Intern", duration: "2021 - 2022" },
        { company: "SkillBuild AI", role: "Data Scientist", duration: "2022 - Present" },
      ],
    },
  },
  {
    employeeId: "EMP010",
    fullname: "Divya Iyer",
    email: "divya.iyer@skillbuild.com",
    phoneNumber: "+91-9876543219",
    department: "Quality Assurance",
    designation: "QA Lead",
    dateOfJoining: new Date("2021-02-10"),
    salary: 80000,
    status: "inactive",
    profile: {
      bio: "QA lead with extensive experience in automated and manual testing methodologies.",
      skills: ["Selenium", "Jest", "Cypress", "API Testing", "Agile"],
      profilePhoto: "https://randomuser.me/api/portraits/women/10.jpg",
      location: "Noida, India",
      education: [
        { degree: "B.Tech in Software Engineering", institution: "VIT Vellore", year: "2018" },
      ],
      experience: [
        { company: "Wipro", role: "Test Engineer", duration: "2018 - 2021" },
        { company: "SkillBuild AI", role: "QA Lead", duration: "2021 - Present" },
      ],
    },
  },
];

const seedEmployees = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected for seeding...");

    // Clear existing employees
    await Employee.deleteMany({});
    console.log("🗑️  Cleared existing employee data");

    // Insert seed data
    const result = await Employee.insertMany(employeesData);
    console.log(`🎉 ${result.length} employees seeded successfully!`);

    // Print summary
    console.log("\n📋 Seeded Employees:");
    result.forEach((emp) => {
      console.log(`   ${emp.employeeId} — ${emp.fullname} (${emp.department} | ${emp.designation})`);
    });

    await mongoose.disconnect();
    console.log("\n✅ MongoDB Disconnected. Done!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding employees:", error.message);
    process.exit(1);
  }
};

seedEmployees();
