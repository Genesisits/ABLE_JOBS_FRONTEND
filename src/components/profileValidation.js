import { clean, V } from "../Auth/validation";

/* ------------------------------------------------------------------ */
/*  Fields validated for each user type (same order as the dialog).    */
/* ------------------------------------------------------------------ */
export const EMPLOYEE_FIELDS = [
  "first_name",
  "last_name",
  "mobile_number",
  "skills",
  "address",
  "country",
  "state",
  "availability_of_work",
  "disability",
  "job_experiences",
  "languages_known",
];

export const EMPLOYER_FIELDS = [
  "company_name",
  "location",
  "email",
  "company_contact",
  "industry",
  "company_website",
  "head_first_name",
  "head_last_name",
  "head_email",
  "head_contact",
  "head_designation",
  "linkedinlink",
];

/* Fields that show the red * (job_experiences is optional). */
export const REQUIRED_FIELDS = new Set([
  ...EMPLOYEE_FIELDS.filter((f) => f !== "job_experiences"),
  ...EMPLOYER_FIELDS,
]);

/* ------------------------------------------------------------------ */
/*  Sanitizers: block invalid characters while the user is typing.     */
/* ------------------------------------------------------------------ */
const noSpaces = (v) => v.replace(/\s/g, "");
const lead = (v) => v.replace(/^\s+/, "");

export const sanitizers = {
  // letters only (no digits / symbols)
  first_name: clean.name,
  last_name: clean.name,
  head_first_name: clean.name,
  head_last_name: clean.name,
  head_designation: clean.name,
  country: clean.name,
  state: clean.name,
  availability_of_work: clean.name,
  languages_known: clean.list, // "English, Hindi"
  location: (v) => lead(v.replace(/[^\p{L}\s,.'-]/gu, "")).slice(0, 80),
  disability: (v) => lead(v.replace(/[^\p{L}\s,.()'-]/gu, "")).slice(0, 100),
  industry: (v) => lead(v.replace(/[^\p{L}\s&,/().-]/gu, "")).slice(0, 60),

  // 10 digits only
  mobile_number: clean.digits,
  company_contact: clean.digits,
  head_contact: clean.digits,

  // free text with limits
  skills: (v) => lead(v.replace(/[^\p{L}\d\s,.+#/&()-]/gu, "")).slice(0, 200),
  address: (v) => lead(v).slice(0, 200),
  company_name: (v) => lead(v.replace(/[^\p{L}\d\s&.,'()-]/gu, "")).slice(0, 100),
  job_experiences: (v) => lead(v).slice(0, 500),

  // no spaces allowed
  email: noSpaces,
  head_email: noSpaces,
  company_website: noSpaces,
  linkedinlink: noSpaces,
};

/* Extra <input> attributes (numeric keypad + hard length cap on phones). */
export const fieldInputProps = {
  mobile_number: { inputMode: "numeric", maxLength: 10 },
  company_contact: { inputMode: "numeric", maxLength: 10 },
  head_contact: { inputMode: "numeric", maxLength: 10 },
  email: { inputMode: "email" },
  head_email: { inputMode: "email" },
  company_website: { inputMode: "url" },
  linkedinlink: { inputMode: "url" },
};

/* ------------------------------------------------------------------ */
/*  Validators: return an error message, or undefined when valid.      */
/* ------------------------------------------------------------------ */
const str = (v) => String(v ?? "").trim();

const lettersName = (label, min = 2) => (v) =>
  V.name(v, label) ||
  (str(v).length < min ? `${label} must be at least ${min} letters.` : undefined);

const mobile = (label) => (v) => {
  const s = str(v);
  if (!s) return `${label} is required.`;
  if (!/^\d+$/.test(s)) return `${label} must contain digits only.`;
  if (s.length !== 10) return `${label} must be exactly 10 digits.`;
  if (!/^[6-9]/.test(s)) return `${label} must start with 6, 7, 8 or 9.`;
  return undefined;
};

const textField = (label, { min = 2, max = 100, re, reMsg } = {}) => (v) => {
  const s = str(v);
  if (!s) return `${label} is required.`;
  if (s.length < min) return `${label} must be at least ${min} characters.`;
  if (s.length > max) return `${label} must be at most ${max} characters.`;
  if (re && !re.test(s)) return reMsg || `Enter a valid ${label.toLowerCase()}.`;
  return undefined;
};

export const validators = {
  /* ---------- Employee ---------- */
  first_name: lettersName("First name"),
  last_name: lettersName("Last name", 1),
  mobile_number: mobile("Mobile number"),
  skills: textField("Skills", {
    min: 2,
    max: 200,
    re: /^[\p{L}\d][\p{L}\d\s,.+#/&()-]*$/u,
    reMsg: "Skills can contain letters, numbers and commas only.",
  }),
  address: textField("Address", { min: 5, max: 200 }),
  country: lettersName("Country"),
  state: lettersName("State"),
  availability_of_work: lettersName("Availability of work"),
  disability: textField("Disability", {
    min: 2,
    max: 100,
    re: /^\p{L}[\p{L}\s,.()'-]*$/u,
    reMsg: "Disability can contain letters only (no numbers).",
  }),
  job_experiences: (v) =>
    typeof v === "string" && v.trim().length > 500
      ? "Job experiences must be at most 500 characters."
      : undefined, // optional
  languages_known: (v) =>
    !str(v)
      ? "Languages known is required."
      : !/^\p{L}[\p{L}\s,]*$/u.test(str(v))
      ? "Enter languages as letters separated by commas (e.g. English, Hindi)."
      : undefined,

  /* ---------- Employer ---------- */
  company_name: textField("Company name", {
    min: 2,
    max: 100,
    re: /^[\p{L}\d][\p{L}\d\s&.,'()-]*$/u,
    reMsg: "Company name contains invalid characters.",
  }),
  location: (v) =>
    V.name(v, "Location") ||
    (str(v).length < 2 ? "Location must be at least 2 letters." : undefined),
  email: (v) => V.email(v, "Email"),
  company_contact: mobile("Company contact"),
  industry: textField("Industry", {
    min: 2,
    max: 60,
    re: /^\p{L}[\p{L}\s&,/().-]*$/u,
    reMsg: "Industry can contain letters only (no numbers).",
  }),
  company_website: (v) => V.url(v, "Website"),
  head_first_name: lettersName("Hr first name"),
  head_last_name: lettersName("Hr last name", 1),
  head_email: (v) => V.email(v, "Hr email"),
  head_contact: mobile("Hr contact"),
  head_designation: lettersName("Hr designation"),
  linkedinlink: (v) =>
    V.url(v, "LinkedIn link") ||
    (!/linkedin\.com/i.test(str(v)) ? "Enter a valid LinkedIn link (linkedin.com/in/your-name)." : undefined),
};

/* Validate every field of a form → { field: message } (valid fields omitted). */
export const validateFields = (fields, values) =>
  fields.reduce((errs, f) => {
    const msg = validators[f]?.(values[f]);
    if (msg) errs[f] = msg;
    return errs;
  }, {});
