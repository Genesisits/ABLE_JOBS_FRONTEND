// Sample data so the employer pages (/jobs, /shortlisted, /reports) render
// with content while the backend is unreachable or returns nothing.
// Set USE_DEMO_DATA to false to use only real API data.
export const USE_DEMO_DATA = false;

const RAW_DEMO_JOBS = [
  { id: "J001", code: "J001", company_name: "TechNova Solutions", employment_type: "Full-time", industry: "IT Services", work_mode: "Hybrid", department: "Engineering", company_website: "https://technova.example.com", number_of_positions: 3, notice_period: "30 days", job_title: "React Developer", experience_required: "2-4 yrs", salary_offered: "6 - 9 LPA", skills: "React, JavaScript, MUI", location: "Hyderabad", description: "Build accessible, responsive web interfaces.", activation_status: true, applied: 24, shortlisted: 8, onboarded: 3 },
  { id: "J002", code: "J002", company_name: "CodeCraft Labs", employment_type: "Full-time", industry: "Software", work_mode: "On-site", department: "Engineering", company_website: "https://codecraft.example.com", number_of_positions: 2, notice_period: "60 days", job_title: "Python Django Developer", experience_required: "3-5 yrs", salary_offered: "8 - 12 LPA", skills: "Python, Django, REST, PostgreSQL", location: "Bengaluru", description: "Design and maintain backend APIs.", activation_status: true, applied: 31, shortlisted: 11, onboarded: 4 },
  { id: "J003", code: "J003", company_name: "DataBridge BPO", employment_type: "Full-time", industry: "BPO", work_mode: "On-site", department: "Operations", company_website: "https://databridge.example.com", number_of_positions: 10, notice_period: "15 days", job_title: "Data Entry Operator", experience_required: "0-1 yrs", salary_offered: "2 - 3 LPA", skills: "MS Excel, Typing", location: "Hyderabad", description: "Accurate data entry and record keeping.", activation_status: true, applied: 42, shortlisted: 15, onboarded: 9 },
  { id: "J004", code: "J004", company_name: "HelpDesk India", employment_type: "Part-time", industry: "Customer Service", work_mode: "Remote", department: "Support", company_website: "https://helpdeskindia.example.com", number_of_positions: 5, notice_period: "15 days", job_title: "Customer Support Executive", experience_required: "1-2 yrs", salary_offered: "3 - 4 LPA", skills: "Communication, CRM", location: "Chennai", description: "Handle customer queries over chat and email.", activation_status: false, applied: 18, shortlisted: 5, onboarded: 2 },
  { id: "J005", code: "J005", company_name: "QualityFirst Tech", employment_type: "Full-time", industry: "Software Testing", work_mode: "Hybrid", department: "QA", company_website: "https://qualityfirst.example.com", number_of_positions: 2, notice_period: "30 days", job_title: "QA Engineer", experience_required: "2-3 yrs", salary_offered: "5 - 7 LPA", skills: "Selenium, Manual Testing, Jira", location: "Pune", description: "Test web applications and report defects.", activation_status: true, applied: 12, shortlisted: 4, onboarded: 1 },
];

// isDemo marks sample rows that do not exist in the database.
export const DEMO_JOBS = RAW_DEMO_JOBS.map((j) => ({ ...j, isDemo: true }));

export const DEMO_SHORTLISTED = [
  { application_code: "A1001", employee_name: "Ananya Rao", job_title: "React Developer", onboarded_status: false },
  { application_code: "A1002", employee_name: "Rahul Verma", job_title: "React Developer", onboarded_status: true },
  { application_code: "A1003", employee_name: "Meera Nair", job_title: "Python Django Developer", onboarded_status: false },
  { application_code: "A1004", employee_name: "Imran Shaikh", job_title: "Data Entry Operator", onboarded_status: false },
];
