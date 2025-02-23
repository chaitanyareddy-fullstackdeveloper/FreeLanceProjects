
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import { useEffect, useState } from "react";
import { supabase } from "./integrations/supabase/client";
import Navbar from "./components/layout/Navbar";

const queryClient = new QueryClient();

const AppContent = () => {
  const [session, setSession] = useState<any>(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <div className={isHomePage ? '' : 'fixed top-0 left-0 right-0 z-50'}>
        <Navbar />
      </div>
      <div className={isHomePage ? '' : 'pt-[72px]'}>
        <Routes>
          <Route
            path="/"
            element={session ? <Navigate to="/projects" /> : <Index />}
          />
          <Route
            path="/projects"
            element={session ? <Projects /> : <Navigate to="/" />}
          />
          <Route
            path="/projects/:id"
            element={session ? <ProjectDetails /> : <Navigate to="/" />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
