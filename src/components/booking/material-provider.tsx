"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#145de0" },
    text: { primary: "#24334a", secondary: "#536680" },
    background: { paper: "#ffffff", default: "#f6f9ff" },
  },
  typography: {
    fontFamily: "var(--font-section-label), sans-serif",
    fontSize: 14,
  },
  shape: { borderRadius: 10 },
  components: {
    MuiTextField: {
      defaultProps: { variant: "outlined", size: "small", fullWidth: true },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
          minHeight: 49,
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderWidth: 1 },
          "& input:focus-visible, & textarea:focus-visible": {
            outline: "none",
            boxShadow: "none",
          },
        },
        input: { fontSize: 15 },
      },
    },
    MuiFormHelperText: { styleOverrides: { root: { marginLeft: 0 } } },
    MuiInputLabel: { styleOverrides: { root: { fontSize: 14 } } },
  },
});
export function MaterialProvider({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppRouterCacheProvider>
  );
}
