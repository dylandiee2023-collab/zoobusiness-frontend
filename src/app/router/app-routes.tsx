import { Navigate, Route, Routes } from "react-router-dom";

import { ForgotPasswordPage } from "@/pages/auth/forgot-password/ForgotPasswordPage";
import { LoginPage } from "@/pages/auth/login/LoginPage";
import { RegisterPage } from "@/pages/auth/register/RegisterPage";
import { ResetPasswordPage } from "@/pages/auth/reset-password/ResetPasswordPage";
import { VerifyEmailPage } from "@/pages/auth/verify-email/VerifyEmailPage";
import { HomePage } from "@/pages/homepage/Homepage";
import { BusinessSetupPage } from "@/pages/business-setup/BusinessSetupPage";
import { DashboardPage } from "@/pages/dashboard/DashboardPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

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
