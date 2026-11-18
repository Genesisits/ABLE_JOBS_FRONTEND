import { useState } from "react";

/* Input sanitizers – block invalid characters while typing. */
export const clean = {
  name: (v) => v.replace(/[^\p{L}\s.'-]/gu, "").replace(/^\s+/, "").slice(0, 50), // no digits
  list: (v) => v.replace(/[^\p{L}\s,]/gu, "").replace(/^[\s,]+/, ""),             // "English, Hindi"
  digits: (v) => v.replace(/\D/g, "").slice(0, 10),                               // phone
  years: (v) => v.replace(/[^\d.]/g, "").slice(0, 4),
  hours: (v) => v.replace(/\D/g, "").slice(0, 3),
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const URL_RE = /^(https?:\/\/)?([\w-]+\.)+[\w]{2,}(\/\S*)?$/i;

/* Validators – return an error string, or undefined when valid. */
export const V = {
  req: (v, label) => (!String(v ?? "").trim() ? `${label} is required.` : undefined),
  name: (v, label) =>
    !String(v ?? "").trim()
      ? `${label} is required.`
      : !/^\p{L}[\p{L}\s.'-]*$/u.test(v.trim())
      ? `${label} can contain letters only (no numbers).`
      : undefined,
  email: (v, label = "Email") =>
    !String(v ?? "").trim()
      ? `${label} is required.`
      : !EMAIL.test(v.trim())
      ? `Enter a valid ${label.toLowerCase()} (name@example.com).`
      : undefined,
  mobile: (v, label = "Mobile number") =>
    !v ? `${label} is required.` : !/^[6-9]\d{9}$/.test(v) ? `Enter a valid 10-digit ${label.toLowerCase()}.` : undefined,
  password: (v) =>
    !v ? "Password is required." : v.length < 6 ? "Password must be at least 6 characters." : undefined,
  url: (v, label) =>
    !String(v ?? "").trim() ? `${label} is required.` : !URL_RE.test(v.trim()) ? `Enter a valid ${label.toLowerCase()}.` : undefined,
  num: (v, label, min, max) =>
    v === "" || v == null
      ? `${label} is required.`
      : isNaN(+v) || +v < min || +v > max
      ? `${label} must be between ${min} and ${max}.`
      : undefined,
  file: (f, label) => (!f ? `Please upload ${label}.` : undefined),
  min: (v, label, n) =>
    !String(v ?? "").trim() ? `${label} is required.` : v.trim().length < n ? `${label} must be at least ${n} characters.` : undefined,
};

/*
 * Field-error state for a form. `getErrors` returns { key: message }.
 *  chg(setter,key,fmt) – onChange: sanitize, set value, clear that error
 *  blur(key)           – onBlur: validate just that field
 *  submit()            – validate all, show errors, true when form is valid
 */
export function useFieldErrors(getErrors) {
  const [errors, setErrors] = useState({});
  const all = () => Object.fromEntries(Object.entries(getErrors()).filter(([, m]) => m));
  const clr = (k) => setErrors((p) => (p[k] ? { ...p, [k]: undefined } : p));
  const chg = (setter, key, fmt = (v) => v) => (e) => { setter(fmt(e.target.value)); clr(key); };
  const blur = (k) => setErrors((p) => ({ ...p, [k]: all()[k] }));
  const submit = () => { const e = all(); setErrors(e); return Object.keys(e).length === 0; };
  return { errors, setErrors, clr, chg, blur, submit };
}
