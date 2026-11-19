"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#a84c32" },
    text: { primary: "#26343f", secondary: "#626c76" },
    background: { paper: "#ffffff", default: "#faf9f6" },
  },
  typography: { fontFamily: "var(--font-nunito), sans-serif", fontSize: 14 },
  shape: { borderRadius: 10 },
  components: {
    MuiTextField: {
      defaultProps: { variant: "outlined", size: "small", fullWidth: true },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { backgroundColor: "#fff", minHeight: 49 },
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
