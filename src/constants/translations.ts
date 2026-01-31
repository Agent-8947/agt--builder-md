export interface TranslationKeys {
    welcome: {
        title: string;
        subtitle: string;
        start: string;
        mission: string;
    };
    ui: {
        step: string;
        back: string;
        continue: string;
        initialize: string;
        advice: string;
        apply: string;
        recommendation: string;
        idea_placeholder: string;
        custom_label: string;
        custom_placeholder: string;
    };
    blocks: Record<string, string>;
    questions: Record<number, {
        title: string;
        subtitle?: string;
        block?: string;
        options?: Record<string, { label: string; desc?: string }>;
    }>;
}

export const TRANSLATIONS: Record<'en' | 'ru' | 'uk', TranslationKeys> = {
    en: {
        welcome: {
            title: "AI Agents Builder",
            subtitle: "Enterprise-grade autonomous fleet architect",
            start: "Initialize Fleet Construction",
            mission: "Aesthetically superior, technically precise."
        },
        ui: {
            step: "Step",
            back: "Back",
            continue: "Continue",
            initialize: "Initialize",
            advice: "Advice",
            apply: "Apply Choice",
            recommendation: "Recommendation",
            idea_placeholder: "Project essence, core functionality, target audience...",
            custom_label: "Describe your project",
            custom_placeholder: "e.g., SaaS platform for logistics management..."
        },
        blocks: {
            mission: "Mission",
            project: "Project",
            agents: "Agents",
            permissions: "Permissions",
            constraints: "Constraints",
            workflow: "Workflow",
            style: "Style",
            priorities: "Priorities",
            settings: "Settings"
        },
        questions: {
            0: { title: "Describe project idea", subtitle: "This fundamental context defines all agent behaviors", block: "Mission" },
            1: {
                title: "What are you developing?", block: "About Project",
                options: {
                    web_full: { label: "Fullstack Web App", desc: "Complete solution (frontend + backend + db)" },
                    saas: { label: "SaaS Platform", desc: "Multi-user subscription service" },
                    nocode_builder: { label: "No-code Builder", desc: "Website and platform constructors" },
                    frontend: { label: "Frontend Only", desc: "Client side (React, Vue, Next.js)" },
                    backend: { label: "Backend / API", desc: "Server logic, microservices, databases" },
                    mobile: { label: "Mobile Application", desc: "iOS/Android (React Native, Flutter, Swift)" },
                    desktop: { label: "Desktop Application", desc: "Windows/macOS/Linux (Electron, Tauri)" },
                    ai_service: { label: "AI / ML Service", desc: "LLM integration, data processing, pipelines" },
                    extension: { label: "Browser Extension", desc: "Plugins for Chrome/Firefox/Safari" },
                    library: { label: "Library / Framework", desc: "Modules, packages (npm, pip, cargo)" },
                    cli: { label: "CLI Tool", desc: "Command line tools" },
                    ecommerce: { label: "E-commerce Platform", desc: "Online stores, payment systems" },
                    gamedev: { label: "Game Development", desc: "2D/3D games, engines" },
                    embedded: { label: "IoT / Embedded", desc: "Firmware, Internet of Things" },
                    other: { label: "Other (custom)", desc: "Describe your project manually" }
                }
            },
            2: {
                title: "Project organization?", block: "About Project",
                options: {
                    monolith: { label: "Classic Monolith", desc: "Single codebase, simple deployment" },
                    modular_monolith: { label: "Modular Monolith", desc: "Strict module isolation in one repo" },
                    fsd: { label: "Feature-Sliced Design (FSD)", desc: "Modern standard for scalable Frontend" },
                    monorepo: { label: "Monorepo", desc: "Multiple packages in one repo (Turborepo, Nx)" },
                    microservices: { label: "Microservices", desc: "Distributed system of independent services" },
                    microfrontends: { label: "Micro-frontends", desc: "Independent frontend apps in one shell" },
                    hexagonal: { label: "Hexagonal / Clean", desc: "DDD and isolation of logic from infra" },
                    serverless: { label: "Serverless / Event-driven", desc: "Cloud functions and reactive arch" },
                    edge_computing: { label: "Edge Computing", desc: "Workers and functions at the network edge" },
                    jamstack: { label: "JAMstack", desc: "JavaScript, APIs, and Pre-rendered Markup" },
                    multi_tenant: { label: "Multi-tenant SaaS", desc: "Data isolation for multiple organizations" },
                    offline_first: { label: "Offline-first / PWA", desc: "Local-first data with sync (CRDTs)" }
                }
            },
            3: {
                title: "Tech stack?", block: "About Project",
                options: {
                    framer_motion: { label: "Framer Motion", desc: "Advanced UI animations" },
                    threejs: { label: "Three.js", desc: "3D graphics for web" },
                    gsap: { label: "GSAP", desc: "Professional motion design" },
                    figma_api: { label: "Figma API", desc: "Design-to-code automation" },
                    crawl4ai: { label: "Crawl4AI", desc: "Agent-ready web scraping" },
                    puppeteer: { label: "Puppeteer", desc: "Headless browser automation" },
                    pandas: { label: "Pandas/NumPy", desc: "Data analysis & processing" },
                    elastic: { label: "Elasticsearch", desc: "Full-text search engine" },
                    aws: { label: "AWS", desc: "Enterprise cloud services" },
                    gcp: { label: "Google Cloud", desc: "AI & Data analytics platform" },
                    azure: { label: "Azure", desc: "Microsoft cloud solutions" },
                    kubernetes: { label: "Kubernetes", desc: "Container orchestration" }
                }
            },
            4: {
                title: "Dependency management?", block: "About Project",
                options: {
                    none: { label: "Not using" }
                }
            },
            5: {
                title: "Select AI Agents", block: "Agent Team", subtitle: "Select units for your autonomous fleet",
                options: {
                    planner: { label: "Strategic Planner", desc: "Orchestration, task decomposition & state management" },
                    architect: { label: "System Architect", desc: "Design patterns & system structure" },
                    codewriter: { label: "Code Writer", desc: "Implementation of new features" },
                    refactorer: { label: "Code Refactorer", desc: "Optimization & technical debt cleanup" },
                    logic_expert: { label: "Logic Specialist", desc: "Complex business rules & algorithms" },
                    tester: { label: "QA Automation", desc: "Unit, E2E, and integration tests" },
                    reviewer: { label: "Code Reviewer", desc: "Peer reviews & quality gates" },
                    bugfixer: { label: "Bug Hunter", desc: "Identification & patching of defects" },
                    performance: { label: "Perf Optimizer", desc: "Bottleneck analysis & profiling" },
                    security: { label: "Security Auditor", desc: "Vulnerability & dependency auditing" },
                    ai_expert: { label: "AI Integrationist", desc: "LLM, RAG & prompt engineering" },
                    data_engineer: { label: "Data Engineer", desc: "Data pipelines & transformations" },
                    devops: { label: "DevOps Engineer", desc: "CI/CD, Docker & Cloud infra" },
                    git_manager: { label: "Git Librarian", desc: "Branching, merges & git flow" },
                    release_manager: { label: "Release Manager", desc: "Version control & deployments" },
                    documenter: { label: "Tech Writer", desc: "Internal & external documentation" },
                    ui_specialist: { label: "UI/UX Auditor", desc: "Accessibility & layout consistency" },
                    scout: { label: "Web Scout", desc: "Web scraping and deep data collection" },
                    analyst: { label: "Data Analyst", desc: "Data structuring and preparation of findings" },
                    integrator: { label: "Cloud Integrator", desc: "Integration with Google Drive, Notion, Slack" },
                    forecaster: { label: "Predictive Forecaster", desc: "Trend identification and risk modeling" },
                    council: { label: "Agentic Council", desc: "Multi-persona discussion and consensus" },
                    deep_researcher: { label: "Deep Researcher", desc: "Academic and market research" },
                    debugger_pro: { label: "Forensic Debugger", desc: "Memory leaks and stack trace analysis" },
                    visual_designer: { label: "Visual Designer", desc: "Aesthetic interfaces and typography" },
                    motion_designer: { label: "Motion Architect", desc: "Complex animations and interactions" },
                    creative_director: { label: "Creative Director", desc: "Visual concept and WOW-effects" },
                    copywriter: { label: "Content Strategist", desc: "UX Writing and brand voice" }
                }
            },
            6: {
                title: "FS Create permission?", block: "Permissions",
                options: {
                    full: { label: "Yes, freely" },
                    restricted: { label: "Yes, in specific folders" },
                    approval: { label: "Yes, but with approval" },
                    none: { label: "No, read-only" }
                }
            },
            7: {
                title: "FS Edit permission?", block: "Permissions",
                options: {
                    any: { label: "Yes, any files" },
                    no_config: { label: "Except configuration files" },
                    approval: { label: "With approval" },
                    read_only: { label: "Read only" }
                }
            },
            8: {
                title: "FS Delete permission?", block: "Permissions",
                options: {
                    full: { label: "Yes, freely" },
                    temp: { label: "Only temporary/tests" },
                    approval: { label: "Only with approval" },
                    never: { label: "No, never" }
                }
            },
            9: {
                title: "VCS Commit permission?", block: "Permissions",
                options: {
                    full: { label: "Commits and Push" },
                    commit_only: { label: "Commits only" },
                    branch_only: { label: "Branches only" },
                    manual: { label: "No, manual Git" }
                }
            },
            10: {
                title: "Forbidden paths?", block: "Constraints",
                options: {
                    env: { label: ".env files" },
                    package: { label: "package.json / lock" },
                    docker: { label: "Docker / CI-CD" },
                    db: { label: "Databases" },
                    prod: { label: "Production code" },
                    node_modules: { label: "node_modules" },
                    nothing: { label: "Everything allowed" }
                }
            },
            11: {
                title: "Autonomy level?", block: "Workflow",
                options: {
                    high: { label: "Full autonomy" },
                    medium: { label: "Medium (confirm major)" },
                    low: { label: "Low (I decide)" },
                    advisory: { label: "Advisory only" }
                }
            },
            12: {
                title: "System topology?", block: "Workflow",
                options: {
                    orchestrator: { label: "Main Orchestrator" },
                    sequential: { label: "Sequential" },
                    parallel: { label: "Independent" },
                    manual: { label: "Manual" }
                }
            },
            13: {
                title: "State sync method?", block: "Workflow",
                options: {
                    log: { label: "Log file" },
                    comments: { label: "Comments" },
                    folder: { label: "Separate folder" },
                    none: { label: "No sync" }
                }
            },
            14: {
                title: "Conflict policy?", block: "Workflow",
                options: {
                    ask: { label: "Ask me" },
                    last: { label: "Last wins" },
                    priority: { label: "Priority agent" },
                    variants: { label: "Create variants" }
                }
            },
            15: {
                title: "Documentation level?", block: "Style",
                options: {
                    detailed: { label: "Detailed" },
                    complex: { label: "For complex logic" },
                    minimal: { label: "Minimal" },
                    none: { label: "No comments" }
                }
            },
            16: {
                title: "Optimization focus?", block: "Priorities",
                options: {
                    aggressive: { label: "Aggressive" },
                    balanced: { label: "Balanced" },
                    clean: { label: "Focus on clarity" },
                    none: { label: "Do not optimize" }
                }
            },
            17: {
                title: "Core system priority?", block: "Priorities",
                options: {
                    speed: { label: "Speed" },
                    quality: { label: "Quality" },
                    balance: { label: "Balance" },
                    best_practices: { label: "Best Practices" }
                }
            },
            18: {
                title: "Coding style?", block: "Style",
                options: {
                    strict: { label: "Strict" },
                    moderate: { label: "Moderate" },
                    flexible: { label: "Flexible" },
                    none: { label: "No rules" }
                }
            },
            19: {
                title: "Log level?", block: "Settings",
                options: {
                    verbose: { label: "Verbose" },
                    important: { label: "Important only" },
                    minimal: { label: "Minimal" },
                    none: { label: "Disabled" }
                }
            },
            20: {
                title: "Telemetry?", block: "Settings",
                options: {
                    start: { label: "On start" },
                    complete: { label: "On finish" },
                    error: { label: "On errors" },
                    major: { label: "On major" },
                    conflict: { label: "On conflicts" },
                    none: { label: "None" }
                }
            }
        }
    },
    ru: {
        welcome: {
            title: "AI Agents Builder",
            subtitle: "Архитектор автономных систем корпоративного уровня",
            start: "Начать сборку флота",
            mission: "Эстетически безупречно, технически точно."
        },
        ui: {
            step: "Шаг",
            back: "Назад",
            continue: "Далее",
            initialize: "Завершить",
            advice: "Совет",
            apply: "Применить",
            recommendation: "Рекомендация",
            idea_placeholder: "Суть идеи, основной функционал, целевая аудитория...",
            custom_label: "Опишите ваш проект",
            custom_placeholder: "Например: SaaS платформа для управления логистикой..."
        },
        blocks: {
            mission: "Миссия",
            project: "О проекте",
            agents: "Выбор агентов",
            permissions: "Права",
            constraints: "Ограничения",
            workflow: "Рабочий процесс",
            style: "Стиль кода",
            priorities: "Приоритеты",
            settings: "Настройки"
        },
        questions: {
            0: { title: "Опишите идею проекта", subtitle: "Фундаментальный контекст для поведения всех агентов", block: "Миссия" },
            1: {
                title: "Что вы разрабатываете?", block: "О проекте",
                options: {
                    web_full: { label: "Fullstack Web App", desc: "Комплексное решение (frontend + backend + db)" },
                    saas: { label: "SaaS Platform", desc: "Многопользовательский сервис по подписке" },
                    nocode_builder: { label: "No-code Builder", desc: "Конструкторы сайтов и платформ" },
                    frontend: { label: "Frontend Only", desc: "Клиентская часть (React, Vue, Next.js)" },
                    backend: { label: "Backend / API", desc: "Серверная логика, микросервисы, БД" },
                    mobile: { label: "Mobile Application", desc: "iOS/Android (React Native, Flutter)" },
                    desktop: { label: "Desktop Application", desc: "Windows/macOS/Linux (Electron, Tauri)" },
                    ai_service: { label: "AI / ML Service", desc: "LLM, обработка данных, пайплайны" },
                    extension: { label: "Browser Extension", desc: "Плагины для Chrome/Firefox" },
                    library: { label: "Library / Framework", desc: "Модули, пакеты (npm, pip, cargo)" },
                    cli: { label: "CLI Tool", desc: "Инструменты командной строки" },
                    ecommerce: { label: "E-commerce Platform", desc: "Магазины, платежные системы" },
                    gamedev: { label: "Game Development", desc: "2D/3D игры, движки" },
                    embedded: { label: "IoT / Embedded", desc: "Прошивки, интернет вещей" },
                    other: { label: "Другое (свой вариант)", desc: "Опишите ваш проект самостоятельно" }
                }
            },
            2: {
                title: "Организация проекта?", block: "О проекте",
                options: {
                    monolith: { label: "Классический монолит", desc: "Единая кодовая база" },
                    modular_monolith: { label: "Модульный монолит", desc: "Изоляция модулей в одном репозитории" },
                    fsd: { label: "Feature-Sliced Design (FSD)", desc: "Стандарт для масштабируемого Frontend" },
                    monorepo: { label: "Монорепозиторий", desc: "Множество пакетов в одном репозитории (Turborepo, Nx)" },
                    microservices: { label: "Микросервисы", desc: "Распределенная система сервисов" },
                    microfrontends: { label: "Микро-фронтенды", desc: "Независимые фронтенд-приложения в одной оболочке" },
                    hexagonal: { label: "Hexagonal / Clean", desc: "DDD и разделение логики и инфраструктуры" },
                    serverless: { label: "Serverless / Event-driven", desc: "Облачные функции и реактивная архитектура" },
                    edge_computing: { label: "Edge Computing", desc: "Воркеры и функции на границе сети" },
                    jamstack: { label: "JAMstack", desc: "JavaScript, APIs и предрендеренный Markdown" },
                    multi_tenant: { label: "Multi-tenant SaaS", desc: "Изоляция данных для множества организаций" },
                    offline_first: { label: "Offline-first / PWA", desc: "Локальное хранение с синхронизацией (CRDTs)" }
                }
            },
            3: {
                title: "Технологический стек?", block: "О проекте",
                options: {
                    framer_motion: { label: "Framer Motion", desc: "Продвинутая анимация интерфейса" },
                    threejs: { label: "Three.js", desc: "3D графика для веба" },
                    gsap: { label: "GSAP", desc: "Профессиональный motion дизайн" },
                    figma_api: { label: "Figma API", desc: "Автоматизация дизайна в код" },
                    crawl4ai: { label: "Crawl4AI", desc: "Веб-скрапинг для AI-агентов" },
                    puppeteer: { label: "Puppeteer", desc: "Автоматизация браузера" },
                    pandas: { label: "Pandas/NumPy", desc: "Анализ и обработка данных" },
                    elastic: { label: "Elasticsearch", desc: "Поисковый движок" },
                    aws: { label: "AWS", desc: "Облачные сервисы Enterprise уровня" },
                    gcp: { label: "Google Cloud", desc: "Платформа для AI и аналитики" },
                    azure: { label: "Azure", desc: "Облачные решения Microsoft" },
                    kubernetes: { label: "Kubernetes", desc: "Оркестрация контейнеров" }
                }
            },
            4: {
                title: "Управление зависимостями?", block: "О проекте",
                options: {
                    none: { label: "Не использую" }
                }
            },
            5: {
                title: "Выберите AI-агентов", block: "Команда", subtitle: "Выберите юнитов для вашего флота",
                options: {
                    planner: { label: "Strategic Planner", desc: "Оркестрация, декомпозиция задач и управление состоянием" },
                    architect: { label: "System Architect", desc: "Паттерны проектирования и структура системы" },
                    codewriter: { label: "Code Writer", desc: "Имплементация новых функций" },
                    refactorer: { label: "Code Refactorer", desc: "Оптимизация и очистка технического долга" },
                    logic_expert: { label: "Logic Specialist", desc: "Сложные бизнес-правила и алгоритмы" },
                    tester: { label: "QA Automation", desc: "Unit, E2E и интеграционные тесты" },
                    reviewer: { label: "Code Reviewer", desc: "Peer reviews и ворота качества" },
                    bugfixer: { label: "Bug Hunter", desc: "Идентификация и исправление дефектов" },
                    performance: { label: "Perf Optimizer", desc: "Анализ узких мест и профилирование" },
                    security: { label: "Security Auditor", desc: "Аудит уязвимостей и зависимостей" },
                    ai_expert: { label: "AI Integrationist", desc: "LLM, RAG и промпт-инжиниринг" },
                    data_engineer: { label: "Data Engineer", desc: "Пайплайны данных и трансформации" },
                    devops: { label: "DevOps Engineer", desc: "CI/CD, Docker и облачная инфраструктура" },
                    git_manager: { label: "Git Librarian", desc: "Ветвление, слияния и git flow" },
                    release_manager: { label: "Release Manager", desc: "Контроль версий и деплой" },
                    documenter: { label: "Tech Writer", desc: "Внутренняя и внешняя документация" },
                    ui_specialist: { label: "UI/UX Auditor", desc: "Доступность и консистентность лейаута" },
                    scout: { label: "Web Scout", desc: "Веб-скрапинг и глубокий сбор данных" },
                    analyst: { label: "Data Analyst", desc: "Структурирование данных и подготовка выводов" },
                    integrator: { label: "Cloud Integrator", desc: "Интеграция с Google Drive, Notion, Slack" },
                    forecaster: { label: "Predictive Forecaster", desc: "Прогнозирование трендов и моделирование рисков" },
                    council: { label: "Agentic Council", desc: "Консилиум агентов и поиск консенсуса" },
                    deep_researcher: { label: "Deep Researcher", desc: "Академические и рыночные исследования" },
                    debugger_pro: { label: "Forensic Debugger", desc: "Анализ утечек памяти и трассировка стека" },
                    visual_designer: { label: "Visual Designer", desc: "Эстетичные интерфейсы и типографика" },
                    motion_designer: { label: "Motion Architect", desc: "Сложные анимации и взаимодействия" },
                    creative_director: { label: "Creative Director", desc: "Визуальная концепция и WOW-эффекты" },
                    copywriter: { label: "Content Strategist", desc: "UX Writing и голос бренда" }
                }
            },
            6: {
                title: "Права на создание?", block: "Права",
                options: {
                    full: { label: "Да, свободно" },
                    restricted: { label: "Да, в определенных папках" },
                    approval: { label: "Да, с подтверждением" },
                    none: { label: "Нет, только чтение" }
                }
            },
            7: {
                title: "Права на редактирование?", block: "Права",
                options: {
                    any: { label: "Да, любые файлы" },
                    no_config: { label: "Кроме конфигурационных" },
                    approval: { label: "С подтверждением" },
                    read_only: { label: "Только чтение" }
                }
            },
            8: {
                title: "Права на удаление?", block: "Права",
                options: {
                    full: { label: "Да, свободно" },
                    temp: { label: "Только временные/тесты" },
                    approval: { label: "С подтверждением" },
                    never: { label: "Нет, никогда" }
                }
            },
            9: {
                title: "Права на коммиты?", block: "Права",
                options: {
                    full: { label: "Commits и Push" },
                    commit_only: { label: "Только Commits" },
                    branch_only: { label: "Только Branches" },
                    manual: { label: "Git только вручную" }
                }
            },
            10: {
                title: "Запрещенные пути?", block: "Ограничения",
                options: {
                    env: { label: ".env файлы" },
                    package: { label: "package.json / lock" },
                    docker: { label: "Docker / CI-CD" },
                    db: { label: "Базы данных" },
                    prod: { label: "Production код" },
                    node_modules: { label: "node_modules" },
                    nothing: { label: "Всё разрешено" }
                }
            },
            11: {
                title: "Уровень автономии?", block: "Процесс",
                options: {
                    high: { label: "Полная автономия" },
                    medium: { label: "Средняя (подтверждение важных)" },
                    low: { label: "Низкая (я решаю)" },
                    advisory: { label: "Только советы" }
                }
            },
            12: {
                title: "Топология системы?", block: "Процесс",
                options: {
                    orchestrator: { label: "Главный координатор" },
                    sequential: { label: "По очереди" },
                    parallel: { label: "Независимо" },
                    manual: { label: "Вручную" }
                }
            },
            13: {
                title: "Метод синхронизации?", block: "Процесс",
                options: {
                    log: { label: "Лог-файл" },
                    comments: { label: "Комментарии" },
                    folder: { label: "Отдельная папка" },
                    none: { label: "Не передают" }
                }
            },
            14: {
                title: "Политика конфликтов?", block: "Процесс",
                options: {
                    ask: { label: "Спросить меня" },
                    last: { label: "Последний побеждает" },
                    priority: { label: "Приоритетный агент" },
                    variants: { label: "Создать варианты" }
                }
            },
            15: {
                title: "Уровень документации?", block: "Стиль",
                options: {
                    detailed: { label: "Подробные" },
                    complex: { label: "Для сложной логики" },
                    minimal: { label: "Минимальные" },
                    none: { label: "Без комментариев" }
                }
            },
            16: {
                title: "Фокус оптимизации?", block: "Приоритеты",
                options: {
                    aggressive: { label: "Агрессивная" },
                    balanced: { label: "Баланс" },
                    clean: { label: "Чистота кода" },
                    none: { label: "Не оптимизировать" }
                }
            },
            17: {
                title: "Главный приоритет?", block: "Приоритеты",
                options: {
                    speed: { label: "Скорость" },
                    quality: { label: "Качество" },
                    balance: { label: "Баланс" },
                    best_practices: { label: "Best Practices" }
                }
            },
            18: {
                title: "Стиль кода?", block: "Стиль",
                options: {
                    strict: { label: "Строго" },
                    moderate: { label: "Умеренно" },
                    flexible: { label: "Гибко" },
                    none: { label: "Нет правил" }
                }
            },
            19: {
                title: "Уровень логов?", block: "Настройки",
                options: {
                    verbose: { label: "Подробное" },
                    important: { label: "Только важное" },
                    minimal: { label: "Минимальное" },
                    none: { label: "Выключено" }
                }
            },
            20: {
                title: "Телеметрия?", block: "Настройки",
                options: {
                    start: { label: "О начале" },
                    complete: { label: "Об окончании" },
                    error: { label: "Об ошибках" },
                    major: { label: "О важных" },
                    conflict: { label: "О конфликтах" },
                    none: { label: "Выключено" }
                }
            }
        }
    },
    uk: {
        welcome: {
            title: "AI Agents Builder",
            subtitle: "Архітектор автономних систем корпоративного рівня",
            start: "Почати збірку флоту",
            mission: "Естетично бездоганно, технічно точно."
        },
        ui: {
            step: "Крок",
            back: "Назад",
            continue: "Далі",
            initialize: "Завершити",
            advice: "Порада",
            apply: "Застосувати",
            recommendation: "Рекомендація",
            idea_placeholder: "Суть ідеї, основний функціонал, цільова аудиторія...",
            custom_label: "Опишіть ваш проект",
            custom_placeholder: "Наприклад: SaaS платформа для управління логістикою..."
        },
        blocks: {
            mission: "Місія",
            project: "Про проєкт",
            agents: "Вибір агентів",
            permissions: "Права",
            constraints: "Обмеження",
            workflow: "Робочий процесс",
            style: "Стиль коду",
            priorities: "Пріоритети",
            settings: "Налаштування"
        },
        questions: {
            0: { title: "Опишіть ідею проєкту", subtitle: "Фундаментальний контекст для поведінки всіх агентів", block: "Місія" },
            1: {
                title: "Що ви розробляєте?", block: "Про проєкт",
                options: {
                    web_full: { label: "Fullstack Web App", desc: "Комплексне рішення (frontend + backend + db)" },
                    saas: { label: "SaaS Platform", desc: "Багатокористувацький сервіс за підпискою" },
                    nocode_builder: { label: "No-code Builder", desc: "Конструктори сайтів та платформ" },
                    frontend: { label: "Frontend Only", desc: "Клієнтська частина (React, Vue, Next.js)" },
                    backend: { label: "Backend / API", desc: "Серверна логіка, мікросервіси, БД" },
                    mobile: { label: "Mobile Application", desc: "iOS/Android (React Native, Flutter)" },
                    desktop: { label: "Desktop Application", desc: "Windows/macOS/Linux (Electron, Tauri)" },
                    ai_service: { label: "AI / ML Service", desc: "LLM, обробка даних, пайплайни" },
                    extension: { label: "Browser Extension", desc: "Плагіни для Chrome/Firefox" },
                    library: { label: "Library / Framework", desc: "Модулі, пакети (npm, pip, cargo)" },
                    cli: { label: "CLI Tool", desc: "Інструменти командного рядка" },
                    ecommerce: { label: "E-commerce Platform", desc: "Магазини, платіжні системи" },
                    gamedev: { label: "Game Development", desc: "2D/3D ігри, движки" },
                    embedded: { label: "IoT / Embedded", desc: "Прошивки, інтернет речей" },
                    other: { label: "Інше (свій варіант)", desc: "Опишіть ваш проект самостійно" }
                }
            },
            2: {
                title: "Організація проєкту?", block: "Про проєкт",
                options: {
                    monolith: { label: "Класичний моноліт", desc: "Єдина кодова база" },
                    modular_monolith: { label: "Модульний моноліт", desc: "Ізоляція модулів в одному репозиторії" },
                    fsd: { label: "Feature-Sliced Design (FSD)", desc: "Стандарт для великих Frontend додатків" },
                    monorepo: { label: "Монорепозиторій", desc: "Багато пакетів в одному репозиторії (Turborepo, Nx)" },
                    microservices: { label: "Мікросервіси", desc: "Розподілена система незалежних сервісів" },
                    microfrontends: { label: "Мікро-фронтенди", desc: "Незалежні фронтенд-додатки в одній оболонці" },
                    hexagonal: { label: "Hexagonal / Clean", desc: "DDD та відокремлення логіки від інфраструктури" },
                    serverless: { label: "Serverless / Event-driven", desc: "Хмарні функції та реактивна архітектура" },
                    edge_computing: { label: "Edge Computing", desc: "Воркери та функції на межі мережі" },
                    jamstack: { label: "JAMstack", desc: "JavaScript, APIs та предрендерений Markdown" },
                    multi_tenant: { label: "Multi-tenant SaaS", desc: "Ізоляція даних для багатьох організацій" },
                    offline_first: { label: "Offline-first / PWA", desc: "Локальне зберігання з синхронізацією (CRDTs)" }
                }
            },
            3: {
                title: "Технологічний стек?", block: "Про проєкт",
                options: {
                    framer_motion: { label: "Framer Motion", desc: "Просунута анімація інтерфейсу" },
                    threejs: { label: "Three.js", desc: "3D графіка для вебу" },
                    gsap: { label: "GSAP", desc: "Професійний motion дизайн" },
                    figma_api: { label: "Figma API", desc: "Автоматизація дизайну в код" },
                    crawl4ai: { label: "Crawl4AI", desc: "Веб-скрапінг для AI-агентів" },
                    puppeteer: { label: "Puppeteer", desc: "Автоматизація браузера" },
                    pandas: { label: "Pandas/NumPy", desc: "Аналіз та обробка даних" },
                    elastic: { label: "Elasticsearch", desc: "Пошуковий движок" },
                    aws: { label: "AWS", desc: "Хмарні сервіси Enterprise рівня" },
                    gcp: { label: "Google Cloud", desc: "Платформа для AI та аналітики" },
                    azure: { label: "Azure", desc: "Хмарні рішення Microsoft" },
                    kubernetes: { label: "Kubernetes", desc: "Оркестрація контейнерів" }
                }
            },
            4: {
                title: "Управління залежностями?", block: "Про проєкт",
                options: {
                    none: { label: "Не використовую" }
                }
            },
            5: {
                title: "Оберіть AI-агентів", block: "Команда", subtitle: "Оберіть юнітів для вашого флоту",
                options: {
                    planner: { label: "Strategic Planner", desc: "Оркестрація, декомпозиція задач та управління станом" },
                    architect: { label: "System Architect", desc: "Патерни проектування та структура системи" },
                    codewriter: { label: "Code Writer", desc: "Імплементація нових функцій" },
                    refactorer: { label: "Code Refactorer", desc: "Оптимізація та очищення технічного боргу" },
                    logic_expert: { label: "Logic Specialist", desc: "Складні бізнес-правила та алгоритми" },
                    tester: { label: "QA Automation", desc: "Unit, E2E та інтеграційні тести" },
                    reviewer: { label: "Code Reviewer", desc: "Peer reviews та ворота якості" },
                    bugfixer: { label: "Bug Hunter", desc: "Ідентифікація та виправлення дефектів" },
                    performance: { label: "Perf Optimizer", desc: "Аналіз вузьких місць та профілювання" },
                    security: { label: "Security Auditor", desc: "Аудит вразливостей та залежностей" },
                    ai_expert: { label: "AI Integrationist", desc: "LLM, RAG та промпт-інжиніринг" },
                    data_engineer: { label: "Data Engineer", desc: "Пайплайни даних та трансформації" },
                    devops: { label: "DevOps Engineer", desc: "CI/CD, Docker та хмарна інфраструктура" },
                    git_manager: { label: "Git Librarian", desc: "Гілкування, злиття та git flow" },
                    release_manager: { label: "Release Manager", desc: "Контроль версій та деплой" },
                    documenter: { label: "Tech Writer", desc: "Внутрішня та зовнішня документація" },
                    ui_specialist: { label: "UI/UX Auditor", desc: "Доступність та консистентність верстки" },
                    scout: { label: "Web Scout", desc: "Веб-скрапінг та глибокий збір даних" },
                    analyst: { label: "Data Analyst", desc: "Структурування даних та підготовка висновків" },
                    integrator: { label: "Cloud Integrator", desc: "Інтеграція з Google Drive, Notion, Slack" },
                    forecaster: { label: "Predictive Forecaster", desc: "Прогнозування трендів та моделювання ризиків" },
                    council: { label: "Agentic Council", desc: "Консиліум агентів та пошук консенсусу" },
                    deep_researcher: { label: "Deep Researcher", desc: "Академічні та ринкові дослідження" },
                    debugger_pro: { label: "Forensic Debugger", desc: "Аналіз витоків пам'яті та трасування стеку" },
                    visual_designer: { label: "Visual Designer", desc: "Естетичні інтерфейси та типографіка" },
                    motion_designer: { label: "Motion Architect", desc: "Складні анімації та взаємодії" },
                    creative_director: { label: "Creative Director", desc: "Візуальна концепція та WOW-ефекти" },
                    copywriter: { label: "Content Strategist", desc: "UX Writing та голос бренду" }
                }
            },
            6: {
                title: "Права на створення?", block: "Права",
                options: {
                    full: { label: "Так, вільно" },
                    restricted: { label: "Так, у певних папках" },
                    approval: { label: "Так, з підтвердженням" },
                    none: { label: "Ні, тільки читання" }
                }
            },
            7: {
                title: "Права на редагування?", block: "Права",
                options: {
                    any: { label: "Так, будь-які файли" },
                    no_config: { label: "Окрім конфігураційних" },
                    approval: { label: "З підтвердженням" },
                    read_only: { label: "Тільки читання" }
                }
            },
            8: {
                title: "Права на видалення?", block: "Права",
                options: {
                    full: { label: "Так, вільно" },
                    temp: { label: "Тільки тимчасові/тести" },
                    approval: { label: "З підтвердженням" },
                    never: { label: "Ні, ніколи" }
                }
            },
            9: {
                title: "Права на коміти?", block: "Права",
                options: {
                    full: { label: "Commits та Push" },
                    commit_only: { label: "Тільки Commits" },
                    branch_only: { label: "Тільки Branches" },
                    manual: { label: "Git тільки вручну" }
                }
            },
            10: {
                title: "Заборонені шляхи?", block: "Обмеження",
                options: {
                    env: { label: ".env файли" },
                    package: { label: "package.json / lock" },
                    docker: { label: "Docker / CI-CD" },
                    db: { label: "Бази даних" },
                    prod: { label: "Production код" },
                    node_modules: { label: "node_modules" },
                    nothing: { label: "Все дозволено" }
                }
            },
            11: {
                title: "Рівень автономії?", block: "Процес",
                options: {
                    high: { label: "Повна автономія" },
                    medium: { label: "Середня (підтвердження важливих)" },
                    low: { label: "Низька (я вирішую)" },
                    advisory: { label: "Тільки поради" }
                }
            },
            12: {
                title: "Топологія системи?", block: "Процес",
                options: {
                    orchestrator: { label: "Головний координатор" },
                    sequential: { label: "По черзі" },
                    parallel: { label: "Незалежно" },
                    manual: { label: "Вручну" }
                }
            },
            13: {
                title: "Метод синхронізації?", block: "Процес",
                options: {
                    log: { label: "Лог-файл" },
                    comments: { label: "Коментарі" },
                    folder: { label: "Окрема папка" },
                    none: { label: "Не передають" }
                }
            },
            14: {
                title: "Політика конфліктів?", block: "Процес",
                options: {
                    ask: { label: "Запитати мене" },
                    last: { label: "Останній перемагає" },
                    priority: { label: "Пріоритетний агент" },
                    variants: { label: "Створити варіанти" }
                }
            },
            15: {
                title: "Рівень документації?", block: "Стиль",
                options: {
                    detailed: { label: "Докладні" },
                    complex: { label: "Для складної логіки" },
                    minimal: { label: "Мінімальні" },
                    none: { label: "Без коментарів" }
                }
            },
            16: {
                title: "Фокус оптимізації?", block: "Пріоритети",
                options: {
                    aggressive: { label: "Агресивна" },
                    balanced: { label: "Баланс" },
                    clean: { label: "Чистота коду" },
                    none: { label: "Не оптимізувати" }
                }
            },
            17: {
                title: "Головний пріоритет?", block: "Пріоритети",
                options: {
                    speed: { label: "Швидкість" },
                    quality: { label: "Якість" },
                    balance: { label: "Баланс" },
                    best_practices: { label: "Best Practices" }
                }
            },
            18: {
                title: "Стиль коду?", block: "Стиль",
                options: {
                    strict: { label: "Суворо" },
                    moderate: { label: "Помірно" },
                    flexible: { label: "Гнучко" },
                    none: { label: "Немає правил" }
                }
            },
            19: {
                title: "Рівень логів?", block: "Налаштування",
                options: {
                    verbose: { label: "Докладне" },
                    important: { label: "Тільки важливе" },
                    minimal: { label: "Мінімальне" },
                    none: { label: "Вимкнено" }
                }
            },
            20: {
                title: "Телеметрія?", block: "Налаштування",
                options: {
                    start: { label: "Про початок" },
                    complete: { label: "Про закінчення" },
                    error: { label: "Про помилки" },
                    major: { label: "Про важливі" },
                    conflict: { label: "Про конфлікти" },
                    none: { label: "Вимкнено" }
                }
            }
        }
    }
};
