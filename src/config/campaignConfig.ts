/**
 * Lavanta Naturals 1st Birthday Campaign Configuration
 * Running strictly from 22 August 2026 00:00:00 IST to 25 August 2026 23:59:59 IST (26 Aug 00:00:00 IST)
 * 
 * Central Source of Truth for frontend campaign dates, copy, pricing, preview, and fail-safe behavior.
 */

export const CAMPAIGN_CONFIG = {
  CAMPAIGN_NAME: 'Lavanta Birthday Bash Sale',
  CAMPAIGN_ENABLED: true, // Emergency Master Toggle: Set to false to instantly deactivate campaign
  CAMPAIGN_START: '2026-08-22T00:00:00+05:30',
  CAMPAIGN_END: '2026-08-26T00:00:00+05:30', // Ends when 26 August begins (25 Aug 23:59:59.999 IST)
  TIMEZONE: 'Asia/Kolkata',
  
  // Pricing & Offers
  ORIGINAL_PRICE: 399,
  CAMPAIGN_PRICE: 199,
  DISCOUNT_PERCENT: 50,
  DISCOUNT_AMOUNT: 200,

  // Copy Hierarchy
  EYEBROW: 'LAVANTA BIRTHDAY BASH SALE',
  HEADLINE: 'ONE YEAR. ONE BEAUTIFUL CELEBRATION.',
  SUBHEADLINE: "We're celebrating one beautiful year of Lavanta Naturals with a special birthday offer on our Glow Face Serum.",
  SUPPORTING_LINE: 'A little celebration from us to your skin.',
  CAMPAIGN_LABEL: '🎂 BIRTHDAY SPECIAL • 22–25 AUGUST',
  BADGE: 'BIRTHDAY BASH SPECIAL',
  CTA: 'SHOP BIRTHDAY OFFER',

  // Announcement Bar
  ANNOUNCEMENT_DESKTOP: '🎂 LAVANTA BIRTHDAY BASH SALE — 50% OFF | ₹399 → ₹199 | 22–25 AUGUST',
  ANNOUNCEMENT_MOBILE: '🎂 BIRTHDAY BASH SALE | 50% OFF | ₹199',

  // Birthday Story Section
  STORY_HEADLINE: "WE'RE TURNING ONE! 🎂",
  STORY_P1: 'One year ago, Lavanta Naturals began with a simple belief — skincare should be honest, effective, and made with care.',
  STORY_P2: "Today, we're celebrating one beautiful year with you.",
  STORY_CTA: 'SHOP THE BIRTHDAY OFFER'
} as const;

const SESSION_SIMULATE_KEY = 'lavanta_campaign_simulate_date';
const SESSION_PREVIEW_KEY = 'lavanta_campaign_birthday_preview';

/**
 * Parses URL query parameters for safe preview and simulated testing,
 * and persists them in sessionStorage so navigation across routes remains consistent.
 */
export function getUrlTestingParams(): { birthdayPreview: boolean; simulateDate: string | null } {
  try {
    if (typeof window === 'undefined') {
      return { birthdayPreview: false, simulateDate: null };
    }

    const params = new URLSearchParams(window.location.search);
    const urlPreview = params.get('birthdayPreview');
    const urlSimulate = params.get('simulateDate');

    // 1. Update session storage if explicit parameters are present in URL
    if (urlPreview !== null) {
      if (urlPreview === 'true') {
        sessionStorage.setItem(SESSION_PREVIEW_KEY, 'true');
      } else {
        sessionStorage.removeItem(SESSION_PREVIEW_KEY);
      }
    }

    if (urlSimulate !== null) {
      if (urlSimulate === 'clear' || urlSimulate === 'false' || urlSimulate === '') {
        sessionStorage.removeItem(SESSION_SIMULATE_KEY);
      } else {
        sessionStorage.setItem(SESSION_SIMULATE_KEY, urlSimulate);
      }
    }

    // 2. Read active values (URL overrides session, session persists across navigation)
    const storedPreview = sessionStorage.getItem(SESSION_PREVIEW_KEY) === 'true';
    const storedSimulate = sessionStorage.getItem(SESSION_SIMULATE_KEY);

    const birthdayPreview = urlPreview !== null ? (urlPreview === 'true') : storedPreview;
    const simulateDate = urlSimulate !== null ? (urlSimulate === 'clear' ? null : urlSimulate) : storedSimulate;

    return { birthdayPreview, simulateDate };
  } catch {
    return { birthdayPreview: false, simulateDate: null };
  }
}

/**
 * Returns current timestamp, taking into account simulateDate if present (UI simulation only).
 */
export function getReferenceTime(overrideDate?: string | Date | null): number {
  try {
    if (overrideDate) {
      return new Date(overrideDate).getTime();
    }
    const { simulateDate } = getUrlTestingParams();
    if (simulateDate) {
      const parsed = new Date(simulateDate).getTime();
      if (!isNaN(parsed)) return parsed;
    }
    return Date.now();
  } catch {
    return Date.now();
  }
}

/**
 * Checks if the Birthday Campaign should be active on the UI.
 * Fail-safe: Always returns false on any error.
 */
export function isCampaignActive(overrideDate?: string | Date | null): boolean {
  try {
    if (!CAMPAIGN_CONFIG.CAMPAIGN_ENABLED) {
      return false;
    }

    const { birthdayPreview } = getUrlTestingParams();
    if (birthdayPreview) {
      return true;
    }

    const now = getReferenceTime(overrideDate);
    const start = new Date(CAMPAIGN_CONFIG.CAMPAIGN_START).getTime();
    const end = new Date(CAMPAIGN_CONFIG.CAMPAIGN_END).getTime();

    if (isNaN(now) || isNaN(start) || isNaN(end)) {
      return false; // Safe fallback
    }

    return now >= start && now < end;
  } catch (err) {
    console.error('Campaign active check error (fail-safe fallback applied):', err);
    return false;
  }
}

/**
 * Computes remaining time until campaign ends.
 */
export function getCampaignTimeRemaining(overrideDate?: string | Date | null): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  totalMs: number;
} {
  const safeFallback = { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true, totalMs: 0 };
  try {
    const now = getReferenceTime(overrideDate);
    const end = new Date(CAMPAIGN_CONFIG.CAMPAIGN_END).getTime();

    if (isNaN(now) || isNaN(end)) return safeFallback;

    const diff = end - now;
    if (diff <= 0) return safeFallback;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
      isExpired: false,
      totalMs: diff
    };
  } catch {
    return safeFallback;
  }
}

/**
 * Returns dynamic price for the serum.
 * Fail-safe: Defaults to ₹399.
 */
export function getEffectivePrice(basePrice?: number, overrideDate?: string | Date | null): number {
  try {
    if (isCampaignActive(overrideDate)) {
      return CAMPAIGN_CONFIG.CAMPAIGN_PRICE;
    }
    return basePrice ?? CAMPAIGN_CONFIG.ORIGINAL_PRICE;
  } catch {
    return CAMPAIGN_CONFIG.ORIGINAL_PRICE;
  }
}
