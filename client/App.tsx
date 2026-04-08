import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppReserve from "./pages/AppReserve";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import OtpPage from "./pages/OtpPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceholderPage from "./pages/PlaceholderPage";
import QrConfirmationPage from "./pages/QrConfirmationPage";
import ReservationSummaryPage from "./pages/ReservationSummaryPage";
import TimeSlotPage from "./pages/TimeSlotPage";
import VehiclePage from "./pages/VehiclePage";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/app" element={<AppReserve />} />
            <Route path="/app/select-time" element={<TimeSlotPage />} />
            <Route path="/app/vehicle" element={<VehiclePage />} />
            <Route
              path="/app/foreign-vehicle"
              element={
                <PlaceholderPage
                  ctaLabel="Back to vehicle check"
                  ctaTo="/app/vehicle"
                  description="The foreign vehicle branch comes next in the PDF. This placeholder keeps the flow complete while we generate the remaining reservation screens."
                  eyebrow="Reservation flow"
                  title="Foreign vehicle validation is next."
                />
              }
            />
            <Route path="/app/verify" element={<OtpPage />} />
            <Route path="/app/summary" element={<ReservationSummaryPage />} />
            <Route path="/app/payment" element={<PaymentPage />} />
            <Route path="/app/qr" element={<QrConfirmationPage />} />
            <Route
              path="/app/session"
              element={
                <PlaceholderPage
                  ctaLabel="Back to QR code"
                  ctaTo="/app/qr"
                  description="The live charging session comes after the QR code screen. This placeholder keeps the product flow intact until the charging screens are generated next."
                  eyebrow="Charging session"
                  title="Station handshake is next."
                />
              }
            />
            <Route
              path="/app/account"
              element={
                <PlaceholderPage
                  ctaLabel="Back to station map"
                  ctaTo="/app"
                  description="Account screens are not part of this first pass. The shared Volta shell stays in place so this route works now and can be expanded later without redesigning navigation."
                  eyebrow="Account"
                  title="Profile and sign-in are staged for the next pass."
                />
              }
            />
            <Route
              path="/support"
              element={
                <PlaceholderPage
                  description="This support route is live so the landing page has no dead links. I can turn it into the full issue handling and contact experience described in the product flow next."
                  eyebrow="Support"
                  title="Support content can be expanded next."
                />
              }
            />
            <Route
              path="/terms"
              element={
                <PlaceholderPage
                  description="Terms content has a branded placeholder for now. If you want, I can replace it with a proper legal layout and copy structure next."
                  eyebrow="Legal"
                  title="Terms page placeholder."
                />
              }
            />
            <Route
              path="/privacy"
              element={
                <PlaceholderPage
                  description="Privacy content has a branded placeholder for now. It uses the same shared header and footer so the experience remains consistent across the site."
                  eyebrow="Legal"
                  title="Privacy page placeholder."
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
