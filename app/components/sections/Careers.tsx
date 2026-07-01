"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";
import { ArrowRight, MapPin, Clock, Briefcase, CheckCircle2, X, Upload, Loader2, Send, FileText, Code, Smartphone, Server, Brain, ChevronRight, Cloud, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import jobsData from "../../data/jobs.json";
import { useToast } from "../../context/ToastContext";

// Map icon strings to components
const iconMap: { [key: string]: any } = {
  Code,
  Smartphone,
  Server,
  Brain,
  Cloud,
  CheckCircle,
};

type Job = typeof jobsData[0];

const JobApplicationForm = ({ job, onSuccess }: { job: Job, onSuccess: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast, success, error } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [resume, setResume] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
        console.log("Submitting Application for HR (venkatanonymous248@gmail.com):", {
          jobId: job.id,
          jobTitle: job.title,
          ...formData,
          resumeName: resume?.name
        });

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simulate random failure (10% chance) for testing error toast
        const isError = Math.random() < 0.1;
        if (isError) {
          throw new Error("Network timeout: Could not connect to recruitment server.");
        }

        success("Application sent successfully! HR will review it shortly.");
        onSuccess();
    } catch (err: any) {
        console.error("Submission failed:", err);
        error(err.message || "Failed to submit application. Please check your connection.");
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "application/pdf") {
        setResume(file);
      } else {
        error("Please upload a PDF file only.");
        e.target.value = ""; // Reset input
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
      <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-2">Application Form</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor={`firstName-${job.id}`} className="text-sm font-bold text-slate-700 ml-1">First Name</label>
          <input
            required
            type="text"
            id={`firstName-${job.id}`}
            placeholder="Jane"
            className="w-full px-4 py-3.5 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-slate-900 placeholder:text-slate-400 font-medium"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor={`lastName-${job.id}`} className="text-sm font-bold text-slate-700 ml-1">Last Name</label>
          <input
            required
            type="text"
            id={`lastName-${job.id}`}
            placeholder="Doe"
            className="w-full px-4 py-3.5 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-slate-900 placeholder:text-slate-400 font-medium"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor={`email-${job.id}`} className="text-sm font-bold text-slate-700 ml-1">Email</label>
          <input
            required
            type="email"
            id={`email-${job.id}`}
            placeholder="jane@company.com"
            className="w-full px-4 py-3.5 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-slate-900 placeholder:text-slate-400 font-medium"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor={`phone-${job.id}`} className="text-sm font-bold text-slate-700 ml-1">Phone</label>
          <input
            required
            type="tel"
            id={`phone-${job.id}`}
            placeholder="+1 (555) 000-0000"
            className="w-full px-4 py-3.5 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-slate-900 placeholder:text-slate-400 font-medium"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700 ml-1">Resume / CV (PDF Only)</label>
        <div className="relative group">
          <input
            required
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className={`w-full px-6 py-8 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center text-center gap-3 ${resume ? 'border-primary bg-primary/5' : 'border-slate-200 bg-white group-hover:bg-slate-50 group-hover:border-primary/50'}`}>
            {resume ? (
              <>
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-sm font-bold text-primary block">{resume.name}</span>
                </div>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-slate-50 shadow-sm ring-1 ring-slate-200 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                  <Upload className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-700 block group-hover:text-primary transition-colors">Upload Resume</span>
                  <span className="text-xs font-medium text-slate-400">PDF files only</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          className="w-full h-14 rounded-xl text-lg font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all active:scale-[0.98] bg-primary hover:bg-primary/90 text-white cursor-pointer"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Sending Application...
            </>
          ) : (
            <>
              Submit Application <Send className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
};


export function Careers() {
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const [successJobId, setSuccessJobId] = useState<string | null>(null);

  const toggleJob = (id: string) => {
    if (expandedJobId === id) {
      setExpandedJobId(null);
    } else {
      setExpandedJobId(id);
      setSuccessJobId(null); // Reset success state on new open
    }
  };

  const handleApplicationSuccess = (id: string) => {
      setSuccessJobId(id);
      setTimeout(() => {
          setExpandedJobId(null);
          setSuccessJobId(null);
      }, 4000);
  };

  const visibleJobs = jobsData.slice(0, visibleCount);
  const hasMore = visibleCount < jobsData.length;

  return (
    <section
      id="careers"
      className="py-24 relative overflow-hidden bg-slate-50/50"
    >
      <div className="max-w-[80%] mx-auto px-6 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-4xl mx-auto space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold uppercase tracking-widest leading-none">
            <Briefcase className="w-3 h-3" /> We're Hiring
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1]">
            Join Our <br /> <span className="text-primary italic">Mission</span>
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed font-medium">
            We're building the operating system for the next generation of business. Find your role below.
          </p>
        </motion.div>

        {/* Job Listings */}
        <div className="flex flex-col gap-6 max-w-5xl mx-auto">
          {visibleJobs.map((job, idx) => {
             const IconComponent = iconMap[job.iconIdentifier] || Code;
             const isExpanded = expandedJobId === job.id;
             const isSuccess = successJobId === job.id;

             return (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className={`group relative p-6 md:p-8 rounded-3xl bg-white shadow-xl shadow-slate-200/40 transition-all duration-300 border border-slate-100 overflow-hidden ${isExpanded ? 'ring-2 ring-primary/20' : 'hover:shadow-2xl hover:shadow-primary/10 hover:-translate-x-1'}`}
              >
                 {/* Header Row (Clickable) */}
                 <div 
                    className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 cursor-pointer relative z-10"
                    onClick={() => toggleJob(job.id)}
                 >
                    {/* Icon Box */}
                    <div className={`shrink-0 w-16 h-16 rounded-2xl bg-linear-to-br ${job.color} flex items-center justify-center text-white shadow-lg transition-transform duration-300 ${!isExpanded && 'group-hover:scale-110'}`}>
                      <IconComponent className="w-8 h-8" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-2">
                        <div className="flex flex-wrap items-center gap-3">
                           <h3 className="text-2xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                              {job.title}
                           </h3>
                           <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                              {job.type}
                           </span>
                        </div>
                        <div className="flex items-center gap-4 pt-1">
                             <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                <Briefcase className="w-3.5 h-3.5" /> {job.department}
                             </span>
                             <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                             <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                <MapPin className="w-3.5 h-3.5" /> {job.location}
                             </span>
                        </div>
                    </div>

                    {/* Action Arrow */}
                    <div className="hidden md:flex flex-col items-center justify-center pl-6 border-l border-slate-100 self-stretch">
                       <div className={`w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center transition-all ${isExpanded ? 'bg-primary border-primary text-white rotate-180' : 'text-slate-300 group-hover:bg-primary group-hover:border-primary group-hover:text-white'}`}>
                          <ChevronDown className="w-6 h-6 transition-transform" />
                       </div>
                    </div>
                 </div>

                 {/* Expanded Details Section */}
                 <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: "auto", opacity: 1, marginTop: 24 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <div className="pt-6 border-t border-slate-100">
                                {isSuccess ? (
                                    <div className="bg-primary/10 border border-primary/20 rounded-2xl p-8 text-center">
                                         <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                                            <CheckCircle className="w-8 h-8" />
                                         </div>
                                         <h4 className="text-xl font-bold text-slate-900 mb-2">Application Received!</h4>
                                         <p className="text-slate-600">Thanks for applying. We'll be in touch soon.</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="mb-8">
                                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-3">About the Role</h4>
                                            <p className="text-slate-600 leading-relaxed mb-6">
                                                {job.description}
                                            </p>
                                            
                                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-3">Requirements</h4>
                                            <ul className="space-y-2 mb-6">
                                                {job.requirements.map((req: string, i: number) => (
                                                <li key={i} className="flex items-start gap-3 text-slate-600 text-sm leading-relaxed">
                                                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                                    <span>{req}</span>
                                                </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <JobApplicationForm job={job} onSuccess={() => handleApplicationSuccess(job.id)} />
                                    </>
                                )}
                            </div>
                        </motion.div>
                    )}
                 </AnimatePresence>
              </motion.div>
             );
          })}
        </div>
        
        {/* Load More Button */}
        {hasMore && (
           <div className="mt-12 text-center">
              <Button 
                variant="outline" 
                onClick={() => setVisibleCount(prev => prev + 3)}
                className="w-full md:w-auto px-8 h-12 rounded-full border-primary/20 hover:bg-white hover:text-primary hover:border-primary transition-all shadow-lg shadow-slate-200/50"
              >
                  View More Positions <ChevronDown className="ml-2 w-4 h-4" />
              </Button>
           </div>
        )}

      </div>
    </section>
  );
}
