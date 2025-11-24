import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { ThemeProvider } from "./components/ui/themeProvider";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <Toaster richColors position="top-right" />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
