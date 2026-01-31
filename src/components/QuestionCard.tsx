"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "./ui/Icon";
import { useStore } from "@/store/useStore";
import { QUESTIONS } from "@/constants/questions";
import { compileFiles } from "@/lib/generator";
import { getRecommendation } from "@/lib/recommendations";
import { TRANSLATIONS } from "@/constants/translations";
import confetti from "canvas-confetti";

export const QuestionCard = () => {
    const { step, setStep, answers, setAnswer, setFiles, setLoadingProgress, language } = useStore();
    const t = TRANSLATIONS[language];
    const [showAdvice, setShowAdvice] = useState(false);
    const question = QUESTIONS[step];

    if (!question) return null;

    const progress = ((step + 1) / QUESTIONS.length) * 100;
    const currentAnswer = answers[question.id];
    const recommendation = getRecommendation(question.id, answers);

    const OTHER_LABELS = ["Other (custom)", "Другое (свой вариант)", "Інше (свій варіант)"];

    const isOtherSelected = typeof currentAnswer === 'string' && OTHER_LABELS.includes(currentAnswer);
    const isCustomActive = isOtherSelected || (question.allowCustom && typeof currentAnswer === 'string' && !question.options.some(o => o.label === currentAnswer));

    const handleSelect = (label: string) => {
        if (question.type === "single") {
            setAnswer(question.id, label);
        } else {
            const current = Array.isArray(currentAnswer) ? currentAnswer : [];
            const updated = current.includes(label)
                ? current.filter((v: string) => v !== label)
                : [...current, label];
            setAnswer(question.id, updated);
        }
    };

    const applyRecommendation = () => {
        if (!recommendation) return;

        if (question.type === "single") {
            const option = question.options.find(o => o.id === recommendation.id);
            if (option) setAnswer(question.id, option.label);
        } else {
            const recIds = Array.isArray(recommendation.id) ? recommendation.id : [recommendation.id];
            const recommendedLabels = question.options
                .filter(o => recIds.includes(o.id))
                .map(o => o.label);
            setAnswer(question.id, recommendedLabels);
        }
        setShowAdvice(false);
    };

    const handleNext = () => {
        setShowAdvice(false);
        if (step < QUESTIONS.length - 1) {
            setStep(step + 1);
        } else {
            generateFinal();
        }
    };

    const generateFinal = () => {
        setStep(20);
        let p = 0;
        const interval = setInterval(() => {
            p += 5;
            setLoadingProgress(p);
            if (p >= 100) {
                clearInterval(interval);
                const generated = compileFiles(answers);
                setFiles(generated);
                setStep(21);
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ["#6366F1", "#4F46E5", "#A5B4FC"],
                });
            }
        }, 80);
    };

    return (
        <motion.div
            key={step}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className="glass rounded-[3rem] p-8 md:p-14 shadow-2xl relative overflow-hidden max-w-4xl mx-auto border-t-4 border-indigo-500"
        >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-100">
                <motion.div
                    className="h-full bg-indigo-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                />
            </div>

            <div className="flex justify-between items-center mb-10 text-xs font-black uppercase tracking-[0.2em] text-gray-400">
                <span className="flex items-center gap-2">
                    <Icon name="folder" size={14} /> {t.questions[question.id]?.block || question.block}
                </span>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setShowAdvice(!showAdvice)}
                        className={`flex items-center gap-2 px-3 py-1 rounded-full transition-all border ${showAdvice ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-indigo-50 text-indigo-600 border-indigo-100 hover:bg-indigo-100'
                            }`}
                    >
                        <Icon name="sparkles" size={14} />
                        <span className="font-black">{t.ui.advice}</span>
                    </button>
                    <span className="bg-gray-100 px-3 py-1 rounded-full text-indigo-500 font-bold">{t.ui.step} {step + 1} / {QUESTIONS.length}</span>
                </div>
            </div>

            {/* Advice Section omitted for brevity as it remains same visually or use dark vars */}
            <AnimatePresence>
                {showAdvice && recommendation && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mb-8 p-6 bg-indigo-600 text-white rounded-[2rem] overflow-hidden"
                    >
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white/20 rounded-2xl">
                                <Icon name="lightbulb" size={24} />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-black text-lg mb-1">{t.ui.recommendation}</h4>
                                <p className="text-white/80 font-medium text-base mb-4 leading-relaxed">{recommendation.reason}</p>
                                <button
                                    onClick={applyRecommendation}
                                    className="px-6 py-2 bg-white text-indigo-600 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-colors shadow-lg"
                                >
                                    {t.ui.apply}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-gray-900 leading-[1.1]">
                {t.questions[question.id]?.title || question.title}
            </h2>
            {(t.questions[question.id]?.subtitle || question.subtitle) && (
                <p className="text-xl text-gray-500 mb-10 font-medium">{t.questions[question.id]?.subtitle || question.subtitle}</p>
            )}

            <div className={`grid gap-4 mt-8 ${question.id === 1 || question.id === 5 ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
                {question.type !== "text" && question.options.map((opt) => {
                    const localizedOpt = t.questions[question.id]?.options?.[opt.id];
                    const displayLabel = localizedOpt?.label || opt.label;
                    const displayDesc = localizedOpt?.desc || opt.desc;

                    const isSelected = question.type === "single"
                        ? currentAnswer === opt.label
                        : (Array.isArray(currentAnswer) ? currentAnswer : []).includes(opt.label);

                    return (
                        <motion.button
                            key={opt.id}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleSelect(opt.label)}
                            className={`group flex items-start gap-4 p-5 rounded-3xl border-2 text-left transition-all ${isSelected
                                ? "border-indigo-600 bg-indigo-50/50 shadow-lg shadow-indigo-100"
                                : "border-gray-100 hover:border-gray-200 bg-white"
                                }`}
                        >
                            <div className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? "border-indigo-600 bg-indigo-600" : "border-gray-200 group-hover:border-gray-300"
                                }`}>
                                {isSelected && <Icon name="check" size={14} className="text-white" />}
                            </div>
                            <div className="flex-1">
                                <div className={`font-bold text-lg leading-tight ${isSelected ? "text-indigo-900" : "text-gray-700"}`}>
                                    {displayLabel}
                                </div>
                                {displayDesc && <div className="text-xs text-gray-400 mt-1 font-medium">{displayDesc}</div>}
                            </div>
                            {opt.icon && (
                                <Icon
                                    name={opt.icon}
                                    size={20}
                                    className={isSelected ? "text-indigo-600" : "text-gray-300"}
                                />
                            )}
                        </motion.button>
                    );
                })}
            </div>

            <AnimatePresence>
                {question.type === "text" && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="mt-8"
                    >
                        <textarea
                            value={currentAnswer || ""}
                            onChange={(e) => setAnswer(question.id, e.target.value)}
                            placeholder={t.ui.idea_placeholder}
                            className="w-full p-8 bg-gray-50 border-2 border-gray-100 rounded-[2.5rem] text-xl font-medium focus:border-indigo-500 focus:bg-white transition-all outline-none min-h-[250px] shadow-inner"
                        />
                    </motion.div>
                )}

                {isCustomActive && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="mt-8"
                    >
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 pl-2">{t.ui.custom_label}</label>
                        <textarea
                            value={isOtherSelected ? "" : (currentAnswer as string)}
                            onChange={(e) => setAnswer(question.id, e.target.value)}
                            placeholder={t.ui.custom_placeholder}
                            className="w-full p-6 bg-gray-50 border-2 border-gray-100 rounded-[2rem] text-xl font-medium focus:border-indigo-500 focus:bg-white transition-all outline-none min-h-[120px]"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-100">
                <button
                    onClick={() => {
                        setShowAdvice(false);
                        setStep(step - 1);
                    }}
                    disabled={step === 0}
                    className={`px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all ${step === 0 ? "opacity-0 pointer-events-none" : "text-gray-400 hover:text-gray-800 hover:bg-gray-50"
                        }`}
                >
                    <Icon name="arrow-left" size={20} /> {t.ui.back}
                </button>
                <button
                    onClick={handleNext}
                    className="px-12 py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg hover:bg-black transition-all flex items-center gap-3 shadow-xl shadow-gray-200"
                >
                    {step === QUESTIONS.length - 1 ? t.ui.initialize : t.ui.continue}
                    <Icon name="arrow-right" size={20} />
                </button>
            </div>
        </motion.div>
    );
};
