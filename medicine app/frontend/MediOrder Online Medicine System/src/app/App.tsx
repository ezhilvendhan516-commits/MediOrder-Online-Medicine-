// ============================================================
// MediOrder - Main App Entry Point
// Wraps the app with AppProvider context and RouterProvider
// ============================================================

import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AppProvider } from "./context/AppContext";

export default function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}
