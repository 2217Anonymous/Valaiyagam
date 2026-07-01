"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/lib/client-actions/auth";
import { Button } from "@/app/components/ui/Button";
import { Logo } from "@/app/components/ui/Logo";
import { Lock, User } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [state, action, isPending] = useActionState(loginAction, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 glass-card rounded-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gradient">
            Admin Portal
          </h1>
          <div className="flex justify-center mt-4 mb-2">
            <Logo variant="full" className="max-h-16" />
          </div>
          <p className="text-slate-400 mt-2">
            Sign in to manage Valaiyagam Solution
          </p>
        </div>

        <form action={action} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                name="username"
                required
                className="w-full bg-slate-900/50 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-600"
                placeholder="Enter username"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                name="password"
                type="password"
                required
                className="w-full bg-slate-900/50 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-600"
                placeholder="Enter password"
              />
            </div>
          </div>

          {state?.error && (
            <div className="text-red-400 text-sm text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20">
              {state.error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full relative overflow-hidden group"
            disabled={isPending}
          >
            <span className="relative z-10">
              {isPending ? "Authenticating..." : "Sign In"}
            </span>
            <div className="absolute inset-0 nav-contact-btn opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>

          <div className="text-center text-xs text-slate-500 mt-4">
            Default: admin / admin123
          </div>
        </form>
      </motion.div>
    </div>
  );
}
