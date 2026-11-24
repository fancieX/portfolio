"use client";

import { useState, useEffect } from "react";

/**
 * Formats a Date object into 24-hour Lisbon local time string.
 * Uses Europe/Lisbon timezone (WET/WEST).
 *
 * @param date - Date instance to format
 * @returns Formatted string, e.g. "11:10 in Lisbon"
 */
export function formatLisbonTime(date: Date): string {
  try {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Lisbon",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return `${formatter.format(date)} in Lisbon`;
  } catch {
    // Graceful fallback if Intl timezone is not supported
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    return `${hours}:${minutes} in Lisbon`;
  }
}

/**
 * Custom hook providing a real-time synchronized Lisbon clock string.
 *
 * Prerender & Hydration-Safe:
 * Initializes with static fallback "12:00 in Lisbon" during prerendering/SSR,
 * and defers dynamic time reading to client-side useEffect.
 * Updates every second for minute precision.
 *
 * @returns Formatted Lisbon time string, e.g. "11:10 in Lisbon"
 */
export function useLisbonTime(): string {
  const [timeString, setTimeString] = useState<string>("12:00 in Lisbon");

  useEffect(() => {
    const update = () => {
      setTimeString(formatLisbonTime(new Date()));
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return timeString;
}
