import { Navigate, Route, Routes } from "react-router-dom";

import { ForgotPasswordPage } from "@/pages/auth/forgot-password/ForgotPasswordPage";
import { LoginPage } from "@/pages/auth/login/LoginPage";
import { RegisterPage } from "@/pages/auth/register/RegisterPage";
import { ResetPasswordPage } from "@/pages/auth/reset-password/ResetPasswordPage";
import { VerifyEmailPage } from "@/pages/auth/verify-email/VerifyEmailPage";
import { BusinessSetupPage } from "@/pages/business-setup/BusinessSetupPage";
import { DashboardPage } from "@/pages/dashboard/DashboardPage";
import { HomePage } from "@/pages/homepage/Homepage";
import { PublicPage } from "@/pages/public/PublicPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/platform" element={<PublicPage />} />
      <Route path="/features" element={<PublicPage />} />
      <Route path="/automation" element={<PublicPage />} />
      <Route path="/integrations" element={<PublicPage />} />
      <Route path="/pricing" element={<PublicPage />} />
      <Route path="/resources" element={<PublicPage />} />
      <Route path="/about" element={<PublicPage />} />
      <Route path="/contact" element={<PublicPage />} />
      <Route path="/terms" element={<PublicPage />} />
      <Route path="/privacy" element={<PublicPage />} />
      <Route path="/cookies" element={<PublicPage />} />
      <Route path="/acceptable-use" element={<PublicPage />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/business-setup" element={<BusinessSetupPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
