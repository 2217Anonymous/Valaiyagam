"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/lib/client-actions/auth";
import { Button } from "@/app/components/ui/Button";
import { Logo } from "@/app/components/ui/Logo";
import { Lock, User } from "lucide-react";
import { motion } from "framer-motion";
import { BRAND_TAGLINE } from "@/app/lib/themes";

export default function LoginPage() {
  const [state, action, isPending] = useActionState(loginAction, null);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white p-4">
      <div
        className="pointer-events-none absolute inset-0 hero-diagonal-primary"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 hero-diagonal-secondary"
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md rounded-2xl border border-slate-100 bg-white p-8 shadow-sm"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gradient">Admin Portal</h1>
          <div className="mt-4 mb-2 flex justify-center">
            <Logo variant="full" className="max-h-16" />
          </div>
          <p className="mt-2 text-slate-600">Sign in to manage Valaiyagam Solution</p>
          <p className="mt-1 text-xs uppercase tracking-widest text-slate-400">
            {BRAND_TAGLINE}
          </p>
        </div>

        <form action={action} className="space-y-6">
          <div className="space-y-2">
            <label className="admin-label">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                name="username"
                required
                className="admin-input-icon"
                placeholder="Enter username"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="admin-label">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                name="password"
                type="password"
                required
                className="admin-input-icon"
                placeholder="Enter password"
              />
            </div>
          </div>

          {state?.error && (
            <div className="rounded-lg border border-red-200 bg-red-50 py-2 text-center text-sm text-red-600">
              {state.error}
            </div>
          )}

          <Button
            type="submit"
            className="btn-primary-cta w-full rounded-full border-0 py-3 font-bold"
            disabled={isPending}
          >
            {isPending ? "Signing in..." : "Sign In"}
          </Button>

          <div className="mt-4 text-center text-xs text-slate-400">
            Default: admin / admin123
          </div>
        </form>
      </motion.div>
    </div>
  );
}
