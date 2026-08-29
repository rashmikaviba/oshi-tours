"use client";

import { useState } from "react";
import { TripPlannerFormData } from "@/types/tripPlanner";
import { User, Mail, Phone, Globe, ArrowRight, ArrowLeft } from "lucide-react";

interface Props {
  data: TripPlannerFormData;
  update: (fields: Partial<TripPlannerFormData>) => void;
  next: () => void;
  prev: () => void;
}

export default function Step2Personal({ data, update, next, prev }: Props) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!data.firstName.trim()) newErrors.firstName = "First name is required";
    if (!data.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!data.email.trim() || !/^\S+@\S+\.\S+$/.test(data.email)) newErrors.email = "Valid email is required";
    if (!data.phone.trim()) newErrors.phone = "Phone number is required";
    if (!data.nationality.trim()) newErrors.nationality = "Nationality is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      next();
    }
  };

  return (
    <div className="text-[var(--color-green)] space-y-6">
      <div>
        <span className="text-xs font-mono tracking-widest uppercase text-[var(--color-green-70)] block mb-1">
          Step 2 • Contact Information
        </span>
        <h3 className="font-[family-name:var(--font-grandslang)] text-3xl text-[var(--color-green)]">
          Personal Details
        </h3>
        <p className="font-[family-name:var(--font-ogg)] text-sm text-[var(--color-green-70)] mt-1">
          Please provide your contact details so our travel designers can correspond with you.
        </p>
      </div>

      <div className="bg-[var(--color-beige)]/60 p-6 sm:p-8 rounded-3xl border border-[var(--color-green)]/15 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono tracking-wider opacity-70 mb-2 uppercase">
              First Name <span className="text-red-600">*</span>
            </label>
            <div className="relative flex items-center">
              <User className="absolute left-4 w-4 h-4 text-[var(--color-green)]/40 pointer-events-none" />
              <input
                type="text"
                value={data.firstName}
                onChange={(e) => update({ firstName: e.target.value })}
                placeholder="Eleanor"
                className="w-full bg-[var(--color-beige)]/40 border border-[var(--color-green)]/20 rounded-xl pl-11 pr-4 py-3 font-[family-name:var(--font-ogg)] text-base text-[var(--color-green)] focus:outline-none focus:border-[var(--color-green)] transition-colors"
              />
            </div>
            {errors.firstName && <p className="text-red-600 text-xs mt-1 font-mono">{errors.firstName}</p>}
          </div>

          <div>
            <label className="block text-xs font-mono tracking-wider opacity-70 mb-2 uppercase">
              Last Name <span className="text-red-600">*</span>
            </label>
            <div className="relative flex items-center">
              <User className="absolute left-4 w-4 h-4 text-[var(--color-green)]/40 pointer-events-none" />
              <input
                type="text"
                value={data.lastName}
                onChange={(e) => update({ lastName: e.target.value })}
                placeholder="Vane"
                className="w-full bg-[var(--color-beige)]/40 border border-[var(--color-green)]/20 rounded-xl pl-11 pr-4 py-3 font-[family-name:var(--font-ogg)] text-base text-[var(--color-green)] focus:outline-none focus:border-[var(--color-green)] transition-colors"
              />
            </div>
            {errors.lastName && <p className="text-red-600 text-xs mt-1 font-mono">{errors.lastName}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono tracking-wider opacity-70 mb-2 uppercase">
              Email Address <span className="text-red-600">*</span>
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-4 w-4 h-4 text-[var(--color-green)]/40 pointer-events-none" />
              <input
                type="email"
                value={data.email}
                onChange={(e) => update({ email: e.target.value })}
                placeholder="eleanor@example.com"
                className="w-full bg-[var(--color-beige)]/40 border border-[var(--color-green)]/20 rounded-xl pl-11 pr-4 py-3 font-[family-name:var(--font-ogg)] text-base text-[var(--color-green)] focus:outline-none focus:border-[var(--color-green)] transition-colors"
              />
            </div>
            {errors.email && <p className="text-red-600 text-xs mt-1 font-mono">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-xs font-mono tracking-wider opacity-70 mb-2 uppercase">
              Phone / WhatsApp <span className="text-red-600">*</span>
            </label>
            <div className="relative flex items-center">
              <Phone className="absolute left-4 w-4 h-4 text-[var(--color-green)]/40 pointer-events-none" />
              <input
                type="tel"
                value={data.phone}
                onChange={(e) => update({ phone: e.target.value })}
                placeholder="+44 7700 900077"
                className="w-full bg-[var(--color-beige)]/40 border border-[var(--color-green)]/20 rounded-xl pl-11 pr-4 py-3 font-[family-name:var(--font-ogg)] text-base text-[var(--color-green)] focus:outline-none focus:border-[var(--color-green)] transition-colors"
              />
            </div>
            {errors.phone && <p className="text-red-600 text-xs mt-1 font-mono">{errors.phone}</p>}
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono tracking-wider opacity-70 mb-2 uppercase">
            Nationality <span className="text-red-600">*</span>
          </label>
          <div className="relative flex items-center">
            <Globe className="absolute left-4 w-4 h-4 text-[var(--color-green)]/40 pointer-events-none" />
            <input
              type="text"
              value={data.nationality}
              onChange={(e) => update({ nationality: e.target.value })}
              placeholder="e.g. British / United Kingdom"
              className="w-full bg-[var(--color-beige)]/40 border border-[var(--color-green)]/20 rounded-xl pl-11 pr-4 py-3 font-[family-name:var(--font-ogg)] text-base text-[var(--color-green)] focus:outline-none focus:border-[var(--color-green)] transition-colors"
            />
          </div>
          {errors.nationality && <p className="text-red-600 text-xs mt-1 font-mono">{errors.nationality}</p>}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={prev}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--color-green)]/30 text-[var(--color-green)] font-mono text-xs tracking-widest uppercase hover:bg-[var(--color-green)]/5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-green)] text-[var(--color-beige)] rounded-full font-mono text-xs tracking-widest uppercase hover:bg-opacity-90 transition-all shadow-sm"
        >
          <span>Continue to Flight Details</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
