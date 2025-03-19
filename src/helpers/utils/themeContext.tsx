import React, { createContext } from 'react';

// Define the type for the theme context
interface ThemeContextType {
  setDarkTheme: () => void;
  setLightTheme: () => void;
}

// Create the context with an initial value of undefined (as it's not defined initially)
const themeContext = createContext<ThemeContextType | undefined>(undefined);

export default themeContext;
