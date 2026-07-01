"use client";

import { submitApplication } from "@/app/lib/client-actions/careers";
import { Button } from "@/app/components/ui/Button";
import { useActionState, useState } from "react";
import { Upload, Check, CloudUpload, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ApplyForm({
  jobId,
  jobCode,
}: {
  jobId: string;
  jobCode: string;
}) {
  const [state, action, isPending] = useActionState(submitApplication, null);
  const [fileName, setFileName] = useState("");

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  if (state?.success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/30">
          <Check className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">
          Application Submitted!
        </h3>
        <p className="text-slate-400">
          Thank you for your interest. We will be in touch soon.
        </p>
      </motion.div>
    );
  }

  return (
    <form action={action} className="space-y-6">
      <input type="hidden" name="jobId" value={jobId} />
      <input type="hidden" name="jobCode" value={jobCode} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">
            Full Name
          </label>
          <input
            name="name"
            required
            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none"
            placeholder="Jane Doe"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">
            Email Address
          </label>
          <input
            name="email"
            type="email"
            required
            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none"
            placeholder="jane@example.com"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Phone</label>
          <input
            name="phone"
            required
            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none"
            placeholder="+1 (555) 000-0000"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">
            Resume / CV
          </label>
          <div className="relative border-2 border-dashed border-slate-700 rounded-xl px-4 py-3 hover:bg-white/5 transition-colors group cursor-pointer h-[50px] flex items-center">
            <input
              type="file"
              name="resume"
              required
              accept=".pdf,.doc,.docx"
              onChange={handleFile}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="flex items-center gap-3 text-slate-400 group-hover:text-white transition-colors w-full">
              <CloudUpload className="w-5 h-5 flex-shrink-0" />
              <span className="truncate text-sm">
                {fileName || "Click to upload resume (PDF)"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {state?.error && (
        <div className="text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20 text-center">
          {state.error}
        </div>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="w-full md:w-auto btn-primary-cta border-0 px-8 py-3 h-auto text-lg rounded-xl"
      >
        {isPending ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Submitting...
          </>
        ) : (
          "Submit Application"
        )}
      </Button>
    </form>
  );
}
