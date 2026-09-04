"use client";

import React from "react";

export const EMAIL_ADDRESS = "oshitourslanka@gmail.com";
export const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL_ADDRESS}`;

export function handleEmailClick(e?: React.MouseEvent) {
  // 1. Copy to clipboard as extra convenience/safety
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    navigator.clipboard.writeText(EMAIL_ADDRESS).catch(() => {});
  }

  try {
    // 2. Attempt to open webmail in a new window/tab
    const win = window.open(GMAIL_COMPOSE_URL, "_blank");

    // 3. Fall back to native mail client if popup was blocked
    if (!win) {
      window.location.href = `mailto:${EMAIL_ADDRESS}`;
    }
  } catch (err) {
    // 4. Fall back to native mail client on error
    window.location.href = `mailto:${EMAIL_ADDRESS}`;
  }
}
