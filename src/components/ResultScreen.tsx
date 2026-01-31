"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "./ui/Icon";
import { useStore } from "@/store/useStore";
import JSZip from "jszip";

export const ResultScreen = () => {
    const { files, reset } = useStore();
    const [previewFile, setPreviewFile] = useState<{ name: string; content: string } | null>(null);

    const coreFiles = Object.keys(files).filter(k => !k.startsWith('prompts/'));
    const promptFiles = Object.keys(files).filter(k => k.startsWith('prompts/'));

    const downloadOne = (name: string, content: string) => {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = name.split('/').pop() || name;
        a.click();
        URL.revokeObjectURL(url);
    };

    const downloadZip = async () => {
        const zip = new JSZip();
        Object.entries(files).forEach(([name, content]) => {
            zip.file(name, content);
        });
        const blob = await zip.generateAsync({ type: "blob" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "ai-agent-orchestrator.zip";
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="w-full animate-fade-in pb-20 max-w-5xl mx-auto px-4">
            <div className="text-center mb-16">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-24 h-24 bg-green-100 text-green-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-100/50"
                >
                    <Icon name="party-popper" size={48} />
                </motion.div>
                <h2 className="text-5xl font-black mb-4 tracking-tight text-gray-900">Your Team is Live</h2>
                <p className="text-xl text-gray-500 font-medium">Ready for deployment into your repository.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-10 mb-16">
                <div className="space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 pl-4">Core Assets</h3>
                    <div className="space-y-4">
                        {coreFiles.map(name => (
                            <FileCard
                                key={name}
                                name={name}
                                type={name.endsWith('.json') ? 'config' : 'doc'}
                                onPreview={() => setPreviewFile({ name, content: files[name] })}
                                onDownload={() => downloadOne(name, files[name])}
                            />
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 pl-4">System Brains ({promptFiles.length})</h3>
                    <div className="glass rounded-[2.5rem] p-8 space-y-4 max-h-[500px] overflow-auto custom-scrollbar border-l-4 border-indigo-400">
                        {promptFiles.map(name => (
                            <PromptItem
                                key={name}
                                name={name.split('/').pop() || name}
                                onPreview={() => setPreviewFile({ name, content: files[name] })}
                                onDownload={() => downloadOne(name, files[name])}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-12 border-t border-gray-100">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={downloadZip}
                    className="w-full md:w-auto px-16 py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-xl hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-200 flex items-center justify-center gap-4"
                >
                    <Icon name="archive" size={28} /> Download All (.ZIP)
                </motion.button>
                <button
                    onClick={reset}
                    className="text-gray-400 font-bold px-10 py-4 hover:text-gray-900 transition-colors text-lg"
                >
                    New Configuration
                </button>
            </div>

            {/* Preview Modal */}
            {previewFile && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-gray-900/60 backdrop-blur-md animate-fade-in px-4">
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="bg-white rounded-[3rem] w-full max-w-5xl max-h-[85vh] flex flex-col shadow-2xl relative overflow-hidden"
                    >
                        <div className="p-8 border-b flex justify-between items-center bg-gray-50/50">
                            <div>
                                <h3 className="text-2xl font-black text-gray-900">{previewFile.name}</h3>
                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mt-1">Source Preview</p>
                            </div>
                            <button
                                onClick={() => setPreviewFile(null)}
                                aria-label="Close preview"
                                className="p-4 bg-white shadow-sm border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors"
                            >
                                <Icon name="x" size={24} />
                            </button>
                        </div>
                        <div className="p-10 overflow-auto flex-grow custom-scrollbar bg-gray-50">
                            <pre className="text-lg font-mono text-gray-700 p-10 bg-white rounded-[2.5rem] border border-gray-200 leading-relaxed whitespace-pre-wrap">
                                {previewFile.content}
                            </pre>
                        </div>
                        <div className="p-8 border-t bg-gray-50/50 flex justify-end">
                            <button
                                onClick={() => {
                                    downloadOne(previewFile.name, previewFile.content);
                                    setPreviewFile(null);
                                }}
                                className="px-12 py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg flex items-center gap-3 shadow-lg shadow-indigo-200"
                            >
                                <Icon name="download" size={24} /> Export File
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

interface FileCardProps {
    name: string;
    type: 'config' | 'doc';
    onPreview: () => void;
    onDownload: () => void;
}

const FileCard = ({ name, type, onPreview, onDownload }: FileCardProps) => (
    <div className="glass rounded-[2rem] p-8 flex items-center justify-between group hover:shadow-2xl transition-all border-l-8 border-indigo-500 hover:-translate-x-1">
        <div className="flex items-center gap-6">
            <div className={`p-4 rounded-2xl ${type === 'config' ? 'bg-orange-50 text-orange-600' : 'bg-indigo-50 text-indigo-600'}`}>
                <Icon name={type === 'config' ? "file-json" : "file-bar-chart"} size={28} />
            </div>
            <div>
                <div className="font-extrabold text-xl text-gray-900">{name}</div>
                <div className="text-xs font-black text-gray-300 uppercase tracking-tighter mt-1">{type === 'config' ? 'JSON CONFIG' : 'MARKDOWN DOC'}</div>
            </div>
        </div>
        <div className="flex gap-3">
            <button
                onClick={onPreview}
                aria-label={`Preview ${name}`}
                className="p-4 bg-gray-50 text-gray-400 hover:text-indigo-600 rounded-2xl transition-all hover:bg-indigo-50"
            >
                <Icon name="eye" size={22} />
            </button>
            <button
                onClick={onDownload}
                aria-label={`Download ${name}`}
                className="p-4 bg-gray-900 text-white hover:bg-black rounded-2xl transition-all shadow-lg shadow-gray-200"
            >
                <Icon name="download" size={22} />
            </button>
        </div>
    </div>
);

interface PromptItemProps {
    name: string;
    onPreview: () => void;
    onDownload: () => void;
}

const PromptItem = ({ name, onPreview, onDownload }: PromptItemProps) => (
    <div className="flex items-center justify-between p-5 bg-white/60 border border-gray-100 rounded-2xl hover:border-indigo-200 transition-all hover:bg-white hover:shadow-md">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-black">
                <Icon name="message-square" size={18} />
            </div>
            <span className="font-extrabold text-gray-700">{name}</span>
        </div>
        <div className="flex gap-2">
            <button onClick={onPreview} aria-label={`Preview prompt for ${name}`} className="p-2 text-gray-400 hover:text-indigo-600"><Icon name="eye" size={20} /></button>
            <button onClick={onDownload} aria-label={`Download prompt for ${name}`} className="p-2 text-gray-400 hover:text-gray-900"><Icon name="download" size={20} /></button>
        </div>
    </div>
);
