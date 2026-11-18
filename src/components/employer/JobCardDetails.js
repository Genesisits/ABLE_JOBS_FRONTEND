import React, { useState } from "react";

const text = (v) => (v === null || v === undefined ? "" : String(v).trim());
const toUrl = (u) => (/^https?:\/\//i.test(u) ? u : `https://${u}`);

// [label, key in the job record]
const FIELDS = [
  ["Qualification", "qualification_required"],
  ["Positions", "number_of_positions"],
  ["Disability eligible", "disability_eligible"],
  ["Work mode", "work_mode"],
  ["Notice period", "notice_period"],
  ["Industry", "industry"],
  ["Department", "department"],
  ["State", "state"],
];

const LONG_DESCRIPTION = 140; // characters before "Read more" appears

export default function JobCardDetails({ row }) {
  const [open, setOpen] = useState(false);

  const description = text(row.description);
  const website = text(row.company_website);
  const items = FIELDS.map(([label, key]) => [label, text(row[key])]).filter(([, v]) => v);

  if (!description && !website && items.length === 0) return null;

  const isLong = description.length > LONG_DESCRIPTION;

  return (
    <div className="ajh-details">
      {description && (
        <div className="ajh-desc">
          <span className="ajh-dlabel">Description</span>
          <p className={isLong && !open ? "is-clamped" : undefined}>{description}</p>
          {isLong && (
            <button
              type="button"
              className="ajh-readmore"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? "Show less" : "Read more"}
            </button>
          )}
        </div>
      )}

      {(items.length > 0 || website) && (
        <dl className="ajh-dgrid">
          {items.map(([label, value]) => (
            <div className="ajh-ditem" key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
          {website && (
            <div className="ajh-ditem">
              <dt>Website</dt>
              <dd>
                <a href={toUrl(website)} target="_blank" rel="noopener noreferrer">
                  {website.replace(/^https?:\/\//i, "")}
                </a>
              </dd>
            </div>
          )}
        </dl>
      )}
    </div>
  );
}
