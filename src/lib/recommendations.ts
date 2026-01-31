import { QUESTIONS } from "@/constants/questions";

interface Recommendation {
    id: string | string[]; // ID(s) of the option(s) to recommend
    reason: string;
}

const RECOMMENDATIONS: Record<string, Record<string, string>> = {
    en: {
        saas: "Project idea suggests a subscription-based platform, making SaaS the optimal model.",
        mobile: "Description indicates a mobile-first approach, suggesting native or cross-platform mobile development.",
        ai: "AI-focused stack optimized for LLM integration and vector data processing.",
        web: "Industry standard stack for high-performance web applications.",
        standard: "Standard recommendation for robust full-cycle development.",
        monorepo: "Based on the project scope, combining Monorepo with FSD and Modular Monolith offers maximum scalability.",
        monolith: "Recommended for smaller or independent projects to maintain development speed.",
        agents: "Tailored team selected to handle your project's specific requirements from planning to deployment.",
        orchestrator: "A strategic orchestrator is necessary to manage coordination between multiple agents.",
        sequential: "Simpler, more predictable workflow for smaller specialized teams.",
        full_access: "Required for agents to autonomously architect and implement the project structure.",
        medium_autonomy: "Agents work independently but seek confirmation for critical structural decisions.",
        quality: "Prioritizing quality ensures long-term maintainability and reduces technical debt.",
        strict_style: "Ensures high standards of code consistency and professional formatting.",
        default: "System default for a standard professional development cycle."
    },
    ru: {
        saas: "Идея проекта предполагает платформу по подписке, поэтому SaaS — оптимальная модель.",
        mobile: "Описание указывает на мобильное приложение, рекомендуется нативная или кроссплатформенная разработка.",
        ai: "Стек ориентирован на ИИ: оптимизирован для интеграции с LLM и обработки векторных данных.",
        web: "Индустриальный стандарт для высокопроизводительных веб-приложений.",
        standard: "Стандартная рекомендация для полноценного цикла разработки.",
        monorepo: "Учитывая масштаб, использование Monorepo с FSD и модульным монолитом обеспечит максимальную масштабируемость.",
        monolith: "Рекомендуется для небольших или независимых проектов для высокой скорости разработки.",
        agents: "Команда подобрана специально под требования вашего проекта: от планирования до деплоя.",
        orchestrator: "Необходим главный координатор для управления взаимодействием множества агентов.",
        sequential: "Простой и предсказуемый процесс для небольших специализированных команд.",
        full_access: "Необходимо для того, чтобы агенты могли автономно проектировать и внедрять структуру проекта.",
        medium_autonomy: "Агенты работают самостоятельно, но запрашивают подтверждение для важных архитектурных решений.",
        quality: "Приоритет качества обеспечивает долгосрочную поддержку и минимизирует техдолг.",
        strict_style: "Гарантирует высокие стандарты консистентности кода и профессиональное форматирование.",
        default: "Системная настройка для стандартного профессионального цикла разработки."
    }
};

export const getRecommendation = (questionId: number, answers: Record<number, string | string[] | undefined>, lang: 'en' | 'ru' | 'uk' = 'en'): Recommendation | null => {
    const idea = (answers[0] as string || "").toLowerCase();
    const q1 = answers[1]; // What are you developing?
    const q3 = answers[3] || []; // Tech stack

    const r = RECOMMENDATIONS[lang === 'en' ? 'en' : 'ru'] || RECOMMENDATIONS.en;

    switch (questionId) {
        case 0:
            return null;

        case 1:
            if (idea.includes("saas") || idea.includes("platform") || idea.includes("сервис") || idea.includes("платформа")) {
                return { id: "saas", reason: r.saas };
            }
            if (idea.includes("mobile") || idea.includes("app") || idea.includes("телефон") || idea.includes("мобильное")) {
                return { id: "mobile", reason: r.mobile };
            }
            if (idea.includes("tg") || idea.includes("bot") || idea.includes("telega") || idea.includes("бот")) {
                return { id: "ai_service", reason: r.ai };
            }
            return { id: "web_full", reason: r.standard };

        case 2:
            if (q1 === "web_full" || q1 === "saas" || idea.includes("complex") || idea.includes("scale") || idea.includes("сложный") || idea.includes("масштаб")) {
                return {
                    id: ["monorepo", "fsd", "modular_monolith"],
                    reason: r.monorepo
                };
            }
            return { id: "monolith", reason: r.monolith };

        case 3:
            if (idea.includes("ai") || idea.includes("ml") || idea.includes("intelligence") || idea.includes("ии") || idea.includes("нейро")) {
                return { id: ["typescript", "nextjs", "python", "openai", "langchain", "pinecone"], reason: r.ai };
            }
            if (q1 === "web_full" || q1 === "saas" || q1 === "backend") {
                return { id: ["react", "nextjs", "typescript", "tailwind", "nodejs", "postgresql", "prisma", "docker"], reason: r.web };
            }
            return { id: ["typescript", "react", "tailwind"], reason: r.standard };

        case 5: // AI Agents
            const agents = ["planner", "architect", "codewriter", "reviewer", "documenter"];
            if (idea.includes("test") || idea.includes("quality") || idea.includes("тест") || idea.includes("качество")) agents.push("tester");
            if (idea.includes("security") || idea.includes("audit") || idea.includes("безопасность")) agents.push("security");
            if (idea.includes("ui") || idea.includes("ux") || idea.includes("дизайн") || idea.includes("интерфейс")) agents.push("ui_specialist");
            if (idea.includes("deploy") || idea.includes("ci") || idea.includes("cloud") || idea.includes("деплой")) agents.push("devops");
            if (idea.includes("bug") || idea.includes("fix") || idea.includes("баг") || idea.includes("ошибк")) agents.push("bugfixer");
            if (q1 === "saas" || q1 === "web_full") agents.push("architect", "codewriter", "reviewer", "tester");

            // Suggest testing if frontend frameworks are selected
            if (Array.isArray(q3) && (q3.includes("react") || q3.includes("nextjs") || q3.includes("vue"))) {
                agents.push("tester");
            }

            // Deduplicate
            const uniqueAgents = Array.from(new Set(agents));
            return { id: uniqueAgents, reason: r.agents };

        case 6: // Create files
            return { id: "full", reason: r.full_access };

        case 11: // Autonomy
            return { id: "medium", reason: r.medium_autonomy };

        case 12: // Coordination
            const selectedAgents = answers[5];
            if (Array.isArray(selectedAgents) && selectedAgents.length > 4) {
                return { id: "orchestrator", reason: r.orchestrator };
            }
            return { id: "sequential", reason: r.sequential };

        case 17: // Priority
            if (idea.includes("fast") || idea.includes("speed") || idea.includes("быстро")) {
                return { id: "speed", reason: "Prioritizing speed for rapid prototyping and faster time-to-market." };
            }
            return { id: "quality", reason: r.quality };

        case 18: // Style
            return { id: "strict", reason: r.strict_style };

        default:
            const firstOption = QUESTIONS.find(q => q.id === questionId)?.options[0];
            return firstOption ? { id: firstOption.id, reason: r.default } : null;
    }
};

