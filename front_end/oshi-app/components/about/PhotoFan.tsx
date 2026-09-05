"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function PhotoFan() {
 const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

 const photos = [
 {
 id: "photo-1",
 src: "/media/card_2.jpg",
 alt: "Sri Lanka tea country railway crossing lush misty hills",
 label: "Highlands",
 // Left photo: tilted left (-12°), shifted left
 baseTransform: "-translate-x-14 sm:-translate-x-20 md:-translate-x-24 lg:-translate-x-28 -rotate-[12deg] z-10",
 hoverTransform: "group-hover:-translate-x-20 sm:group-hover:-translate-x-32 lg:group-hover:-translate-x-36 group-hover:-rotate-6 group-hover:scale-105 group-hover:z-30",
 },
 {
 id: "photo-2",
 src: "/media/card_1.jpg",
 alt: "Serene southern palm shore and golden sand of Galle coast",
 label: "South Coast",
 // Center photo: centered, elevated slightly, top layer (z-20)
 baseTransform: "translate-x-0 -translate-y-2 sm:-translate-y-4 rotate-[1deg] z-20 shadow-2xl",
 hoverTransform: "group-hover:-translate-y-6 sm:group-hover:-translate-y-8 group-hover:rotate-0 group-hover:scale-105 group-hover:z-40",
 },
 {
 id: "photo-3",
 src: "/media/card_3.jpg",
 alt: "Wild leopard resting inside jungle sanctuary in Yala",
 label: "Wilpattu",
 // Right photo: tilted right (+12°), shifted right (+translate-x)
 baseTransform: "translate-x-14 sm:translate-x-20 md:translate-x-24 lg:translate-x-28 rotate-[12deg] z-10",
 hoverTransform: "group-hover:translate-x-20 sm:group-hover:translate-x-32 lg:group-hover:translate-x-36 group-hover:rotate-6 group-hover:scale-105 group-hover:z-30",
 },
 ];

 return (
 <div
 className="group relative w-full h-full flex flex-col justify-between py-2 sm:py-4 bg-transparent overflow-hidden lg:overflow-visible"
 data-about-card="photos"
 >
 {/* Photo Fan Cluster Container */}
 <div className="relative w-full h-[220px] sm:h-[260px] md:h-[280px] lg:h-[300px] flex items-center justify-center my-auto">
 {photos.map((photo, index) => {
 const isTouchActive = activePhotoIndex === index;
 return (
 <div
 key={photo.id}
 onClick={() => setActivePhotoIndex(isTouchActive ? null : index)}
 className={`absolute w-32 sm:w-36 md:w-40 lg:w-44 aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border sm:border-2 border-[var(--color-white)]/90 bg-[rgb(40,62,36)]/15 cursor-pointer select-none transition-all duration-700 ease-[var(--ease-expo-out)] ${photo.baseTransform} ${photo.hoverTransform} ${
 isTouchActive ? "!scale-110 !z-50 !rotate-0 !translate-x-0 !translate-y-0" : ""
 }`}
 >
 <Image
 src={photo.src}
 alt={photo.alt}
 fill
 sizes="(max-width: 640px) 140px, 200px"
 className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
 />
 {/* Subtle bottom gradient and label on photo */}
 <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3 bg-gradient-to-t from-[rgb(40,62,36)]/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
 <span className="text-[10px] sm:text-xs font-[family-name:var(--font-ogg)] tracking-widest uppercase text-[var(--color-white)] drop-shadow">
 {photo.label}
 </span>
 </div>
 </div>
 );
 })}
 </div>

 {/* Editorial Caption below */}
 <p className="font-[family-name:var(--font-ogg)] text-[clamp(0.88rem,1.15vw,1.02rem)] text-[var(--color-green-70)] leading-relaxed text-left mt-4 sm:mt-6">
 Stories and moments from travelers who explored the island with us, from sunrise ridge treks to private candlelit dinners on ancient rock fortresses.
 </p>
 </div>
 );
}
