/**
 * Types and constants for the commit-centric features database.
 * The actual data is inlined at build time (window.__FEATURES_DATA__) or loaded from static/features-data.json.
 */

export interface FeatureEntry {
  description: string;
  category: string;
}

export interface CommitEntry {
  date: string;
  features: Record<string, FeatureEntry>;
}

export interface CategoryImage {
  src: string;
  alt: string;
  caption: string;
}

export interface Category {
  id: string;
  title: string;
  quickNavTitle?: string;
  inQuickNav: boolean;
  iconBgColor: string;
  iconColor: string;
  iconFill?: boolean;
  iconSvg: string;
  images: CategoryImage[];
}

export interface FeaturesData {
  commitBaseUrl: string;
  categories: Category[];
  commits: Record<string, CommitEntry>;
  categoryFeatureOrder?: Record<string, string[]>;
}

export const NAV_LINK_CLASS =
  "px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300 transition-colors";

declare global {
  interface Window {
    __FEATURES_DATA__?: FeaturesData;
  }
}
