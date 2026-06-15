import React from 'react';

/**
 * The "cantina" art direction is a single, fixed palette
 * (warm near-black + champagne cream) — no light/dark toggle.
 * Kept as a thin passthrough so the app tree stays stable.
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;
