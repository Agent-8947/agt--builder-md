"use client";

import { motion } from "framer-motion";
import { Icon } from "./ui/Icon";
import { useStore } from "@/store/useStore";
import { TRANSLATIONS } from "@/constants/translations";

export const WelcomeScreen = () => {
    const { setStep, language } = useStore();
    const t = TRANSLATIONS[language];

    return (
        <div className="text-center py-10 md:py-20 px-4">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block p-6 bg-indigo-50 text-indigo-600 rounded-[2.5rem] mb-12 shadow-inner"
            >
                <Icon name="cpu" size={64} strokeWidth={1.5} />
            </motion.div>

            <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-6xl md:text-[90px] font-extrabold mb-8 tracking-tighter leading-none text-gray-900"
            >
                {t.welcome.title} <span className="text-indigo-600">Architect</span>
            </motion.h1>

            <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl text-gray-500 mb-14 max-w-3xl mx-auto leading-relaxed font-medium"
            >
                {t.welcome.subtitle}
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
                {t.welcome.start} <Icon name="chevron-right" size={28} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-xs font-black uppercase tracking-[0.3em] text-gray-300"
            >
                {t.welcome.mission}
            </motion.p>
        </div>
    );
};
