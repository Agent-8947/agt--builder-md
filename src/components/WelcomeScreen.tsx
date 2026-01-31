"use client";

import { motion } from "framer-motion";
import { Icon } from "./ui/Icon";
import { useStore } from "@/store/useStore";

export const WelcomeScreen = () => {
    const setStep = useStore((state) => state.setStep);

    return (
        <div className="text-center py-10 md:py-20 px-4">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block p-6 bg-indigo-50 text-primary rounded-[2.5rem] mb-12 shadow-inner"
            >
                <Icon name="cpu" size={64} strokeWidth={1.5} />
            </motion.div>

            <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-6xl md:text-[90px] font-extrabold mb-8 tracking-tighter leading-none"
            >
                AI Agents <span className="text-primary">Architect</span>
            </motion.h1>

            <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl text-gray-500 mb-14 max-w-3xl mx-auto leading-relaxed font-medium"
            >
                The ultimate orchestration generator. Design your AI team's permissions, stack, and hierarchy in minutes.
            </motion.p>

            <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep(0)}
                className="group px-16 py-7 bg-indigo-600 text-white rounded-[2rem] font-bold text-2xl hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-200 flex items-center gap-4 mx-auto"
            >
                Initialize Team <Icon name="chevron-right" size={28} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto text-left"
            >
                <FeatureCard icon="shield-check" title="GRC Compliant" desc="Strict controls over file creation, deletion, and Git actions." />
                <FeatureCard icon="layers" title="Cross-Stack" desc="Optimized prompts for React, Python, Go, and more." />
                <FeatureCard icon="zap" title="Turbo Output" desc="Export ready-to-use JSON and Markdown docs instantly." />
            </motion.div>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }: { icon: string; title: string; desc: string }) => (
    <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
        <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500 mb-5">
            <Icon name={icon} size={28} />
        </div>
        <h3 className="font-bold text-xl mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-500 leading-relaxed">{desc}</p>
    </div>
);
