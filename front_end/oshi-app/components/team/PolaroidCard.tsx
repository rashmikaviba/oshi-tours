"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { TeamMember } from "@/data/team";

interface PolaroidCardProps {
  member: TeamMember;
  rotation: number;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  index: number;
}

export default function PolaroidCard({
  member,
  rotation,
  isHovered,
  onHoverStart,
  onHoverEnd,
  index
}: PolaroidCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onPointerEnter={onHoverStart}
      onPointerLeave={onHoverEnd}
      initial={{ rotate: rotation }}
      animate={{ 
        rotate: isHovered && !prefersReducedMotion ? 0 : rotation,
        scale: isHovered && !prefersReducedMotion ? 1.05 : 1,
        y: isHovered && !prefersReducedMotion ? -15 : 0,
        zIndex: isHovered ? 50 : 10 + index
      }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 22,
        mass: 0.8
      }}
      className="relative flex flex-col bg-[var(--color-white)] p-3 sm:p-4 pb-8 sm:pb-12 border border-black/5 rounded-sm cursor-pointer origin-bottom w-[280px] sm:w-[320px] shrink-0"
      style={{
        boxShadow: isHovered 
          ? "0 25px 50px -12px rgba(20, 32, 18, 0.25), 0 0 20px 0 rgba(0,0,0,0.05)" 
          : "0 10px 15px -3px rgba(20, 32, 18, 0.1), 0 4px 6px -2px rgba(20, 32, 18, 0.05)"
      }}
    >
      {/* Photo */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-[var(--color-beige-60)] rounded-sm">
        <Image
          src={member.photo}
          alt={member.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 280px, 320px"
        />
        {/* Subtle inner shadow overlay */}
        <div className="absolute inset-0 border border-black/5 pointer-events-none rounded-sm"></div>
      </div>

      {/* Caption Area */}
      <div className="pt-5 sm:pt-6 text-center select-none">
        {member.signature ? (
          <p className="font-[family-name:var(--font-grandslang)] italic text-2xl sm:text-3xl text-[var(--color-green)] mb-1">
            {member.signature}
          </p>
        ) : (
          <p className="font-[family-name:var(--font-grandslang)] text-xl text-[var(--color-green)] mb-1">
            {member.name}
          </p>
        )}
        <p className="body-serif text-[10px] sm:text-xs uppercase tracking-widest text-[var(--color-green-70)] mt-2">
          {member.role}
        </p>
      </div>
    </motion.div>
  );
}
