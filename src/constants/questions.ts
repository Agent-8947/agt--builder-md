export interface Option {
    id: string;
    label: string;
    desc?: string;
    icon?: string;
}

export interface Question {
    id: number;
    block: string;
    title: string;
    subtitle?: string;
    type: 'single' | 'multiple' | 'text';
    options: Option[];
    allowCustom?: boolean;
}

export const QUESTIONS: Question[] = [
    {
        id: 0,
        block: "Миссия",
        title: "Опишите идею проекта",
        subtitle: "Это фундаментальный контекст, который определит поведение всех AI-агентов",
        type: "text",
        options: []
    },
    {
        id: 1,
        block: "О проекте",
        title: "Что вы разрабатываете?",
        type: "single",
        allowCustom: true,
        options: [
            { id: "web_full", label: "Fullstack Web App", desc: "Комплексное решение (frontend + backend + db)", icon: "layout" },
            { id: "saas", label: "SaaS Platform", desc: "Многопользовательский сервис по подписке", icon: "cloud" },
            { id: "nocode_builder", label: "No-code / Website Builder", desc: "Конструкторы сайтов и интернет-платформ", icon: "hammer" },
            { id: "frontend", label: "Frontend Only", desc: "Клиентская часть (React, Vue, Next.js)", icon: "monitor" },
            { id: "backend", label: "Backend / API", desc: "Серверная логика, микросервисы, базы данных", icon: "database" },
            { id: "mobile", label: "Mobile Application", desc: "iOS/Android (React Native, Flutter, Swift)", icon: "smartphone" },
            { id: "desktop", label: "Desktop Application", desc: "Windows/macOS/Linux (Electron, Tauri)", icon: "cpu" },
            { id: "ai_service", label: "AI / ML Service", desc: "LLM интеграции, обработка данных, пайплайны", icon: "brain" },
            { id: "extension", label: "Browser Extension", desc: "Плагины для Chrome/Firefox/Safari", icon: "chrome" },
            { id: "library", label: "Library / Framework", desc: "Модули, пакеты (npm, pip, cargo)", icon: "package" },
            { id: "cli", label: "CLI Tool", desc: "Инструменты командной строки", icon: "terminal" },
            { id: "ecommerce", label: "E-commerce Platform", desc: "Интернет-магазины, платежные системы", icon: "shopping-cart" },
            { id: "gamedev", label: "Game Development", desc: "2D/3D игры, движки", icon: "gamepad-2" },
            { id: "embedded", label: "IoT / Embedded", desc: "Прошивки, интернет вещей", icon: "radio" },
            { id: "other", label: "Другое (свой вариант)", desc: "Опишите ваш проект самостоятельно", icon: "edit-3" }
        ]
    },
    {
        id: 2,
        block: "О проекте",
        title: "Как организован ваш проект?",
        type: "multiple",
        options: [
            { id: "monolith", label: "Classic Monolith", desc: "Единая кодовая база, простота развертывания", icon: "box" },
            { id: "modular_monolith", label: "Modular Monolith", desc: "Строгая изоляция модулей внутри одного репозитория", icon: "layout-grid" },
            { id: "fsd", label: "Feature-Sliced Design (FSD)", desc: "Современный стандарт для масштабируемых Frontend-приложений", icon: "layers" },
            { id: "monorepo", label: "Monorepo", desc: "Множество пакетов в одном репозитории (Turborepo, Nx, Lerna)", icon: "git-branch" },
            { id: "microservices", label: "Microservices", desc: "Распределенная система независимых сервисов", icon: "share-2" },
            { id: "hexagonal", label: "Hexagonal / Clean Architecture", desc: "Domain-Driven Design (DDD) и отделение логики от инфраструктуры", icon: "hexagon" },
            { id: "serverless", label: "Serverless / Event-driven", desc: "Облачные функции и реактивная архитектура", icon: "zap" }
        ]
    },
    {
        id: 3,
        block: "О проекте",
        title: "Какие технологии использует проект?",
        type: "multiple",
        options: [
            // Frontend & UI
            { id: "react", label: "React", desc: "The most popular UI library", icon: "atom" },
            { id: "nextjs", label: "Next.js", desc: "React framework for production", icon: "globe" },
            { id: "vue", label: "Vue.js", desc: "Progressive JS framework", icon: "layout" },
            { id: "svelte", label: "Svelte / SvelteKit", desc: "Cybernetic UI framework", icon: "zap" },
            { id: "astro", label: "Astro", desc: "Static site generator for content", icon: "rocket" },
            { id: "typescript", label: "TypeScript", desc: "Static typing for JavaScript", icon: "code-2" },
            { id: "tailwind", label: "Tailwind CSS", desc: "Utility-first styling", icon: "palette" },
            { id: "framer", label: "Framer Motion", desc: "Advanced animations", icon: "clapperboard" },

            // Backend & Runtimes
            { id: "nodejs", label: "Node.js", desc: "Scalable JS runtime", icon: "server" },
            { id: "python", label: "Python (FastAPI)", desc: "High-performance AI/Web", icon: "snake" },
            { id: "go", label: "Go", desc: "Cloud-native services", icon: "cpu" },
            { id: "rust", label: "Rust", desc: "Memory-safe systems programming", icon: "settings-2" },
            { id: "bun", label: "Bun", desc: "All-in-one JS runtime", icon: "cookie" },
            { id: "java", label: "Java (Spring)", desc: "Enterprise applications", icon: "coffee" },
            { id: "graphql", label: "GraphQL / Apollo", desc: "Flexible API query language", icon: "share-2" },

            // Databases & ORMs
            { id: "postgresql", label: "PostgreSQL", desc: "Advanced relational DB", icon: "database" },
            { id: "mongodb", label: "MongoDB", desc: "NoSQL document store", icon: "file-code" },
            { id: "redis", label: "Redis", desc: "In-memory cache & pub/sub", icon: "zap" },
            { id: "supabase", label: "Supabase", desc: "Open-source Firebase alternative", icon: "bolt" },
            { id: "prisma", label: "Prisma", desc: "Next-gen Node.js/TS ORM", icon: "layers" },
            { id: "drizzle", label: "Drizzle ORM", desc: "TypeScript-first SQL ORM", icon: "droplets" },
            { id: "pinecone", label: "Pinecone", desc: "Vector DB for AI apps", icon: "tree-pine" },

            // Infrastructure & DevOps
            { id: "docker", label: "Docker", desc: "Container orchestration", icon: "ship" },
            { id: "k8s", label: "Kubernetes", desc: "Large-scale management", icon: "network" },
            { id: "terraform", label: "Terraform", desc: "Infrastructure as Code", icon: "mountain" },
            { id: "gh_actions", label: "GitHub Actions", desc: "Automated CI/CD pipelines", icon: "github" },

            // AI & Mobile
            { id: "openai", label: "OpenAI SDK", desc: "LLM integration (GPT-4o/o1)", icon: "brain" },
            { id: "langchain", label: "LangChain", desc: "Framework for AI agents/chains", icon: "link" },
            { id: "pytorch", label: "PyTorch", desc: "Deep learning research", icon: "flame" },
            { id: "react_native", label: "React Native", desc: "Cross-platform mobile apps", icon: "smartphone" },
            { id: "flutter", label: "Flutter", desc: "UI toolkit for multi-platform", icon: "bird" }
        ]
    },
    {
        id: 4,
        block: "О проекте",
        title: "Как вы управляете зависимостями?",
        type: "single",
        options: [
            { id: "npm", label: "npm" },
            { id: "pnpm", label: "pnpm" },
            { id: "yarn", label: "yarn" },
            { id: "bun", label: "bun" },
            { id: "poetry", label: "poetry (Python)" },
            { id: "cargo", label: "cargo (Rust)" },
            { id: "none", label: "Не использую" }
        ]
    },
    {
        id: 5,
        block: "Выбор агентов",
        title: "Какие AI-агенты вам нужны?",
        subtitle: "Выберите тех, кто составит вашу команду",
        type: "multiple",
        options: [
            // Core Development
            { id: "planner", label: "Strategic Planner", desc: "Orchestration, task decomposition & state management", icon: "clipboard-list" },
            { id: "architect", label: "System Architect", desc: "Design patterns & system structure", icon: "layout" },
            { id: "codewriter", label: "Code Writer", desc: "Implementation of new features", icon: "code" },
            { id: "refactorer", label: "Code Refactorer", desc: "Optimization & technical debt cleanup", icon: "zap" },
            { id: "logic_expert", label: "Logic Specialist", desc: "Complex business rules & algorithms", icon: "binary" },

            // Quality & Testing
            { id: "tester", label: "QA Automation", desc: "Unit, E2E, and integration tests", icon: "test-tube" },
            { id: "reviewer", label: "Code Reviewer", desc: "Peer reviews & quality gates", icon: "eye" },
            { id: "bugfixer", label: "Bug Hunter", desc: "Identification & patching of defects", icon: "bug" },
            { id: "performance", label: "Perf Optimizer", desc: "Bottleneck analysis & profiling", icon: "activity" },

            // Security & AI
            { id: "security", label: "Security Auditor", desc: "Vulnerability & dependency auditing", icon: "shield-check" },
            { id: "ai_expert", label: "AI Integrationist", desc: "LLM, RAG & prompt engineering", icon: "brain" },
            { id: "data_engineer", label: "Data Engineer", desc: "Data pipelines & transformations", icon: "database" },

            // Infrastructure & Ops
            { id: "devops", label: "DevOps Engineer", desc: "CI/CD, Docker & Cloud infra", icon: "server" },
            { id: "git_manager", label: "Git Librarian", desc: "Branching, merges & git flow", icon: "git-branch" },
            { id: "release_manager", label: "Release Manager", desc: "Version control & deployments", icon: "package-check" },

            // Documentation & UX
            { id: "documenter", label: "Tech Writer", desc: "Internal & external documentation", icon: "file-text" },
            { id: "ui_specialist", label: "UI/UX Auditor", desc: "Accessibility & layout consistency", icon: "clapperboard" }
        ]
    },
    {
        id: 6, block: "Права", title: "Создание новых файлов", type: "single",
        options: [{ id: "full", label: "Да, свободно" }, { id: "restricted", label: "Да, но в определенных папках" }, { id: "approval", label: "Да, но с подтверждением" }, { id: "none", label: "Нет, только редактирование" }]
    },
    {
        id: 7, block: "Права", title: "Редактирование файлов", type: "single",
        options: [{ id: "any", label: "Да, любые файлы" }, { id: "no_config", label: "Кроме конфигурационных" }, { id: "approval", label: "С подтверждением" }, { id: "read_only", label: "Только чтение" }]
    },
    {
        id: 8, block: "Права", title: "Удаление файлов", type: "single",
        options: [{ id: "full", label: "Да, свободно" }, { id: "temp", label: "Только временные/тесты" }, { id: "approval", label: "Только с подтверждением" }, { id: "never", label: "Нет, никогда" }]
    },
    {
        id: 9, block: "Работа с Git", title: "Могут ли агенты работать с Git?", type: "single",
        options: [{ id: "full", label: "Commits и Push" }, { id: "commit_only", label: "Только Commits" }, { id: "branch_only", label: "Только Branches" }, { id: "manual", label: "Нет, Git только вручную" }]
    },
    {
        id: 10, block: "Ограничения", title: "Какие папки запрещены?", type: "multiple",
        options: [{ id: "env", label: ".env файлы" }, { id: "package", label: "package.json / lock" }, { id: "docker", label: "Docker / CI-CD" }, { id: "db", label: "Базы данных" }, { id: "prod", label: "Production код" }, { id: "node_modules", label: "node_modules" }, { id: "nothing", label: "Всё разрешено" }]
    },
    {
        id: 11, block: "Рабочий процесс", title: "Автономность агентов", type: "single",
        options: [{ id: "high", label: "Полная автономия" }, { id: "medium", label: "Средняя (подтверждение важных)" }, { id: "low", label: "Низкая (я решаю)" }, { id: "advisory", label: "Только советы" }]
    },
    {
        id: 12, block: "Рабочий процесс", title: "Координация агентов", type: "single",
        options: [{ id: "orchestrator", label: "Главный координатор" }, { id: "sequential", label: "По очереди" }, { id: "parallel", label: "Независимо" }, { id: "manual", label: "Вручную" }]
    },
    {
        id: 13, block: "Рабочий процесс", title: "Передача результатов", type: "single",
        options: [{ id: "log", label: "Лог-файл" }, { id: "comments", label: "Комментарии" }, { id: "folder", label: "Отдельная папка" }, { id: "none", label: "Не передают" }]
    },
    {
        id: 14, block: "Рабочий процесс", title: "Конфликты", type: "single",
        options: [{ id: "ask", label: "Спросить меня" }, { id: "last", label: "Последний побеждает" }, { id: "priority", label: "Приоритетный агент" }, { id: "variants", label: "Создать варианты" }]
    },
    {
        id: 15, block: "Стиль кода", title: "Комментарии в коде", type: "single",
        options: [{ id: "detailed", label: "Подробные" }, { id: "complex", label: "Для сложной логики" }, { id: "minimal", label: "Минимальные" }, { id: "none", label: "Без комментариев" }]
    },
    {
        id: 16, block: "Стиль кода", title: "Оптимизация", type: "single",
        options: [{ id: "aggressive", label: "Агрессивная" }, { id: "balanced", label: "Баланс" }, { id: "clean", label: "Акцент на чистоту" }, { id: "none", label: "Не оптимизировать" }]
    },
    {
        id: 17, block: "Приоритеты", title: "Что важнее?", type: "single",
        options: [{ id: "speed", label: "Скорость" }, { id: "quality", label: "Качество" }, { id: "balance", label: "Баланс" }, { id: "best_practices", label: "Best Practices" }]
    },
    {
        id: 18, block: "Стиль кода", title: "Linter/Style", type: "single",
        options: [{ id: "strict", label: "Строго" }, { id: "moderate", label: "Умеренно" }, { id: "flexible", label: "Гибко" }, { id: "none", label: "Нет правил" }]
    },
    {
        id: 19, block: "Доп. настройки", title: "Логирование", type: "single",
        options: [{ id: "verbose", label: "Подробное" }, { id: "important", label: "Только важное" }, { id: "minimal", label: "Минимальное" }, { id: "none", label: "Не нужно" }]
    },
    {
        id: 20, block: "Доп. настройки", title: "Уведомления", type: "multiple",
        options: [{ id: "start", label: "О начале" }, { id: "complete", label: "Об окончании" }, { id: "error", label: "Об ошибках" }, { id: "major", label: "О важных" }, { id: "conflict", label: "О конфликтах" }, { id: "none", label: "Не нужны" }]
    }
];
