import { LoginForm } from "@/components/admin/login-form";
import { requireConfigured } from "@/lib/admin/supabase";

export default function LoginPage() {
  requireConfigured();
  return (
    <div className="mx-auto max-w-md rounded-xl bg-white p-6 shadow-card sm:p-8">
      <h1 className="text-2xl text-navy">Admin sign in</h1>
      <LoginForm />
    </div>
  );
}
