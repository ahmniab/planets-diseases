// Nature-inspired color palette for plant diseases website
export const colors = {
  // Primary greens (healthy plants)
  forestGreen: '#228B22',
  emeraldGreen: '#50C878',
  sageGreen: '#9CAF88',
  mintGreen: '#98FB98',
  
  // Secondary earth tones
  earthBrown: '#8B4513',
  sandyBrown: '#F4A460',
  clayOrange: '#CC7722',
  terracotta: '#E2725B',
  
  // Accent colors for alerts/diseases
  diseaseRed: '#DC143C',
  warningAmber: '#FFC107',
  healingBlue: '#4169E1',
  
  // Neutral colors
  leafGray: '#708090',
  soilGray: '#696969',
  stoneGray: '#A9A9A9',
  mist: '#F5F5F5',
  charcoal: '#36454F',
  
  // Light mode specific
  light: {
    background: '#FAFAFA',
    surface: '#FFFFFF',
    surfaceVariant: '#F5F5F5',
    onBackground: '#1A1C18',
    onSurface: '#1A1C18',
    outline: '#73796E',
  },
  
  // Dark mode specific
  dark: {
    background: '#0F1B0F',
    surface: '#1A1C18',
    surfaceVariant: '#414941',
    onBackground: '#E1E3DD',
    onSurface: '#E1E3DD',
    outline: '#8D9387',
  }
};

// Color variations for different states
export const getColorVariations = (baseColor: string) => ({
  light: `${baseColor}20`, // 20% opacity
  main: baseColor,
  dark: `${baseColor}CC`, // 80% opacity
});