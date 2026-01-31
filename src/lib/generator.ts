import { QUESTIONS } from "@/constants/questions";

// Agent-specific code examples and guidelines
const AGENT_TEMPLATES: Record<string, {
    examples: string;
    guidelines: string[];
    commands?: string[];
}> = {
    planner: {
        examples: `
\`\`\`markdown
# Task Decomposition Example
## User Request: "Add user authentication"

### Decomposed Steps:
1. [ ] Design auth schema (architect)
2. [ ] Create User model (codewriter)
3. [ ] Implement JWT middleware (codewriter)
4. [ ] Add login/register routes (codewriter)
5. [ ] Write auth tests (tester)
6. [ ] Update API docs (documenter)
\`\`\``,
        guidelines: [
            "Break complex tasks into atomic, testable steps",
            "Assign each step to the most appropriate agent",
            "Update `.agent/state.json` after each decision",
            "Validate completion before marking done"
        ]
    },
    architect: {
        examples: `
\`\`\`typescript
// ✅ Good: Clear separation of concerns
src/
├── features/
│   └── auth/
│       ├── components/    // UI components
│       ├── hooks/         // React hooks
│       ├── api/           // API calls
│       └── types.ts       // TypeScript types
├── shared/
│   ├── ui/               // Reusable UI
│   └── utils/            // Helper functions
└── app/                  // Routes/pages

// ❌ Bad: Mixed concerns
src/
├── components/           // All components mixed
├── utils/               // Everything else
└── types/               // All types together
\`\`\``,
        guidelines: [
            "Follow Feature-Sliced Design (FSD) for scalable structure",
            "Co-locate related files (component + test + styles)",
            "Use barrel exports (index.ts) for clean imports",
            "Document architectural decisions in ADRs"
        ]
    },
    codewriter: {
        examples: `
\`\`\`typescript
// ✅ Good: Type-safe, readable, documented
interface UserCardProps {
  user: User;
  onEdit?: (id: string) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onEdit }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = useCallback(() => {
    onEdit?.(user.id);
  }, [user.id, onEdit]);

  return (
    <div className="rounded-lg border p-4 hover:shadow-md transition-shadow">
      <h3 className="font-semibold text-lg">{user.name}</h3>
      <p className="text-gray-600">{user.email}</p>
      {onEdit && (
        <button onClick={handleEdit} className="mt-2 text-blue-600">
          Edit
        </button>
      )}
    </div>
  );
};

// ❌ Bad: No types, unclear naming, inline styles
const Card = (props) => {
  return <div style={{padding: 10}}>{props.n}</div>
}
\`\`\``,
        guidelines: [
            "Use TypeScript strict mode - no `any` types",
            "One component per file, PascalCase naming",
            "Prefer functional components with hooks",
            "Use Tailwind classes, avoid inline styles"
        ],
        commands: [
            "npm run lint -- --fix",
            "npm run typecheck"
        ]
    },
    reviewer: {
        examples: `
\`\`\`markdown
## Code Review Checklist

### ✅ Must Pass:
- [ ] TypeScript: No \`any\` types, strict mode compliant
- [ ] Security: No secrets in code, proper input validation
- [ ] Performance: No N+1 queries, proper memoization
- [ ] Tests: Unit tests for business logic, E2E for flows

### ⚠️ Recommendations:
- [ ] Consider extracting to custom hook
- [ ] Add error boundary for this component
- [ ] Document complex business logic
\`\`\``,
        guidelines: [
            "Check for security vulnerabilities first",
            "Verify TypeScript types are properly used",
            "Ensure tests cover edge cases",
            "Look for performance anti-patterns"
        ]
    },
    tester: {
        examples: `
\`\`\`typescript
// Unit Test Example
describe('UserService', () => {
  it('should create user with valid data', async () => {
    const userData = { email: 'test@example.com', name: 'Test' };
    const user = await userService.create(userData);
    
    expect(user.id).toBeDefined();
    expect(user.email).toBe(userData.email);
  });

  it('should reject invalid email', async () => {
    const invalidData = { email: 'not-an-email', name: 'Test' };
    
    await expect(userService.create(invalidData))
      .rejects.toThrow('Invalid email format');
  });
});

// E2E Test Example
test('user can complete checkout', async ({ page }) => {
  await page.goto('/products');
  await page.click('[data-testid="add-to-cart"]');
  await page.click('[data-testid="checkout"]');
  await page.fill('#email', 'user@test.com');
  await page.click('button[type="submit"]');
  
  await expect(page.locator('.success-message')).toBeVisible();
});
\`\`\``,
        guidelines: [
            "Write tests before or alongside code (TDD/BDD)",
            "Cover happy path, edge cases, and error states",
            "Use descriptive test names that explain behavior",
            "Mock external dependencies, test real logic"
        ],
        commands: [
            "npm test -- --coverage",
            "npm run test:e2e"
        ]
    },
    documenter: {
        examples: `
\`\`\`typescript
/**
 * Authenticates a user and returns a JWT token.
 * 
 * @param credentials - User login credentials
 * @param credentials.email - User's email address
 * @param credentials.password - User's password (min 8 chars)
 * @returns Promise resolving to auth response with token
 * @throws {AuthError} When credentials are invalid
 * 
 * @example
 * const { token, user } = await authenticate({
 *   email: 'user@example.com',
 *   password: 'securepass123'
 * });
 */
export async function authenticate(credentials: LoginCredentials): Promise<AuthResponse> {
  // Implementation
}
\`\`\``,
        guidelines: [
            "Document public APIs with JSDoc comments",
            "Include usage examples in documentation",
            "Keep README.md updated with setup instructions",
            "Document breaking changes in CHANGELOG.md"
        ]
    },
    security: {
        examples: `
\`\`\`typescript
// ✅ Good: Secure practices
const config = {
  apiKey: process.env.API_KEY,        // From environment
  dbUrl: process.env.DATABASE_URL,    // Never hardcoded
};

// Input validation
const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

// SQL injection prevention
const user = await db.query(
  'SELECT * FROM users WHERE id = $1',  // Parameterized
  [userId]
);

// ❌ Bad: Security vulnerabilities
const config = { apiKey: 'sk-1234567890' };  // Hardcoded secret!
const query = \`SELECT * FROM users WHERE id = '\${userId}'\`;  // SQL injection!
\`\`\``,
        guidelines: [
            "Never commit secrets - use environment variables",
            "Validate and sanitize all user inputs",
            "Use parameterized queries to prevent SQL injection",
            "Implement rate limiting on public endpoints"
        ]
    },
    devops: {
        examples: `
\`\`\`yaml
# docker-compose.yml
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=\${DATABASE_URL}
    depends_on:
      - db

  db:
    image: postgres:15
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=\${DB_PASSWORD}
\`\`\`

\`\`\`bash
# Deployment commands
npm run build          # Build production bundle
npm run start          # Start production server
docker compose up -d   # Start with Docker
\`\`\``,
        guidelines: [
            "Use Docker for consistent environments",
            "Implement CI/CD with GitHub Actions",
            "Set up staging environment before production",
            "Monitor logs and set up alerts"
        ],
        commands: [
            "docker compose up -d",
            "npm run build",
            "npm run start"
        ]
    },
    bugfixer: {
        examples: `
\`\`\`markdown
## Bug Investigation Template

### 1. Reproduce
- Steps to reproduce the issue
- Expected vs actual behavior
- Environment (browser, OS, Node version)

### 2. Diagnose
- Check error logs: \`npm run logs\`
- Add debugging: \`console.log\` or debugger
- Identify root cause

### 3. Fix
- Implement minimal fix
- Add test to prevent regression
- Document the fix

### 4. Verify
- Run full test suite
- Test in staging environment
- Get code review approval
\`\`\``,
        guidelines: [
            "Reproduce issue before attempting fix",
            "Add regression test with the fix",
            "Document root cause in commit message",
            "Verify fix doesn't break other features"
        ]
    }
};

// Tech stack specific commands
const TECH_COMMANDS: Record<string, { dev: string; build: string; test: string; lint: string }> = {
    nextjs: { dev: "npm run dev", build: "npm run build", test: "npm test", lint: "npm run lint" },
    react: { dev: "npm start", build: "npm run build", test: "npm test", lint: "npm run lint" },
    vue: { dev: "npm run dev", build: "npm run build", test: "npm run test:unit", lint: "npm run lint" },
    nodejs: { dev: "npm run dev", build: "npm run build", test: "npm test", lint: "npm run lint" },
    python: { dev: "python -m uvicorn main:app --reload", build: "pip install -r requirements.txt", test: "pytest", lint: "ruff check ." },
    default: { dev: "npm run dev", build: "npm run build", test: "npm test", lint: "npm run lint" }
};

export const compileFiles = (ans: Record<number, string | string[] | undefined>) => {
    const results: Record<string, string> = {};

    // Helper functions
    const getLabel = (questionId: number, idOrLabel: string | undefined): string => {
        if (!idOrLabel || idOrLabel === "NOT_DEFINED") return "";
        const question = QUESTIONS.find(q => q.id === questionId);
        if (!question) return idOrLabel;
        const option = question.options.find(o => o.id === idOrLabel);
        return option ? option.label : idOrLabel;
    };

    const getLabels = (questionId: number, idsOrLabels: string[] | string | undefined): string[] => {
        const items = Array.isArray(idsOrLabels) ? idsOrLabels : (typeof idsOrLabels === 'string' ? [idsOrLabels] : []);
        return items.map(item => getLabel(questionId, item)).filter(Boolean);
    };

    const getString = (id: number, fallback: string = ""): string => {
        const val = ans[id];
        if (Array.isArray(val)) return val.join(' + ');
        return (val as string) || fallback;
    };

    const getArray = (id: number): string[] => {
        const val = ans[id];
        if (Array.isArray(val)) return val;
        if (typeof val === 'string') return [val];
        return [];
    };

    // Extract project data
    const projectMission = getString(0, 'Mission not described');
    const projectTypeId = getString(1);
    const projectType = getLabel(1, projectTypeId) || 'General System';
    const techArray = getArray(3);
    const techLabels = getLabels(3, techArray);
    const projectTech = techLabels.length > 0 ? techLabels.join(', ') : 'Standard Stack';
    const structArray = getArray(2);
    const projectStructure = structArray.length > 0 ? getLabels(2, structArray).join(' + ') : 'Standard Architecture';
    const forbiddenArray = getArray(10);
    const forbiddenList = forbiddenArray.length > 0 ? getLabels(10, forbiddenArray) : [];
    const packageManager = getLabel(4, getString(4)) || 'npm';
    const priority = getLabel(17, getString(17)) || 'Quality';
    const optimization = getLabel(16, getString(16)) || 'Balanced';
    const codeStyle = getLabel(18, getString(18)) || 'Moderate';
    const docLevel = getLabel(15, getString(15)) || 'For complex logic';
    const topology = getLabel(12, getString(12)) || 'Main Orchestrator';
    const autonomy = getLabel(11, getString(11)) || 'Medium';
    const syncMethod = getLabel(13, getString(13)) || 'Log file';
    const conflict = getLabel(14, getString(14)) || 'Ask me';
    const createPerm = getLabel(6, getString(6)) || 'Yes, freely';
    const editPerm = getLabel(7, getString(7)) || 'Yes, any files';
    const deletePerm = getLabel(8, getString(8)) || 'Only with approval';
    const gitPerm = getLabel(9, getString(9)) || 'Commits only';

    const enabledAgentsIds = getArray(5);
    const finalAgentsIds = enabledAgentsIds.length > 0
        ? (enabledAgentsIds.includes('planner') ? enabledAgentsIds : ['planner', ...enabledAgentsIds])
        : ['planner', 'architect', 'codewriter', 'reviewer'];

    const generationDate = new Date().toISOString().split('T')[0];

    // Determine primary tech for commands
    const primaryTech = techArray.find(t => ['nextjs', 'react', 'vue', 'nodejs', 'python'].includes(t)) || 'default';
    const commands = TECH_COMMANDS[primaryTech] || TECH_COMMANDS.default;

    // Generate project structure based on type
    const getProjectStructure = () => {
        if (projectTypeId === 'web_full' || projectTypeId === 'saas') {
            return `
\`\`\`
project/
├── src/
│   ├── app/              # Next.js app router / pages
│   ├── components/       # Reusable UI components
│   │   ├── ui/          # Base components (Button, Input)
│   │   └── features/    # Feature-specific components
│   ├── lib/             # Utilities and helpers
│   ├── hooks/           # Custom React hooks
│   ├── stores/          # State management (Zustand/Redux)
│   ├── types/           # TypeScript type definitions
│   └── styles/          # Global styles
├── public/              # Static assets
├── tests/               # Test files
├── .env.local           # Environment variables (DO NOT COMMIT)
└── package.json
\`\`\``;
        }
        if (projectTypeId === 'backend') {
            return `
\`\`\`
project/
├── src/
│   ├── controllers/     # Request handlers
│   ├── services/        # Business logic
│   ├── models/          # Database models
│   ├── middleware/      # Express/Fastify middleware
│   ├── routes/          # API route definitions
│   ├── utils/           # Helper functions
│   └── types/           # TypeScript types
├── tests/               # Test files
├── prisma/              # Database schema (if using Prisma)
├── .env                 # Environment variables (DO NOT COMMIT)
└── package.json
\`\`\``;
        }
        return `
\`\`\`
project/
├── src/                 # Source code
├── tests/               # Test files
├── docs/                # Documentation
├── .env.local           # Environment variables (DO NOT COMMIT)
└── package.json
\`\`\``;
    };

    // Generate agent sections with examples
    const generateAgentSection = (id: string) => {
        const label = getLabel(5, id);
        const template = AGENT_TEMPLATES[id];

        if (!template) {
            return `### ${label}
- Role: Specialized worker agent
- Focus: ${priority} development
`;
        }

        return `### ${label}

**Guidelines:**
${template.guidelines.map(g => `- ${g}`).join('\n')}

**Code Examples:**
${template.examples}
${template.commands ? `
**Commands:**
${template.commands.map(c => `- \`${c}\``).join('\n')}
` : ''}`;
    };

    // 1. AGENTS.md - Professional version
    results['AGENTS.md'] = `---
type: ai_agent_instructions
version: 2.0.0
generated: ${generationDate}
---

# 🤖 AI Agent Instructions

> This file provides context and guidelines for AI coding assistants working on this project.

## 📋 Project Overview

**Mission:** ${projectMission}

**Type:** ${projectType}
**Architecture:** ${projectStructure}
**Tech Stack:** ${projectTech}
**Priority:** ${priority}

---

## 🛠️ Development Commands

| Command | Description | Expected Output |
|---------|-------------|-----------------|
| \`${commands.dev}\` | Start dev server | Server running on localhost:3000 |
| \`${commands.build}\` | Production build | Optimized bundle in \`dist/\` or \`.next/\` |
| \`${commands.test}\` | Run tests | Test results with coverage |
| \`${commands.lint}\` | Check code style | Linting errors/warnings |

**Package Manager:** \`${packageManager}\`

---

## 📁 Project Structure
${getProjectStructure()}

---

## 👥 Agent Team

${finalAgentsIds.map(id => generateAgentSection(id)).join('\n\n---\n\n')}

---

## 🔒 Security Guidelines

### Critical Rules
1. **Never commit secrets** - Use environment variables
2. **Validate all inputs** - Sanitize user data
3. **No hardcoded credentials** - Check for API keys, passwords

### Forbidden Files (DO NOT MODIFY)
${forbiddenList.length > 0 ? forbiddenList.map(f => `- \`${f}\``).join('\n') : '- No restrictions specified'}

### Sensitive Paths
- \`.env\`, \`.env.local\`, \`.env.production\` - Environment secrets
- \`prisma/migrations/\` - Database migrations (review carefully)
- \`package-lock.json\` - Dependency lock (auto-generated)

---

## ⚙️ Coding Standards

### Style: ${codeStyle}

**TypeScript:**
\`\`\`typescript
// ✅ Good - Explicit types, clear naming
interface UserProfile {
  id: string;
  email: string;
  createdAt: Date;
}

const getUserById = async (id: string): Promise<UserProfile | null> => {
  return await db.user.findUnique({ where: { id } });
};

// ❌ Bad - Implicit any, unclear naming
const getUser = async (x) => await db.user.findUnique({ where: { id: x } });
\`\`\`

**Components:**
\`\`\`tsx
// ✅ Good - Props interface, semantic JSX
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary',
  onClick 
}) => (
  <button 
    className={\`btn btn-\${variant}\`}
    onClick={onClick}
  >
    {children}
  </button>
);
\`\`\`

### Documentation: ${docLevel}
- Document public functions with JSDoc
- Add inline comments for complex logic
- Keep README.md updated

### Optimization: ${optimization}
- Use React.memo for expensive renders
- Implement proper loading states
- Lazy load heavy components

---

## 🔄 Workflow

**Topology:** ${topology}
**Autonomy Level:** ${autonomy}
**State Sync:** ${syncMethod}
**Conflict Resolution:** ${conflict}

### Permissions
| Action | Permission |
|--------|------------|
| Create files | ${createPerm} |
| Edit files | ${editPerm} |
| Delete files | ${deletePerm} |
| Git operations | ${gitPerm} |

---

## 🚀 Quick Reference

### Before Starting
1. Read this AGENTS.md file
2. Check \`.agent/state.json\` for current task
3. Review recent commits for context

### While Working
1. Follow coding standards above
2. Write tests for new features
3. Update documentation as needed

### Before Committing
1. Run \`${commands.lint}\` - fix any errors
2. Run \`${commands.test}\` - ensure tests pass
3. Review changes with \`git diff\`

---

*Generated by AI Agent Builder • ${generationDate}*
`;

    // 2. agents-config.json
    results['agents-config.json'] = JSON.stringify({
        schema_version: "2.0.0",
        metadata: {
            generated_at: generationDate,
            mission: projectMission,
            project_type: projectTypeId,
            tech_stack: techArray,
            package_manager: packageManager
        },
        agents: finalAgentsIds.map((id: string) => ({
            id,
            name: getLabel(5, id),
            type: id === 'planner' ? "orchestrator" : "worker",
            priority: id === 'planner' ? 1 : 2
        })),
        permissions: {
            filesystem: {
                create: getString(6),
                edit: getString(7),
                delete: getString(8)
            },
            git: getString(9),
            forbidden: forbiddenArray
        },
        workflow: {
            topology: getString(12),
            autonomy: getString(11),
            sync_method: getString(13),
            conflict_resolution: getString(14)
        },
        commands
    }, null, 2);

    // 3. .cursorrules - Cursor IDE compatible
    results['.cursorrules'] = `# Cursor AI Rules
# Generated: ${generationDate}

## Project Context
${projectMission}

## Tech Stack
${projectTech}

## Coding Standards
- Style: ${codeStyle}
- Documentation: ${docLevel}
- Priority: ${priority}

## Commands
- Dev: ${commands.dev}
- Build: ${commands.build}
- Test: ${commands.test}
- Lint: ${commands.lint}

## Forbidden
${forbiddenList.map(f => `- ${f}`).join('\n') || '- None'}

## Guidelines
- Use TypeScript strict mode
- No \`any\` types
- Prefer functional components
- Write tests for new features
`;

    // 4. prompts/planner.md
    results['prompts/planner.md'] = `---
role: strategic_planner
type: orchestrator
project: ${projectType}
stack: ${projectTech}
---

# Strategic Planner

You are the orchestrator for this ${projectType} project.

## Mission
${projectMission}

## Your Responsibilities
1. Break down complex tasks into atomic steps
2. Assign steps to appropriate agents
3. Track progress in \`.agent/state.json\`
4. Validate completed work

## Task Decomposition Example
\`\`\`markdown
User Request: "Add user authentication"

Steps:
1. [ ] architect: Design auth schema
2. [ ] codewriter: Implement User model
3. [ ] codewriter: Create auth middleware
4. [ ] tester: Write auth tests
5. [ ] documenter: Update API docs
\`\`\`

## Workflow
- Topology: ${topology}
- Autonomy: ${autonomy}
- Conflict Resolution: ${conflict}
`;

    // 5. Individual agent prompts
    finalAgentsIds.filter(id => id !== 'planner').forEach((id: string) => {
        const label = getLabel(5, id);
        const template = AGENT_TEMPLATES[id];

        results[`prompts/${id}.md`] = `---
role: ${id}
name: ${label}
type: worker
project: ${projectType}
stack: ${projectTech}
---

# ${label}

You are the ${label} for this ${projectType} project.

## Mission
${projectMission}

## Your Focus
- Priority: ${priority}
- Style: ${codeStyle}
- Documentation: ${docLevel}

${template ? `## Guidelines
${template.guidelines.map(g => `- ${g}`).join('\n')}

## Examples
${template.examples}
` : ''}
## Constraints
${forbiddenList.length > 0 ? `- Forbidden: ${forbiddenList.join(', ')}` : '- No restrictions'}
- Optimization: ${optimization}

## Commands
${template?.commands ? template.commands.map(c => `- \`${c}\``).join('\n') : `- \`${commands.dev}\`\n- \`${commands.test}\``}
`;
    });

    // 6. .agent/state.json
    results['.agent/state.json'] = JSON.stringify({
        status: "initialized",
        mission: projectMission,
        current_step: 0,
        plan: [],
        agents: finalAgentsIds,
        last_updated: generationDate
    }, null, 2);

    // 7. memory/current_task.md
    results['memory/current_task.md'] = `# Current Task

**Status:** ⚪ Ready for Planner

## Mission
${projectMission}

## Context
- Project: ${projectType}
- Stack: ${projectTech}
- Architecture: ${projectStructure}

## Progress
- [ ] Initial system check
- [ ] Review AGENTS.md guidelines
- [ ] Begin first task

---
*Last updated: ${generationDate}*
`;

    // 8. README-agents.md
    results['README-agents.md'] = `# AI Agent System

This project uses AI agents for development assistance.

## Quick Start

\`\`\`bash
# Install dependencies
${packageManager} install

# Start development
${commands.dev}

# Run tests
${commands.test}
\`\`\`

## Files

| File | Purpose |
|------|---------|
| \`AGENTS.md\` | Main AI instructions |
| \`.cursorrules\` | Cursor IDE rules |
| \`agents-config.json\` | Machine-readable config |
| \`prompts/\` | Individual agent prompts |
| \`.agent/state.json\` | Current task state |

## Mission
> ${projectMission}

## Team
${finalAgentsIds.map(id => `- **${getLabel(5, id)}** (${id})`).join('\n')}

---
*Generated: ${generationDate}*
`;

    return results;
};
