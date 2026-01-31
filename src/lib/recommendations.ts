import { QUESTIONS } from "@/constants/questions";

interface Recommendation {
    id: string | string[]; // ID(s) of the option(s) to recommend
    reason: string;
}

export const getRecommendation = (questionId: number, answers: Record<number, string | string[] | undefined>): Recommendation | null => {
    const q1 = answers[1]; // What are you developing?
    const q3 = answers[3] || []; // Tech stack

    switch (questionId) {
        case 1:
            return { id: "web_full", reason: "Standard for full-cycle development including database and server logic." };

        case 2:
            if (q1 === "Fullstack Web App" || q1 === "SaaS Platform") {
                return {
                    id: ["monorepo", "fsd", "modular_monolith"],
                    reason: "Combining Monorepo with FSD and Modular Monolith provides the most robust architecture for complex web platforms."
                };
            }
            return { id: "monolith", reason: "Classic Monolith is the most efficient starting point for smaller or independent projects." };

        case 3:
            if (q1 === "Fullstack Web App" || q1 === "SaaS Platform") {
                return { id: ["react", "nextjs", "typescript", "tailwindcss", "nodejs", "postgresql"], reason: "Industry standard T3-like stack for high-performance web applications." };
            }
            return { id: ["typescript", "react"], reason: "TypeScript ensures type safety, while React remains the most versatile UI library." };

        case 5: // AI Agents
            const agents = ["codewriter", "refactorer", "reviewer"];
            if (q3.includes("React") || q3.includes("Next.js")) agents.push("tester");
            if (q1 === "Fullstack Web App" || q1 === "SaaS Platform") agents.push("database");
            return { id: agents, reason: "This team covers the full lifecycle from feature implementation to quality assurance." };

        case 6: // Create files
            return { id: "full", reason: "Full write access is required for agents to autonomously architect and implement new modules." };

        case 11: // Autonomy
            return { id: "medium", reason: "Balanced autonomy: agents work independently but request confirmation for critical structural changes." };

        case 12: // Coordination
            const selectedAgents = answers[5];
            if (Array.isArray(selectedAgents) && selectedAgents.length > 3) {
                return { id: "orchestrator", reason: "With more than 3 agents, an orchestrator is recommended to prevent logic collisions." };
            }
            return { id: "sequential", reason: "For smaller teams, sequential execution is more predictable and easier to debug." };

        case 17: // Priority
            return { id: "quality", reason: "Focusing on quality minimizes technical debt and reduces long-term maintenance costs." };

        case 18: // Style
            return { id: "strict", reason: "Strict linting ensures agent-generated code is indistinguishable from human-written professional code." };

        default:
            // Generic fallback for other questions
            const firstOption = QUESTIONS.find(q => q.id === questionId)?.options[0];
            return firstOption ? { id: firstOption.id, reason: "Recommended default for a standard professional workflow." } : null;
    }
};
