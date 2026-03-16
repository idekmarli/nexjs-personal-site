/**
 * Life OS Design Tokens
 * Premium, calm, editorial — iPhone-native aesthetic
 */

export const colors = {
  // Primary palette — warm, muted, editorial
  primary: '#2C2C2E',
  primaryLight: '#3A3A3C',
  primaryMuted: '#636366',

  // Accent — subtle warmth
  accent: '#B8977E',
  accentLight: '#D4C4B0',
  accentSoft: '#EDE6DD',

  // Backgrounds — warm off-whites
  background: '#FAFAF8',
  backgroundElevated: '#FFFFFF',
  backgroundSubtle: '#F5F4F0',
  backgroundMuted: '#EEEDE8',

  // Text hierarchy
  textPrimary: '#1C1C1E',
  textSecondary: '#48484A',
  textTertiary: '#8E8E93',
  textMuted: '#AEAEB2',
  textInverse: '#FFFFFF',

  // Semantic
  success: '#6B9B76',
  successLight: '#E8F0EA',
  warning: '#C4935A',
  warningLight: '#F5EDE0',
  error: '#C45A5A',
  errorLight: '#F5E0E0',
  info: '#5A8EC4',
  infoLight: '#E0ECF5',

  // Borders & dividers
  border: '#E5E5E0',
  borderLight: '#F0EFEA',
  divider: '#EEEDE8',

  // Overlays
  overlay: 'rgba(0, 0, 0, 0.4)',
  overlayLight: 'rgba(0, 0, 0, 0.08)',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
} as const;

export const typography = {
  // Font families (system fonts for premium feel)
  fontFamily: {
    regular: 'System',
    medium: 'System',
    semibold: 'System',
    bold: 'System',
  },

  // Font sizes
  size: {
    xs: 11,
    sm: 13,
    base: 15,
    md: 17,
    lg: 20,
    xl: 24,
    '2xl': 28,
    '3xl': 34,
  },

  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },

  // Font weights
  weight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },

  // Tracking (letter spacing)
  tracking: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1,
  },
} as const;

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  full: 9999,
} as const;

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 5,
  },
} as const;

export const theme = {
  colors,
  spacing,
  typography,
  radii,
  shadows,
} as const;

export type Theme = typeof theme;
