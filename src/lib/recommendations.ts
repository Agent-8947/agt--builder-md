import { QUESTIONS } from "@/constants/questions";

interface Recommendation {
    id: string | string[]; // ID(s) of the option(s) to recommend
    reason: string;
}

export const getRecommendation = (questionId: number, answers: Record<number, string | string[] | undefined>): Recommendation | null => {
    const idea = (answers[0] as string || "").toLowerCase();
    const q1 = answers[1]; // What are you developing?
    const q3 = answers[3] || []; // Tech stack

    switch (questionId) {
        case 0:
            return null; // No recommendation for the description itself

        case 1:
            if (idea.includes("saas") || idea.includes("platform") || idea.includes("сервис")) {
                return { id: "saas", reason: "Project idea suggests a subscription-based platform, making SaaS the optimal model." };
            }
            if (idea.includes("mobile") || idea.includes("app") || idea.includes("телефон")) {
                return { id: "mobile", reason: "Description indicates a mobile-first approach, suggesting native or cross-platform mobile development." };
            }
            return { id: "web_full", reason: "Standard recommendation for robust full-cycle development." };

        case 2:
            if (q1 === "Fullstack Web App" || q1 === "SaaS Platform" || idea.includes("complex") || idea.includes("scale")) {
                return {
                    id: ["monorepo", "fsd", "modular_monolith"],
                    reason: "Based on the project scope, combining Monorepo with FSD and Modular Monolith offers maximum scalability."
                };
            }
            return { id: "monolith", reason: "Recommended for smaller or independent projects to maintain development speed." };

        case 3:
            if (idea.includes("ai") || idea.includes("ml") || idea.includes("intelligence")) {
                return { id: ["typescript", "nextjs", "python", "openai", "langchain", "pinecone"], reason: "AI-focused stack optimized for LLM integration and vector data processing." };
            }
            if (q1 === "Fullstack Web App" || q1 === "SaaS Platform") {
                return { id: ["react", "nextjs", "typescript", "tailwindcss", "nodejs", "postgresql"], reason: "Industry standard T3-like stack for high-performance web applications." };
            }
            return { id: ["typescript", "react"], reason: "Ensures type safety and a modern UI development experience." };

        case 5: // AI Agents
            const agents = ["planner", "architect", "codewriter", "refactorer", "reviewer"];
            if (idea.includes("test") || idea.includes("quality")) agents.push("tester");
            if (idea.includes("security") || idea.includes("audit")) agents.push("security");
            if (idea.includes("ui") || idea.includes("ux")) agents.push("ui_specialist");
            if (q3.includes("react") || q3.includes("nextjs")) agents.push("tester");
            return { id: agents, reason: "Tailored team selected to handle your project's specific requirements from planning to deployment." };

        case 6: // Create files
            return { id: "full", reason: "Required for agents to autonomously architect and implement the project structure." };

        case 11: // Autonomy
            return { id: "medium", reason: "Agents work independently but seek confirmation for critical structural decisions." };

        case 12: // Coordination
            const selectedAgents = answers[5];
            if (Array.isArray(selectedAgents) && selectedAgents.length > 3) {
                return { id: "orchestrator", reason: "A strategic orchestrator is necessary to manage coordination between multiple agents." };
            }
            return { id: "sequential", reason: "Simpler, more predictable workflow for smaller specialized teams." };

        case 17: // Priority
            return { id: "quality", reason: "Prioritizing quality ensures long-term maintainability and reduces technical debt." };

        case 18: // Style
            return { id: "strict", reason: "Ensures high standards of code consistency and professional formatting." };

        default:
            const firstOption = QUESTIONS.find(q => q.id === questionId)?.options[0];
            return firstOption ? { id: firstOption.id, reason: "System default for a standard professional development cycle." } : null;
    }
};
