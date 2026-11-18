import React, { useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "./gallery.css";

import { images } from "./images";
/*
  images.js should export an array shaped like:
  export const images = [
    { src: "/images/conference.jpg", alt: "Annual conference", category: "Events" },
    { src: "/images/handshake.jpg",  alt: "Partnership deal",  category: "Corporate" },
    ...
  ];
  category must be one of: Events, Corporate, Training, Achievements, Others
*/

const PAGE_SIZE = 8; // 4 columns x 2 rows, as in the design

/* ---------- inline icons (no extra dependency) ---------- */
const Icon = ({ children, size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const CameraIcon = () => (
  <Icon size={26}>
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z" />
    <circle cx="12" cy="13" r="3.5" />
  </Icon>
);
const CalendarIcon = () => (
  <Icon>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </Icon>
);
const BriefcaseIcon = () => (
  <Icon>
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M2 13h20" />
  </Icon>
);
const CapIcon = () => (
  <Icon>
    <path d="M22 10 12 5 2 10l10 5 10-5z" />
    <path d="M6 12v5c3 2.5 9 2.5 12 0v-5" />
  </Icon>
);
const TrophyIcon = () => (
  <Icon>
    <path d="M6 4h12v5a6 6 0 0 1-12 0V4z" />
    <path d="M6 6H3v1a3 3 0 0 0 3 3M18 6h3v1a3 3 0 0 1-3 3M12 15v4M8 21h8" />
  </Icon>
);
const ImageIcon = () => (
  <Icon>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="m21 15-5-5L5 21" />
  </Icon>
);
const ArrowIcon = () => (
  <Icon size={18}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Icon>
);

const FILTERS = [
  { label: "All", icon: null },
  { label: "Events", icon: <CalendarIcon /> },
  { label: "Corporate", icon: <BriefcaseIcon /> },
  { label: "Training", icon: <CapIcon /> },
  { label: "Achievements", icon: <TrophyIcon /> },
  { label: "Others", icon: <ImageIcon /> },
];

const DotGrid = ({ className }) => (
  <div className={`ogal-dots ${className}`} aria-hidden="true">
    {Array.from({ length: 15 }).map((_, i) => (
      <span key={i} />
    ))}
  </div>
);

export default function OurGallery() {
  const [active, setActive] = useState("All");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const filtered = useMemo(
    () => (active === "All" ? images : images.filter((img) => img.category === active)),
    [active]
  );
  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  const changeFilter = (label) => {
    setActive(label);
    setVisible(PAGE_SIZE);
  };

  return (
    <section className="ogal-section">
      <div className="ogal-blob ogal-blob--top" aria-hidden="true" />
      <div className="ogal-blob ogal-blob--bottom" aria-hidden="true" />
      <DotGrid className="ogal-dots--left" />
      <DotGrid className="ogal-dots--right" />
      <DotGrid className="ogal-dots--bottom" />

      <header className="ogal-header">
        <div className="ogal-camera-row">
          <span className="ogal-line ogal-line--navy" />
          <span className="ogal-camera">
            <CameraIcon />
          </span>
          <span className="ogal-line ogal-line--navy" />
        </div>

        <div className="ogal-title-row">
          <span className="ogal-line ogal-line--gold" />
          <h2 className="ogal-title">
            Our <span>Gallery</span>
          </h2>
          <span className="ogal-line ogal-line--gold" />
        </div>

        <p className="ogal-subtitle">Moments that inspire, events that unite</p>
      </header>

      <div className="ogal-filters" role="tablist" aria-label="Gallery categories">
        {FILTERS.map(({ label, icon }) => (
          <button
            key={label}
            role="tab"
            aria-selected={active === label}
            className={`ogal-pill ${active === label ? "is-active" : ""}`}
            onClick={() => changeFilter(label)}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>

      <div className="ogal-grid">
        {shown.map((img, i) => (
          <button
            key={img.src}
            className="ogal-item"
            onClick={() => setLightboxIndex(i)}
            aria-label={`Open ${img.alt}`}
          >
            <img src={img.src} alt={img.alt} loading="lazy" />
          </button>
        ))}
        {shown.length === 0 && (
          <p className="ogal-empty">No photos in this category yet.</p>
        )}
      </div>

      {hasMore && (
        <div className="ogal-more">
          <button className="ogal-more-btn" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
            View More
            <span className="ogal-more-arrow">
              <ArrowIcon />
            </span>
          </button>
        </div>
      )}

      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={shown.map(({ src, alt }) => ({ src, alt }))}
      />

      
    </section>
  );
}