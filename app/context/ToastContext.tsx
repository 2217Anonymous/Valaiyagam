"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    toast: (message: string, type?: ToastType) => void;
    success: (message: string) => void;
    error: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((message: string, type: ToastType = "info") => {
        const id = Math.random().toString(36).substring(7);
        setToasts((prev) => [...prev, { id, message, type }]);

        // Auto dismiss
        setTimeout(() => {
            removeToast(id);
        }, 4000);
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const value = {
        toast: addToast,
        success: (msg: string) => addToast(msg, "success"),
        error: (msg: string) => addToast(msg, "error"),
    };

    return (
        <ToastContext.Provider value={value}>
            {children}
            <div className="fixed bottom-4 right-4 z-99999 flex flex-col gap-2 pointer-events-none p-4">
                <AnimatePresence mode="popLayout">
                    {toasts.map((t) => (
                        <motion.div
                            key={t.id}
                            layout
                            initial={{ opacity: 0, x: 20, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                            className={`
                pointer-events-auto w-full min-w-[320px] max-w-sm rounded-xl p-4 shadow-lg border backdrop-blur-md flex items-start gap-3
                ${t.type === 'success' ? 'bg-primary/10 border-primary/20 text-foreground' : ''}
                ${t.type === 'error' ? 'bg-red-50/90 border-red-200 text-red-900' : ''}
                ${t.type === 'info' ? 'bg-white/90 border-slate-200 text-slate-900' : ''}
              `}
                        >
                            <div className={`mt-0.5 shrink-0 ${t.type === 'success' ? 'text-primary' :
                                t.type === 'error' ? 'text-red-500' : 'text-slate-500'
                                }`}>
                                {t.type === 'success' && <CheckCircle className="w-5 h-5" />}
                                {t.type === 'error' && <AlertCircle className="w-5 h-5" />}
                                {t.type === 'info' && <Info className="w-5 h-5" />}
                            </div>

                            <div className="flex-1 text-sm font-medium leading-relaxed pt-0.5">
                                {t.message}
                            </div>

                            <button
                                onClick={() => removeToast(t.id)}
                                className={`shrink-0 hover:bg-black/5 rounded-full p-1 transition-colors ${t.type === 'success' ? 'text-primary' :
                                    t.type === 'error' ? 'text-red-500' : 'text-slate-400'
                                    }`}
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};
