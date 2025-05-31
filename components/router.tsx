'use client';

import { Switch, Route } from "wouter";
import HomePage from "./pages/home-page";
import NotFound from "./pages/not-found";
import AuthPage from "./pages/auth-page";
import AddCountryPage from "./pages/add-country-page";
import CountriesListPage from "./pages/countries-list-page";
import SharedMapPage from "./pages/shared-map-page";
import StatisticsPage from "./pages/statistics-page";
import WhyNoStatePage from "./pages/why-no-state-page";
import { ProtectedRoute } from "./lib/protected-route";

export default function Router() {
  return (
    <Switch>
      <ProtectedRoute path="/" component={HomePage} />
      <ProtectedRoute path="/add" component={AddCountryPage} />
      <ProtectedRoute path="/countries" component={CountriesListPage} />
      <ProtectedRoute path="/statistics" component={StatisticsPage} />
      <ProtectedRoute path="/why-no-state" component={WhyNoStatePage} />
      <Route path="/shared/:shareId" component={SharedMapPage} />
      <Route path="/auth" component={AuthPage} />
      <Route component={NotFound} />
    </Switch>
  );
}