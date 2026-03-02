"use client";

import { motion } from "framer-motion";

const FOOTER_LINKS = [
  { label: "Events", href: "#events" },
  { label: "Rules", href: "#rules" },
  { label: "Register", href: "#register" },
  { label: "About", href: "#about" },
];

export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent-muted flex items-center justify-center text-background text-xs font-bold">
                FX
              </div>
              <div>
                <div className="text-text-primary text-sm font-semibold tracking-widest uppercase">
                  Fusion X '26
                </div>
                <div className="text-text-muted text-[9px] tracking-ultrawide uppercase">
                  KiTE Symposium
                </div>
              </div>
            </div>
            <p className="text-text-muted text-xs leading-relaxed max-w-xs">
              Kumaraguru Institute of Technology & Engineering's premier
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

          {/* Contact */}
          <div>
            <h4 className="text-[9px] tracking-ultrawide uppercase text-accent mb-5">
              Event Details
            </h4>
            <ul className="space-y-3 text-text-muted text-xs leading-relaxed">
              <li>
                <span className="text-text-secondary">Date:</span> March 27, 2026
              </li>
              <li>
                <span className="text-text-secondary">Venue:</span> KiTE Campus
              </li>
              <li>
                <span className="text-text-secondary">Events:</span> 10 (8 Technical + 2 Non-Tech)
              </li>
              <li>
                <span className="text-text-secondary">Limit:</span> Max 2 events per participant
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-[9px] tracking-widest uppercase">
            © 2026 KiTE. All rights reserved.
          </p>
          <p className="text-text-muted text-[9px] tracking-widest uppercase">
            Where Innovation Takes Flight
          </p>
        </div>
      </div>
    </footer>
  );
}
