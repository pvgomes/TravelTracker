import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import AddCountryPage from "@/pages/add-country-page";
import CountriesListPage from "@/pages/countries-list-page";
import StatisticsPage from "@/pages/statistics-page";
import WhyNoStatePage from "@/pages/why-no-state-page";
import { ProtectedRoute } from "./lib/protected-route";
import { AuthProvider } from "./hooks/use-auth";
import { ThemeProvider } from "next-themes";

function Router() {
  return (
    <Switch>
      <Route path="/auth" component={AuthPage} />
      <Route path="/why-no-state" component={WhyNoStatePage} />
      <ProtectedRoute path="/" component={HomePage} />
      <ProtectedRoute path="/add" component={AddCountryPage} />
      <ProtectedRoute path="/countries" component={CountriesListPage} />
      <ProtectedRoute path="/statistics" component={StatisticsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
