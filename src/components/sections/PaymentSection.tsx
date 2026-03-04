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
