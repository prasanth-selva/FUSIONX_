"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export function PaymentSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section
      id="payment"
      ref={ref}
      className="py-20 sm:py-32 px-4 sm:px-6 relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[400px] bg-accent/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto relative">
        {/* Section label */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-10 h-px bg-accent/40" />
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-accent text-[10px] tracking-ultrawide uppercase"
          >
            Payment
          </motion.span>
          <div className="w-10 h-px bg-accent/40" />
        </div>

        {/* Title */}
        <div className="overflow-hidden mb-12 text-center">
          <motion.h2
            initial={{ y: "100%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-[clamp(1.5rem,4vw,3.5rem)] font-bold tracking-tight text-text-primary"
          >
            Registration Fee
          </motion.h2>
        </div>

        {/* Vendor Entry Fees Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-10 grid grid-cols-1 sm:grid-cols-3 gap-4 border border-accent/20 rounded p-6 bg-surface/40 backdrop-blur-sm"
        >
          <div className="sm:col-span-3 mb-2">
            <p className="text-[9px] tracking-ultrawide uppercase text-accent mb-1">Vendor / Stall Entry Fees</p>
            <p className="text-text-muted text-xs">Set up your stall at the Fusion X-26 marketplace — Registration closes <span className="text-accent font-semibold">March 24, 2026</span></p>
          </div>
          <div className="flex items-center gap-4 border border-border rounded p-4 bg-background/60">
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
                <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
              </svg>
            </div>
            <div>
              <p className="text-text-secondary text-[10px] uppercase tracking-widest">KITE Vendors</p>
              <p className="text-accent font-bold text-xl">₹500</p>
            </div>
          </div>
          <div className="flex items-center gap-4 border border-border rounded p-4 bg-background/60">
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
                <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
              </svg>
            </div>
            <div>
              <p className="text-text-secondary text-[10px] uppercase tracking-widest">Other Vendors</p>
              <p className="text-accent font-bold text-xl">₹1,000</p>
            </div>
          </div>
          <div className="flex items-center gap-4 border border-border rounded p-4 bg-background/60">
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.08 3.4 2 2 0 0 1 3.06 1.24h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 9.15a16 16 0 0 0 5.76 5.76l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21 16z"/>
              </svg>
            </div>
            <div>
              <p className="text-text-secondary text-[10px] uppercase tracking-widest mb-1">Stall Inquiry</p>
              <p className="text-[9px] uppercase tracking-widest text-accent/60 mb-0.5">Faculty Coordinator</p>
              <a href="tel:+919629002227" className="text-accent font-semibold text-xs hover:underline block">Dr. Rohini: 96290 02227</a>
              <a href="tel:+917339671429" className="text-accent font-semibold text-xs hover:underline block">Dr. Krishnaraj: 73396 71429</a>
              <p className="text-[9px] uppercase tracking-widest text-accent/60 mt-2 mb-0.5">Student Coordinators</p>
              <a href="tel:+919843296706" className="text-accent/80 text-xs hover:underline block">Mr. Vikaash: 98432 96706</a>
              <a href="tel:+919629365093" className="text-accent/80 text-xs hover:underline block">Mr. Prasanth: 96293 65093</a>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* QR Code */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="glass-card p-6 inline-flex flex-col items-center gap-4">
              {/* BHIM UPI header */}
              <div className="w-full flex items-center justify-center bg-[#007DC1] py-3 px-6 rounded-sm mb-2">
                <span className="text-white font-bold text-lg tracking-wide">BHIM UPI</span>
              </div>

              {/* QR Image */}
              <div className="relative w-64 h-64">
                <Image
                  src="/qr.jpeg"
                  alt="BHIM UPI Payment QR Code — KGISL Institute of Technology"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Institution name */}
              <p className="text-text-primary font-semibold text-sm tracking-wide text-center">
                KGISL INSTITUTE OF TECHNOLOGY
              </p>

              {/* UPI ID */}
              <div className="flex items-center gap-2 border border-border rounded px-4 py-2">
                <span className="text-text-muted text-[10px] uppercase tracking-widest">UPI ID</span>
                <span className="text-accent text-xs font-mono font-semibold">
                  25404730504086@cnrb
                </span>
              </div>

              <p className="text-text-muted text-[10px] tracking-widest uppercase">
                Scan using any UPI app
              </p>
            </div>
          </motion.div>

          {/* Payment Instructions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col gap-6"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
              How to Register
            </h3>

            {/* Steps */}
            {[
              {
                step: "01",
                title: "Fill the Registration Form",
                desc: "Click the Register Now button to complete your event registration form.",
              },
              {
                step: "02",
                title: "Complete Payment",
                desc: "Scan the QR code above using any BHIM UPI enabled app (Google Pay, PhonePe, Paytm, etc.) to pay the registration fee.",
              },
              {
                step: "03",
                title: "Upload Payment Proof",
                desc: "Attach the payment screenshot in the registration form to confirm your participation.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                className="flex gap-4 items-start"
              >
                <span className="text-accent font-mono font-bold text-2xl leading-none shrink-0 mt-0.5">
                  {item.step}
                </span>
                <div>
                  <p className="text-text-primary font-semibold text-sm mb-1">{item.title}</p>
                  <p className="text-text-muted text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}

            {/* CTA */}
            <motion.a
              href="https://docs.google.com/forms/d/e/1FAIpQLSeTcH8QkwFr-tNHPsD0m39dyyXEb4v-DdFNv_f4p6Li3-7Q_Q/viewform"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="w-full sm:w-auto inline-block text-center px-10 py-4 bg-accent text-background text-xs tracking-widest uppercase font-semibold hover:bg-accent/90 transition-all duration-300 hover:shadow-[0_0_40px_rgba(200,169,110,0.3)] mt-2"
            >
              Register Now →
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
