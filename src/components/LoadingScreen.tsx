"use client";

import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import { Icon } from "./ui/Icon";

export const LoadingScreen = () => {
    const loadingProgress = useStore((state) => state.loadingProgress);

    return (
        <div className="glass rounded-[3rem] p-16 md:p-24 text-center shadow-2xl max-w-lg mx-auto border-t-8 border-indigo-500 overflow-hidden">
            <div className="relative w-32 h-32 mx-auto mb-12">
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="64" cy="64" r="58"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-gray-100"
                    />
                    <motion.circle
                        cx="64" cy="64" r="58"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-indigo-600"
                        strokeDasharray={364.4}
                        initial={{ strokeDashoffset: 364.4 }}
                        animate={{ strokeDashoffset: 364.4 - (364.4 * loadingProgress) / 100 }}
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-black text-3xl text-indigo-600">
                    {loadingProgress}%
                </div>
            </div>

            <motion.h2
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-3xl font-black mb-4 text-gray-900"
            >
                Architecting Team...
            </motion.h2>
            <p className="text-gray-500 font-medium mb-12 text-lg">Wiring system prompts and security layers.</p>

            <div className="space-y-4 text-left max-w-xs mx-auto">
                <StatusItem done={loadingProgress > 30} text="Mapping Structure" />
                <StatusItem done={loadingProgress > 60} text="Infecting System Prompts" />
                <StatusItem done={loadingProgress > 85} text="Configuring JSON Schema" />
                <StatusItem done={loadingProgress === 100} text="Finalizing Assets" />
            </div>
        </div>
    );
};

const StatusItem = ({ done, text }: { done: boolean; text: string }) => (
    <div className={`flex items-center gap-4 text-base font-bold transition-all ${done ? 'opacity-100' : 'opacity-30'}`}>
        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${done ? 'bg-green-100 text-green-600 shadow-sm' : 'bg-gray-100 text-gray-400'}`}>
            {done ? <Icon name="check" size={14} strokeWidth={3} /> : <div className="w-1.5 h-1.5 bg-gray-300 rounded-full" />}
        </div>
        <span className={done ? 'text-gray-800' : 'text-gray-400'}>{text}</span>
    </div>
);
