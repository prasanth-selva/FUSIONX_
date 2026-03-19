"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const FOOTER_LINKS = [
  { label: "Events", href: "#events" },
  { label: "Rules", href: "#rules" },
  { label: "Register", href: "#register" },
  { label: "About", href: "#about" },
];

const MAPS_EMBED =
  "https://maps.google.com/maps?q=KGISL+Institute+of+Technology+Coimbatore&t=&z=15&ie=UTF8&iwloc=&output=embed";
const MAPS_LINK = "https://maps.app.goo.gl/fJEHESX4u2MJrBaJA";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-16 pb-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* ── Venue / Map section ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px bg-accent w-8 flex-shrink-0" />
            <span className="text-accent text-[9px] tracking-ultrawide uppercase">
              Venue
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Info */}
            <div>
              <h3 className="text-text-primary text-xl sm:text-2xl font-bold tracking-tight mb-2">
                KGISL Institute of Technology
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-5">
                KGISL Institute of Technology,
                Coimbatore, Tamil Nadu — March 27, 2026.
              </p>
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[9px] tracking-widest uppercase font-semibold
                  px-4 py-2.5 border border-accent/50 text-accent
                  hover:bg-accent hover:text-background transition-all duration-300"
              >
                <svg width="10" height="13" viewBox="0 0 10 13" fill="currentColor">
                  <path d="M5 0C2.24 0 0 2.24 0 5c0 3.75 5 8 5 8s5-4.25 5-8c0-2.76-2.24-5-5-5zm0 6.5C4.17 6.5 3.5 5.83 3.5 5S4.17 3.5 5 3.5 6.5 4.17 6.5 5 5.83 6.5 5 6.5z"/>
                </svg>
                Get Directions
              </a>
            </div>

            {/* Google Maps iframe */}
            <div className="relative w-full overflow-hidden border border-border" style={{ height: 260 }}>
              {/* Accent overlay corners */}
              <span className="absolute top-0 left-0 w-4 h-4 border-t border-l border-accent z-10 pointer-events-none" />
              <span className="absolute top-0 right-0 w-4 h-4 border-t border-r border-accent z-10 pointer-events-none" />
              <span className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-accent z-10 pointer-events-none" />
              <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-accent z-10 pointer-events-none" />
              {/* Dark tint overlay (non-interactive) */}
              <div className="absolute inset-0 bg-background/20 pointer-events-none z-[5]" />
              <iframe
                src={MAPS_EMBED}
                width="100%"
                height="260"
                style={{ border: 0, filter: "grayscale(80%) invert(90%) contrast(90%) brightness(0.55) hue-rotate(180deg)", display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="KGISL Campus Location"
              />
            </div>
          </div>
        </motion.div>

        {/* ── Grid: brand / links / details / contact ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-12 border-t border-border pt-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-accent/30 bg-surface">
                <Image
                  src="/kite-logo.jpg"
                  alt="KGISL Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-text-primary text-sm font-semibold tracking-widest uppercase">
                  Fusion X '26
                </div>
                <div className="text-text-muted text-[9px] tracking-ultrawide uppercase">
                  KGISL Symposium
                </div>
              </div>
            </div>
            <p className="text-text-muted text-xs leading-relaxed max-w-xs">
              KGISL Institute of Technology's premier
              intercollegiate technical symposium. March 27, 2026.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-[9px] tracking-ultrawide uppercase text-accent mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-text-muted text-xs tracking-widest uppercase hover:text-accent transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Event Details */}
          <div>
            <h4 className="text-[9px] tracking-ultrawide uppercase text-accent mb-5">
              Event Details
            </h4>
            <ul className="space-y-3 text-text-muted text-xs leading-relaxed">
              <li><span className="text-text-secondary">Date:</span> March 27, 2026</li>
              <li><span className="text-text-secondary">Venue:</span> KGISL Campus, Coimbatore</li>
              <li><span className="text-text-secondary">Reg. Closes:</span> March 24, 2026</li>
              <li><span className="text-text-secondary">Events:</span> 10 (8 Technical + 2 Non-Tech)</li>
              <li><span className="text-text-secondary">Limit:</span> Max 2 events per participant</li>
            </ul>

            <div className="mt-6">
              <h4 className="text-[9px] tracking-ultrawide uppercase text-accent mb-4">
                Stall Inquiries
              </h4>
            
              
              <p className="text-text-muted text-[10px] mt-3 leading-relaxed">
                For stall inquiries, please contact faculty coordinators.
              </p>
              <div className="mt-3 space-y-1">
                <p className="text-[9px] tracking-ultrawide uppercase text-text-secondary">Faculty Coordinators</p>
                <a
                  href="tel:+919843296706"
                  className="text-accent text-xs hover:underline transition-colors duration-200 block font-semibold"
                >
                  Dr. Rohini — +91 98432 96706
                </a>
                <a
                  href="tel:+917339671429"
                  className="text-accent text-xs hover:underline transition-colors duration-200 block font-semibold"
                >
                  Dr. Krishnaraj — +91 73396 71429
                </a>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[9px] tracking-ultrawide uppercase text-accent mb-5">
              Contact
            </h4>
            <div className="space-y-5">
              <div>
                <p className="text-[9px] tracking-ultrawide uppercase text-text-secondary mb-2">
                  Student Incharge
                </p>
                <ul className="space-y-2 text-text-muted text-xs leading-relaxed">
                  <li>
                    <span className="text-text-secondary block">Mr. Vikaash</span>
                    <a
                      href="tel:+919843296706"
                      className="hover:text-accent transition-colors duration-200"
                    >
                      +91 98432 96706
                    </a>
                    <span className="ml-1 text-[9px] text-accent/70 uppercase tracking-wider">Chairman</span>
                  </li>
                  <li>
                    <span className="text-text-secondary block">Mr. Prasanth</span>
                    <a
                      href="tel:+919629365093"
                      className="hover:text-accent transition-colors duration-200"
                    >
                      +91 96293 65093
                    </a>
                    <span className="ml-1 text-[9px] text-accent/70 uppercase tracking-wider">Vice Chairman</span>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-[9px] tracking-ultrawide uppercase text-text-secondary mb-2">
                  Faculty Incharge
                </p>
                <ul className="space-y-2 text-text-muted text-xs leading-relaxed">
                  <li>
                    <span className="text-text-secondary block">Dr. Rohini</span>
                    <a
                      href="tel:+919629002227"
                      className="hover:text-accent transition-colors duration-200"
                    >
                      +91 96290 02227
                    </a>
                  </li>
                  <li>
                    <span className="text-text-secondary block">Dr. Krishnaraj</span>
                    <a
                      href="tel:+917339671429"
                      className="hover:text-accent transition-colors duration-200"
                    >
                      +91 73396 71429
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-[9px] tracking-widest uppercase">
            © 2026 KGISL. All rights reserved.
          </p>
          <p className="text-text-muted text-[9px] tracking-widest uppercase">
            Where Innovation Takes Flight
          </p>
        </div>
      </div>
    </footer>
  );
}
