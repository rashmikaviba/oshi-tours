"use client";

import { useState } from "react";
import { BookingFormData } from "../types";

interface Props {
  data: BookingFormData;
  update: (data: Partial<BookingFormData>) => void;
  next: () => void;
}

export default function Step1Personal({ data, update, next }: Props) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!data.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (data.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    if (!data.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (data.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

    if (!data.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      newErrors.email = "Please enter a valid email address (e.g. jane@example.com)";
    }

    if (!data.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[+\d\s()-]{7,20}$/.test(data.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number (at least 7 digits)";
    }

    if (!data.nationality.trim()) {
      newErrors.nationality = "Nationality is required";
    } else if (data.nationality.trim().length < 2) {
      newErrors.nationality = "Please enter a valid nationality";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      next();
    }
  };

  return (
    <div className="text-[var(--color-green)]">
      <h3 className="font-[family-name:var(--font-grandslang)] text-2xl mb-6">Personal Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-mono tracking-wider opacity-70 mb-2 uppercase">
            First Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={data.firstName}
            onChange={(e) => {
              update({ firstName: e.target.value });
              if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: "" }));
            }}
            className="w-full bg-transparent border-b border-[var(--color-green)]/30 py-3 focus:outline-none focus:border-[var(--color-green)] transition-colors font-[family-name:var(--font-newsreader)] text-lg placeholder-[var(--color-green)]/30"
            placeholder="Jane"
          />
          {errors.firstName && <p className="text-red-700 text-xs mt-1">{errors.firstName}</p>}
        </div>
        <div>
          <label className="block text-sm font-mono tracking-wider opacity-70 mb-2 uppercase">
            Last Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={data.lastName}
            onChange={(e) => {
              update({ lastName: e.target.value });
              if (errors.lastName) setErrors((prev) => ({ ...prev, lastName: "" }));
            }}
            className="w-full bg-transparent border-b border-[var(--color-green)]/30 py-3 focus:outline-none focus:border-[var(--color-green)] transition-colors font-[family-name:var(--font-newsreader)] text-lg placeholder-[var(--color-green)]/30"
            placeholder="Doe"
          />
          {errors.lastName && <p className="text-red-700 text-xs mt-1">{errors.lastName}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-mono tracking-wider opacity-70 mb-2 uppercase">
            Email Address <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => {
              update({ email: e.target.value });
              if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
            }}
            className="w-full bg-transparent border-b border-[var(--color-green)]/30 py-3 focus:outline-none focus:border-[var(--color-green)] transition-colors font-[family-name:var(--font-newsreader)] text-lg placeholder-[var(--color-green)]/30"
            placeholder="jane@example.com"
          />
          {errors.email && <p className="text-red-700 text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-mono tracking-wider opacity-70 mb-2 uppercase">
            Phone Number <span className="text-red-600">*</span>
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => {
              update({ phone: e.target.value });
              if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
            }}
            className="w-full bg-transparent border-b border-[var(--color-green)]/30 py-3 focus:outline-none focus:border-[var(--color-green)] transition-colors font-[family-name:var(--font-newsreader)] text-lg placeholder-[var(--color-green)]/30"
            placeholder="+1 234 567 8900"
          />
          {errors.phone && <p className="text-red-700 text-xs mt-1">{errors.phone}</p>}
        </div>
      </div>

      <div className="mb-10">
        <label className="block text-sm font-mono tracking-wider opacity-70 mb-2 uppercase">
          Nationality <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          value={data.nationality}
          onChange={(e) => {
            update({ nationality: e.target.value });
            if (errors.nationality) setErrors((prev) => ({ ...prev, nationality: "" }));
          }}
          className="w-full bg-transparent border-b border-[var(--color-green)]/30 py-3 focus:outline-none focus:border-[var(--color-green)] transition-colors font-[family-name:var(--font-newsreader)] text-lg placeholder-[var(--color-green)]/30"
          placeholder="e.g. British"
        />
        {errors.nationality && <p className="text-red-700 text-xs mt-1">{errors.nationality}</p>}
      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={handleNext}
          className="px-8 py-4 rounded-full bg-[var(--color-green)] text-[var(--color-beige)] font-mono text-xs tracking-widest uppercase hover:bg-opacity-90 transition-all duration-300 cursor-pointer shadow-md"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}
