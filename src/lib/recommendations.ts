import { QUESTIONS } from "@/constants/questions";

export interface Recommendation {
    id: string | string[];
    reason: string;
    why: string[];        // Почему это лучший выбор
    benefits: string[];   // Преимущества
    context?: string;     // Контекст на основе предыдущих ответов
}

// Детальные рекомендации с пояснениями
const DETAILED_RECOMMENDATIONS = {
    en: {
        // Project Type recommendations
        saas: {
            reason: "SaaS Platform is the optimal choice for your project",
            why: [
                "Your description mentions subscription/platform model",
                "Multi-tenant architecture scales better",
                "Recurring revenue model is more sustainable"
            ],
            benefits: [
                "Built-in user management",
                "Subscription billing ready",
                "Multi-tenant data isolation"
            ]
        },
        web_full: {
            reason: "Fullstack Web App provides complete control",
            why: [
                "Custom frontend + backend in one project",
                "Full control over all layers",
                "Most flexible architecture choice"
            ],
            benefits: [
                "Single codebase deployment",
                "Shared types between frontend/backend",
                "Faster development iteration"
            ]
        },
        mobile: {
            reason: "Mobile app matches your requirements",
            why: [
                "Your description indicates mobile-first needs",
                "Native experience for best UX",
                "Access to device features (camera, GPS, etc.)"
            ],
            benefits: [
                "App store distribution",
                "Push notifications",
                "Offline support possible"
            ]
        },
        ai_service: {
            reason: "AI/ML Service for intelligent features",
            why: [
                "Your project involves AI/ML/bot capabilities",
                "LLM integration requires specialized architecture",
                "Vector databases needed for semantic search"
            ],
            benefits: [
                "Optimized for AI workloads",
                "RAG pipeline support",
                "Scalable inference infrastructure"
            ]
        },

        // Architecture recommendations
        monorepo_fsd: {
            reason: "Monorepo + FSD for maximum scalability",
            why: [
                "Project type suggests complex structure",
                "Multiple packages share code efficiently",
                "Feature-Sliced Design prevents spaghetti code"
            ],
            benefits: [
                "Shared components library",
                "Atomic deployments",
                "Clear boundaries between features"
            ]
        },
        monolith: {
            reason: "Monolith for faster development",
            why: [
                "Simpler projects benefit from less complexity",
                "Faster initial setup",
                "Easier to understand and maintain"
            ],
            benefits: [
                "Quick start development",
                "Simple deployment",
                "Lower cognitive load"
            ]
        },

        // Tech Stack recommendations
        web_stack: {
            reason: "Modern web stack for production apps",
            why: [
                "Industry standard technologies",
                "Large ecosystem and community",
                "Proven at scale (Netflix, Airbnb, etc.)"
            ],
            benefits: [
                "TypeScript: Type safety, better DX",
                "Next.js: SSR, API routes, optimization",
                "Tailwind: Rapid UI development",
                "Prisma: Type-safe database access"
            ]
        },
        ai_stack: {
            reason: "AI-optimized stack for LLM integration",
            why: [
                "Your project involves AI/ML features",
                "These tools are designed for AI workloads",
                "Best practices for LLM applications"
            ],
            benefits: [
                "OpenAI: GPT models integration",
                "LangChain: LLM orchestration",
                "Pinecone: Vector similarity search",
                "Python: ML ecosystem support"
            ]
        },

        // Agent recommendations
        full_team: {
            reason: "Complete team for production-grade development",
            why: [
                "Based on your project type and complexity",
                "Each agent handles specialized tasks",
                "Distributed workload = faster delivery"
            ],
            benefits: [
                "Planner: Strategic task decomposition",
                "Architect: System design decisions",
                "CodeWriter: Implementation",
                "Reviewer: Quality assurance",
                "Tester: Automated testing"
            ]
        },

        // Workflow recommendations  
        orchestrator: {
            reason: "Orchestrator topology for complex coordination",
            why: [
                "You have 5+ agents that need coordination",
                "Central control prevents conflicts",
                "Clear chain of command"
            ],
            benefits: [
                "Single source of truth for tasks",
                "Parallel execution when possible",
                "Automatic conflict resolution"
            ]
        },
        sequential: {
            reason: "Sequential workflow for smaller teams",
            why: [
                "Fewer agents = simpler coordination",
                "Predictable execution order",
                "Easier to debug issues"
            ],
            benefits: [
                "Clear step-by-step process",
                "Less overhead",
                "Transparent progress tracking"
            ]
        },

        // Autonomy recommendations
        medium_autonomy: {
            reason: "Medium autonomy balances speed and control",
            why: [
                "Agents work independently on routine tasks",
                "Critical decisions need your approval",
                "Best balance for most projects"
            ],
            benefits: [
                "Faster routine work",
                "Control over important decisions",
                "Learning opportunity from agent suggestions"
            ]
        },

        // Priority recommendations
        quality: {
            reason: "Quality-first ensures long-term success",
            why: [
                "Technical debt is expensive to fix later",
                "Production apps need reliability",
                "Maintenance costs decrease with quality"
            ],
            benefits: [
                "Fewer bugs in production",
                "Easier to onboard new developers",
                "Lower long-term costs"
            ]
        },
        speed: {
            reason: "Speed-first for rapid prototyping",
            why: [
                "Your description mentions fast/quick delivery",
                "MVP validation before investing more",
                "Time-to-market advantage"
            ],
            benefits: [
                "Faster feedback loop",
                "Quick iteration on ideas",
                "Early market validation"
            ]
        },

        // Style recommendations
        strict_style: {
            reason: "Strict coding standards ensure consistency",
            why: [
                "Multiple agents write code",
                "Consistency reduces cognitive load",
                "Easier code reviews"
            ],
            benefits: [
                "Uniform codebase",
                "Automatic formatting",
                "Fewer style debates"
            ]
        },

        // Permission recommendations
        full_access: {
            reason: "Full access enables autonomous development",
            why: [
                "Agents need to create project structure",
                "Less interruption = faster progress",
                "You can review via Git commits"
            ],
            benefits: [
                "Autonomous scaffolding",
                "Complete feature implementation",
                "Fewer approval bottlenecks"
            ]
        }
    },
    ru: {
        saas: {
            reason: "SaaS платформа — оптимальный выбор для вашего проекта",
            why: [
                "В описании упоминается подписочная/платформенная модель",
                "Мультитенантная архитектура лучше масштабируется",
                "Модель регулярного дохода более устойчива"
            ],
            benefits: [
                "Встроенное управление пользователями",
                "Готовность к подписочным платежам",
                "Изоляция данных между клиентами"
            ]
        },
        web_full: {
            reason: "Fullstack Web App даёт полный контроль",
            why: [
                "Кастомный фронтенд + бэкенд в одном проекте",
                "Полный контроль над всеми слоями",
                "Максимально гибкий выбор архитектуры"
            ],
            benefits: [
                "Деплой одной кодовой базы",
                "Общие типы между фронтендом и бэкендом",
                "Быстрая итерация разработки"
            ]
        },
        mobile: {
            reason: "Мобильное приложение соответствует вашим требованиям",
            why: [
                "Описание указывает на mobile-first подход",
                "Нативный опыт для лучшего UX",
                "Доступ к фичам устройства (камера, GPS и т.д.)"
            ],
            benefits: [
                "Дистрибуция через App Store",
                "Push-уведомления",
                "Возможность офлайн-работы"
            ]
        },
        ai_service: {
            reason: "AI/ML сервис для интеллектуальных функций",
            why: [
                "Ваш проект включает AI/ML/бот возможности",
                "Интеграция LLM требует специальной архитектуры",
                "Векторные БД нужны для семантического поиска"
            ],
            benefits: [
                "Оптимизация для AI-нагрузок",
                "Поддержка RAG-пайплайна",
                "Масштабируемая инфраструктура инференса"
            ]
        },
        monorepo_fsd: {
            reason: "Monorepo + FSD для максимальной масштабируемости",
            why: [
                "Тип проекта предполагает сложную структуру",
                "Несколько пакетов эффективно делят код",
                "Feature-Sliced Design предотвращает спагетти-код"
            ],
            benefits: [
                "Общая библиотека компонентов",
                "Атомарные деплои",
                "Чёткие границы между фичами"
            ]
        },
        monolith: {
            reason: "Монолит для быстрой разработки",
            why: [
                "Простые проекты выигрывают от меньшей сложности",
                "Быстрая начальная настройка",
                "Проще понять и поддерживать"
            ],
            benefits: [
                "Быстрый старт разработки",
                "Простой деплой",
                "Меньше когнитивной нагрузки"
            ]
        },
        web_stack: {
            reason: "Современный веб-стек для production приложений",
            why: [
                "Индустриальные стандартные технологии",
                "Большая экосистема и сообщество",
                "Проверено в масштабе (Netflix, Airbnb и др.)"
            ],
            benefits: [
                "TypeScript: типобезопасность, лучший DX",
                "Next.js: SSR, API routes, оптимизация",
                "Tailwind: быстрая UI-разработка",
                "Prisma: типобезопасный доступ к БД"
            ]
        },
        ai_stack: {
            reason: "AI-оптимизированный стек для интеграции LLM",
            why: [
                "Ваш проект включает AI/ML функции",
                "Эти инструменты созданы для AI-нагрузок",
                "Лучшие практики для LLM-приложений"
            ],
            benefits: [
                "OpenAI: интеграция GPT моделей",
                "LangChain: оркестрация LLM",
                "Pinecone: векторный семантический поиск",
                "Python: экосистема ML"
            ]
        },
        full_team: {
            reason: "Полная команда для production-уровня разработки",
            why: [
                "На основе типа и сложности вашего проекта",
                "Каждый агент выполняет специализированные задачи",
                "Распределённая нагрузка = быстрее доставка"
            ],
            benefits: [
                "Planner: стратегическая декомпозиция задач",
                "Architect: решения по системному дизайну",
                "CodeWriter: имплементация",
                "Reviewer: контроль качества",
                "Tester: автоматизированное тестирование"
            ]
        },
        orchestrator: {
            reason: "Оркестратор для сложной координации",
            why: [
                "У вас 5+ агентов, требующих координации",
                "Центральный контроль предотвращает конфликты",
                "Понятная цепочка команд"
            ],
            benefits: [
                "Единый источник правды для задач",
                "Параллельное выполнение где возможно",
                "Автоматическое разрешение конфликтов"
            ]
        },
        sequential: {
            reason: "Последовательный процесс для небольших команд",
            why: [
                "Меньше агентов = проще координация",
                "Предсказуемый порядок выполнения",
                "Проще отлаживать проблемы"
            ],
            benefits: [
                "Понятный пошаговый процесс",
                "Меньше накладных расходов",
                "Прозрачное отслеживание прогресса"
            ]
        },
        medium_autonomy: {
            reason: "Средняя автономия балансирует скорость и контроль",
            why: [
                "Агенты работают независимо над рутинными задачами",
                "Критические решения требуют вашего одобрения",
                "Лучший баланс для большинства проектов"
            ],
            benefits: [
                "Быстрее рутинная работа",
                "Контроль над важными решениями",
                "Возможность учиться на предложениях агентов"
            ]
        },
        quality: {
            reason: "Качество в приоритете обеспечивает долгосрочный успех",
            why: [
                "Технический долг дорого исправлять позже",
                "Production приложениям нужна надёжность",
                "Затраты на поддержку снижаются с качеством"
            ],
            benefits: [
                "Меньше багов в production",
                "Легче onboarding новых разработчиков",
                "Ниже долгосрочные затраты"
            ]
        },
        speed: {
            reason: "Скорость в приоритете для быстрого прототипирования",
            why: [
                "Описание упоминает быструю доставку",
                "Валидация MVP до больших инвестиций",
                "Преимущество time-to-market"
            ],
            benefits: [
                "Быстрый цикл обратной связи",
                "Быстрая итерация идей",
                "Ранняя валидация рынка"
            ]
        },
        strict_style: {
            reason: "Строгие стандарты обеспечивают консистентность",
            why: [
                "Несколько агентов пишут код",
                "Консистентность снижает когнитивную нагрузку",
                "Легче code review"
            ],
            benefits: [
                "Единообразная кодовая база",
                "Автоматическое форматирование",
                "Меньше споров о стиле"
            ]
        },
        full_access: {
            reason: "Полный доступ для автономной разработки",
            why: [
                "Агентам нужно создавать структуру проекта",
                "Меньше прерываний = быстрее прогресс",
                "Можно ревьюить через Git коммиты"
            ],
            benefits: [
                "Автономный scaffolding",
                "Полная имплементация фич",
                "Меньше узких мест одобрения"
            ]
        }
    }
};

export const getRecommendation = (
    questionId: number,
    answers: Record<number, string | string[] | undefined>,
    lang: 'en' | 'ru' | 'uk' = 'en'
): Recommendation | null => {
    const idea = (answers[0] as string || "").toLowerCase();
    const q1 = answers[1]; // What are you developing?
    const q3 = answers[3] || []; // Tech stack
    const selectedAgents = answers[5];

    const r = DETAILED_RECOMMENDATIONS[lang === 'en' ? 'en' : 'ru'];

    const buildRecommendation = (
        id: string | string[],
        key: keyof typeof r,
        contextMsg?: string
    ): Recommendation => {
        const data = r[key];
        return {
            id,
            reason: data.reason,
            why: data.why,
            benefits: data.benefits,
            context: contextMsg
        };
    };

    switch (questionId) {
        case 0:
            return null;

        case 1: // Project type
            if (idea.includes("saas") || idea.includes("platform") || idea.includes("сервис") || idea.includes("платформа") || idea.includes("подписк")) {
                return buildRecommendation("saas", "saas",
                    lang === 'ru'
                        ? `Обнаружено в описании: "${idea.slice(0, 50)}..."`
                        : `Detected in description: "${idea.slice(0, 50)}..."`
                );
            }
            if (idea.includes("mobile") || idea.includes("app") || idea.includes("телефон") || idea.includes("мобильн") || idea.includes("ios") || idea.includes("android")) {
                return buildRecommendation("mobile", "mobile",
                    lang === 'ru' ? "Обнаружены мобильные ключевые слова" : "Mobile keywords detected"
                );
            }
            if (idea.includes("ai") || idea.includes("ml") || idea.includes("bot") || idea.includes("бот") || idea.includes("ии") || idea.includes("нейро") || idea.includes("gpt")) {
                return buildRecommendation("ai_service", "ai_service",
                    lang === 'ru' ? "Обнаружены AI/ML ключевые слова" : "AI/ML keywords detected"
                );
            }
            return buildRecommendation("web_full", "web_full",
                lang === 'ru' ? "Универсальный выбор для большинства проектов" : "Universal choice for most projects"
            );

        case 2: // Architecture
            if (q1 === "web_full" || q1 === "saas" || idea.includes("complex") || idea.includes("scale") || idea.includes("сложн") || idea.includes("масштаб") || idea.includes("enterprise")) {
                return buildRecommendation(
                    ["monorepo", "fsd", "modular_monolith"],
                    "monorepo_fsd",
                    lang === 'ru'
                        ? `Рекомендация на основе типа проекта: ${q1}`
                        : `Recommendation based on project type: ${q1}`
                );
            }
            return buildRecommendation("monolith", "monolith",
                lang === 'ru' ? "Оптимально для старта и простых проектов" : "Optimal for starting and simple projects"
            );

        case 3: // Tech stack
            if (idea.includes("ai") || idea.includes("ml") || idea.includes("intelligence") || idea.includes("ии") || idea.includes("нейро") || idea.includes("gpt") || idea.includes("llm")) {
                return buildRecommendation(
                    ["typescript", "nextjs", "python", "openai", "langchain", "pinecone"],
                    "ai_stack",
                    lang === 'ru' ? "AI-стек для вашего проекта с ИИ" : "AI stack for your AI project"
                );
            }
            if (q1 === "web_full" || q1 === "saas" || q1 === "backend" || q1 === "frontend") {
                return buildRecommendation(
                    ["react", "nextjs", "typescript", "tailwind", "nodejs", "postgresql", "prisma", "docker"],
                    "web_stack",
                    lang === 'ru' ? "Проверенный стек для веб-разработки" : "Proven stack for web development"
                );
            }
            return buildRecommendation(
                ["typescript", "react", "tailwind"],
                "web_stack",
                lang === 'ru' ? "Минимальный базовый набор" : "Minimal base set"
            );

        case 5: // AI Agents
            const agents = ["planner", "architect", "codewriter", "reviewer", "documenter"];

            if (idea.includes("test") || idea.includes("quality") || idea.includes("тест") || idea.includes("качеств")) {
                agents.push("tester");
            }
            if (idea.includes("security") || idea.includes("audit") || idea.includes("безопасн") || idea.includes("защит")) {
                agents.push("security");
            }
            if (idea.includes("deploy") || idea.includes("ci") || idea.includes("cloud") || idea.includes("деплой") || idea.includes("docker")) {
                agents.push("devops");
            }

            // New: Scout и Analyst для задач сбора данных
            if (idea.includes("вакансии") || idea.includes("vacancy") || idea.includes("job") ||
                idea.includes("поиск") || idea.includes("search") || idea.includes("сбор") ||
                idea.includes("скрапинг") || idea.includes("scraping") || idea.includes("парс") ||
                idea.includes("crawl") || idea.includes("данные с сайт")) {
                agents.push("scout");
                agents.push("analyst");
            }

            // New: Integrator для облачных интеграций
            if (idea.includes("drive") || idea.includes("гугл") || idea.includes("google") ||
                idea.includes("сохранить на диск") || idea.includes("notion") || idea.includes("slack") ||
                idea.includes("интеграци") || idea.includes("integration") || idea.includes("api")) {
                agents.push("integrator");
            }

            if (q1 === "saas" || q1 === "web_full") {
                if (!agents.includes("tester")) agents.push("tester");
            }
            if (Array.isArray(q3) && (q3.includes("react") || q3.includes("nextjs") || q3.includes("vue"))) {
                if (!agents.includes("tester")) agents.push("tester");
            }

            const uniqueAgents = Array.from(new Set(agents));
            return buildRecommendation(uniqueAgents, "full_team",
                lang === 'ru'
                    ? `Команда из ${uniqueAgents.length} агентов на основе анализа проекта`
                    : `Team of ${uniqueAgents.length} agents based on project analysis`
            );

        case 6: // Create files
            return buildRecommendation("full", "full_access");

        case 11: // Autonomy
            return buildRecommendation("medium", "medium_autonomy",
                lang === 'ru' ? "Оптимальный баланс для большинства проектов" : "Optimal balance for most projects"
            );

        case 12: // Coordination
            if (Array.isArray(selectedAgents) && selectedAgents.length > 4) {
                return buildRecommendation("orchestrator", "orchestrator",
                    lang === 'ru'
                        ? `У вас ${selectedAgents.length} агентов — нужен координатор`
                        : `You have ${selectedAgents.length} agents — need a coordinator`
                );
            }
            return buildRecommendation("sequential", "sequential",
                lang === 'ru' ? "Достаточно для маленькой команды" : "Sufficient for a small team"
            );

        case 17: // Priority
            if (idea.includes("fast") || idea.includes("speed") || idea.includes("mvp") || idea.includes("быстр") || idea.includes("прототип")) {
                return buildRecommendation("speed", "speed",
                    lang === 'ru' ? "Обнаружено: акцент на скорости" : "Detected: emphasis on speed"
                );
            }
            return buildRecommendation("quality", "quality",
                lang === 'ru' ? "Рекомендуется для production проектов" : "Recommended for production projects"
            );

        case 18: // Style
            return buildRecommendation("strict", "strict_style",
                lang === 'ru' ? "Консистентность важна при работе с агентами" : "Consistency is important when working with agents"
            );

        default:
            const firstOption = QUESTIONS.find(q => q.id === questionId)?.options[0];
            if (firstOption) {
                return {
                    id: firstOption.id,
                    reason: lang === 'ru' ? "Стандартная рекомендация" : "Standard recommendation",
                    why: [lang === 'ru' ? "Оптимальный выбор по умолчанию" : "Optimal default choice"],
                    benefits: [lang === 'ru' ? "Проверенная настройка" : "Proven setting"]
                };
            }
            return null;
    }
};
