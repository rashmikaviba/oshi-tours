"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookingFormData, INITIAL_FORM_DATA } from "./types";
import StepProgress from "./StepProgress";
import Step1Personal from "./steps/Step1Personal";
import Step2Flight from "./steps/Step2Flight";
import Step3Trip from "./steps/Step3Trip";
import Step4Transport from "./steps/Step4Transport";
import Step5Additional from "./steps/Step5Additional";
import Step6Review from "./steps/Step6Review";
import { CheckCircle } from "lucide-react";
import { handleEmailClick, GMAIL_COMPOSE_URL } from "@/lib/emailHelper";

const TOTAL_STEPS = 6;

export default function BookingForm({
  experienceName,
  hideActivityFields = false,
}: {
  experienceName?: string;
  hideActivityFields?: boolean;
}) {
 const [step, setStep] = useState(1);
 const [formData, setFormData] = useState<BookingFormData>(INITIAL_FORM_DATA);
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [reference, setReference] = useState<string | null>(null);
 const [error, setError] = useState<string | null>(null);

 const updateData = (fields: Partial<BookingFormData>) => {
 setFormData((prev) => ({ ...prev, ...fields }));
 };

 const nextStep = () => {
 if (step < TOTAL_STEPS) setStep(step + 1);
 };

 const prevStep = () => {
 if (step > 1) setStep(step - 1);
 };

 const submitBooking = async () => {
 setIsSubmitting(true);
 setError(null);
 try {
 const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
 const response = await fetch(`${apiUrl}/api/bookings`, {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify({ ...formData, experienceName }),
 });

 const data = await response.json();
 if (data.success) {
 setReference(data.reference);
 } else {
 setError(data.message || "Failed to submit booking.");
 }
 } catch (err) {
 setError("An unexpected error occurred. Please try again.");
 } finally {
 setIsSubmitting(false);
 }
 };

 if (reference) {
 return (
 <div className="max-w-2xl mx-auto py-20 px-6 text-center">
 <motion.div
 initial={{ opacity: 0, scale: 0.9 }}
 animate={{ opacity: 1, scale: 1 }}
 className="bg-[var(--color-beige)] text-[var(--color-green)] p-12 flex flex-col items-center justify-center border border-black/5 rounded-sm"
 >
 <CheckCircle className="w-16 h-16 mb-6 opacity-80" />
 <h2 className="font-[family-name:var(--font-grandslang)] text-4xl mb-4">Request Received</h2>
 <p className="font-[family-name:var(--font-newsreader)] text-lg mb-8 opacity-90">
 Thank you for choosing OSHĪ. We have successfully received your booking request.
 </p>
 <div className="bg-white/40 px-8 py-4 rounded-sm">
 <p className="text-sm uppercase tracking-widest opacity-70 mb-1 font-mono">Reference Number</p>
 <p className="text-2xl font-mono tracking-wider font-semibold">{reference}</p>
 </div>
 <p className="font-[family-name:var(--font-newsreader)] text-md mt-8 opacity-80">
 We&apos;ve emailed a copy to our team and will be in touch shortly to finalize your itinerary.
 </p>
 </motion.div>
 </div>
 );
 }

 return (
 <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16 py-12 lg:py-24">
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
 
 {/* Left Column: Form */}
 <div className="lg:col-span-8 order-2 lg:order-1">
 <div className="mb-10">
 <h2 className="font-[family-name:var(--font-grandslang)] text-3xl sm:text-4xl text-[var(--color-green)] mb-3">
 Craft Your Journey
 </h2>
 <p className="font-[family-name:var(--font-newsreader)] text-lg text-[var(--color-green)] opacity-80">
 Tell us your preferences, and our specialists will tailor every detail.
 </p>
 </div>

 <StepProgress currentStep={step} totalSteps={TOTAL_STEPS} />

 <div className="relative min-h-[400px] mt-10 overflow-hidden">
 <AnimatePresence mode="wait" initial={false}>
 <motion.div
 key={step}
 initial={{ opacity: 0, x: 20 }}
 animate={{ opacity: 1, x: 0 }}
 exit={{ opacity: 0, x: -20 }}
 transition={{ duration: 0.3, ease: "easeOut" }}
 className="w-full"
 >
 {step === 1 && <Step1Personal data={formData} update={updateData} next={nextStep} />}
 {step === 2 && <Step2Flight data={formData} update={updateData} next={nextStep} prev={prevStep} />}
 {step === 3 && <Step3Trip data={formData} update={updateData} next={nextStep} prev={prevStep} />}
 {step === 4 && <Step4Transport data={formData} update={updateData} next={nextStep} prev={prevStep} />}
 {step === 5 && (
   <Step5Additional
     data={formData}
     update={updateData}
     next={nextStep}
     prev={prevStep}
     hideActivityFields={hideActivityFields}
   />
 )}
 {step === 6 && (
 <Step6Review 
 data={formData} 
 prev={prevStep} 
 submit={submitBooking} 
 isSubmitting={isSubmitting} 
 error={error} 
 />
 )}
 </motion.div>
 </AnimatePresence>
 </div>
 </div>

 {/* Right Column: Sticky Info Panel */}
 <div className="lg:col-span-4 order-1 lg:order-2">
 <div className="sticky top-32 bg-[var(--color-beige)]/30 border border-[var(--color-green)]/10 p-8 sm:p-10 rounded-sm text-[var(--color-green)]">
 <h3 className="font-[family-name:var(--font-grandslang)] text-2xl mb-6">The OSHĪ Promise</h3>
 
 <ul className="space-y-5 mb-8 font-[family-name:var(--font-newsreader)] text-[1.05rem] opacity-90 leading-relaxed">
 <li className="flex gap-3 items-start">
 <span className="block mt-1 w-1.5 h-1.5 rounded-full bg-[var(--color-green)] opacity-70 shrink-0" />
 <span>Every journey is tailored, our team confirms every detail personally.</span>
 </li>
 <li className="flex gap-3 items-start">
 <span className="block mt-1 w-1.5 h-1.5 rounded-full bg-[var(--color-green)] opacity-70 shrink-0" />
 <span>Exclusive access to Sri Lanka&apos;s most remote sanctuaries and private estates.</span>
 </li>
 <li className="flex gap-3 items-start">
 <span className="block mt-1 w-1.5 h-1.5 rounded-full bg-[var(--color-green)] opacity-70 shrink-0" />
 <span>24/7 dedicated concierge from arrival to departure.</span>
 </li>
 </ul>

 <div className="pt-6 border-t border-[var(--color-green)]/10">
 <p className="text-sm font-mono tracking-widest uppercase opacity-70 mb-2">Need Assistance?</p>
 <a href={GMAIL_COMPOSE_URL} target="_blank" rel="noopener noreferrer" onClick={handleEmailClick} className="font-[family-name:var(--font-newsreader)] text-lg hover:opacity-70 transition-opacity cursor-pointer pointer-events-auto relative z-10">
 oshitourslanka@gmail.com
 </a>
 </div>
 </div>
 </div>

 </div>
 </div>
 );
}
