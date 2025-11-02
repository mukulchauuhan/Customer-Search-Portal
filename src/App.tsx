/**
 * Main Application Component
 *
 * Sets up the core application infrastructure including:
 * - React Query for data fetching and caching
 * - React Router for navigation
 * - Toast notifications for user feedback
 */

import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";

// Initialize React Query client for managing API data
const queryClient = new QueryClient();

/**
 * Root application component that provides necessary context providers
 * and sets up the routing structure
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    {/* Global toast notification container */}
    <Toaster />
    {/* Router setup with main application routes */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
