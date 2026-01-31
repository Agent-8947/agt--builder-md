import { QUESTIONS } from "@/constants/questions";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface AgentTemplate {
  examples: string;
  guidelines: string[];
  operationalStandards: string[];
  chainOfThought: string[];
  commands?: string[];
  securityNotes?: string[];
}

interface TechCommands {
  dev: string;
  build: string;
  test: string;
  lint: string;
  typecheck?: string;
}

interface PermissionMatrix {
  create: string;
  edit: string;
  delete: string;
  git: string;
}

// ============================================================================
// AGENT TEMPLATES - Enterprise Grade
// ============================================================================

const AGENT_TEMPLATES: Record<string, AgentTemplate> = {
  planner: {
    examples: `
\`\`\`markdown
# Task Decomposition Example
## User Request: "Add user authentication"

### Chain of Thought:
1. GOAL: User wants secure login system
2. CONSTRAINTS: We use Next.js + Prisma (from tech stack)
3. DEPENDENCIES: Need User model, JWT library, middleware

### Decomposed Steps:
| Step | Agent | Description | Acceptance Criteria |
|------|-------|-------------|---------------------|
| 1 | architect | Design auth schema | ERD diagram approved |
| 2 | codewriter | Create User model | Prisma migration runs |
| 3 | codewriter | Implement JWT middleware | Token validation works |
| 4 | codewriter | Add login/register routes | API responds 200/401 |
| 5 | tester | Write auth tests | 100% coverage |
| 6 | documenter | Update API docs | Swagger updated |
\`\`\``,
    guidelines: [
      "Break complex tasks into atomic, testable steps",
      "Assign each step to the most appropriate agent",
      "Update `.agent/state.json` after each decision",
      "Validate completion before marking done"
    ],
    operationalStandards: [
      "ALWAYS read .agent/state.json before planning",
      "NEVER skip validation step after each task",
      "Document WHY before WHAT in every decision"
    ],
    chainOfThought: [
      "1. STATE: What is the current project state?",
      "2. GOAL: What does the user want to achieve?",
      "3. CONSTRAINTS: What limits our options?",
      "4. OPTIONS: What approaches are possible?",
      "5. DECISION: Which approach is optimal and why?",
      "6. PLAN: What are the atomic steps?"
    ]
  },
  architect: {
    examples: `
\`\`\`typescript
// ✅ Feature-Sliced Design (FSD) Structure
src/
├── app/                    # Application layer
│   ├── providers/          # Global providers
│   └── styles/             # Global styles
├── features/               # Feature modules (self-contained)
│   ├── auth/
│   │   ├── ui/            # Components
│   │   ├── model/         # State, hooks
│   │   ├── api/           # API calls
│   │   └── index.ts       # Public API
│   └── dashboard/
├── entities/               # Business entities
│   ├── user/
│   └── product/
├── shared/                 # Shared utilities
│   ├── ui/                # Reusable components
│   ├── lib/               # Helpers
│   └── config/            # Constants
└── widgets/               # Composite components
    ├── header/
    └── sidebar/

// ❌ Anti-pattern: Flat structure
src/
├── components/    // All 200+ components mixed
├── utils/         // Random helpers
└── pages/         // Monolithic pages
\`\`\``,
    guidelines: [
      "Follow Feature-Sliced Design (FSD) for scalable structure",
      "Co-locate related files (component + test + styles)",
      "Use barrel exports (index.ts) for clean imports",
      "Document architectural decisions in ADRs"
    ],
    operationalStandards: [
      "Run `npm run lint` before committing",
      "Verify no circular dependencies: `npx madge --circular src/`",
      "Check bundle size impact: `npm run build && npx size-limit`"
    ],
    chainOfThought: [
      "1. CURRENT: What is the existing structure?",
      "2. REQUIREMENTS: What does this feature need?",
      "3. PATTERNS: Which architectural pattern fits?",
      "4. BOUNDARIES: Where are the module boundaries?",
      "5. DEPENDENCIES: What are the import directions?"
    ]
  },
  codewriter: {
    examples: `
\`\`\`typescript
// ✅ Good: Type-safe, documented, testable
/**
 * Fetches user profile by ID with caching.
 * @param userId - The unique user identifier
 * @returns User profile or null if not found
 * @throws {AuthError} if user is not authenticated
 */
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  // Chain of Thought:
  // 1. Validate input (security)
  // 2. Check cache first (performance)
  // 3. Fetch from DB if cache miss
  // 4. Update cache on success
  
  if (!userId || typeof userId !== 'string') {
    throw new ValidationError('Invalid userId');
  }

  const cached = await cache.get(\`user:\${userId}\`);
  if (cached) return cached as UserProfile;

  const user = await db.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, name: true, avatar: true }
  });

  if (user) {
    await cache.set(\`user:\${userId}\`, user, { ttl: 3600 });
  }

  return user;
}

// ❌ Bad: No types, no docs, no validation
const getUser = async (id) => {
  return await db.query(\`SELECT * FROM users WHERE id = '\${id}'\`);
}
\`\`\``,
    guidelines: [
      "Use TypeScript strict mode - no `any` types",
      "One component per file, PascalCase naming",
      "Prefer functional components with hooks",
      "Use Tailwind classes, avoid inline styles"
    ],
    operationalStandards: [
      "Run before commit: `npm run lint -- --fix && npm run typecheck`",
      "Format on save: Prettier enabled",
      "Max file length: 300 lines (split if larger)"
    ],
    chainOfThought: [
      "1. INTERFACE: What are the inputs and outputs?",
      "2. VALIDATION: How do we validate inputs?",
      "3. LOGIC: What is the core algorithm?",
      "4. ERRORS: What can go wrong?",
      "5. PERFORMANCE: Any optimization needed?"
    ],
    commands: [
      "npm run lint -- --fix",
      "npm run typecheck",
      "npm run format"
    ]
  },
  reviewer: {
    examples: `
\`\`\`markdown
## Code Review Report

### Summary
PR #123: Add user authentication
Author: @codewriter
Files changed: 12 | +450 / -30

### Security Audit ✅
- [x] No hardcoded secrets
- [x] Input validation present
- [x] Parameterized queries used
- [x] Rate limiting configured

### Type Safety ✅
- [x] No \`any\` types
- [x] Strict mode compliant
- [x] Proper error types

### Performance ⚠️
- [x] No N+1 queries
- [ ] Consider memoizing \`getUserPermissions\` (called 3x per request)

### Testing ❌
- [x] Unit tests present
- [ ] Missing E2E test for login flow
- [ ] Edge case: expired token handling

### Recommendations
1. **MUST FIX**: Add E2E test for login
2. **SHOULD FIX**: Memoize permission check
3. **NICE TO HAVE**: Extract auth middleware to shared/
\`\`\``,
    guidelines: [
      "Check for security vulnerabilities FIRST",
      "Verify TypeScript types are properly used",
      "Ensure tests cover edge cases",
      "Look for performance anti-patterns"
    ],
    operationalStandards: [
      "Run full test suite: `npm test -- --coverage`",
      "Check security: `npm audit`",
      "Verify types: `npm run typecheck`"
    ],
    chainOfThought: [
      "1. SECURITY: Any vulnerabilities?",
      "2. CORRECTNESS: Does it work as intended?",
      "3. TYPES: Is it type-safe?",
      "4. TESTS: Is it tested?",
      "5. PERFORMANCE: Any bottlenecks?",
      "6. MAINTAINABILITY: Is it readable?"
    ]
  },
  tester: {
    examples: `
\`\`\`typescript
// Unit Test - Business Logic
describe('AuthService', () => {
  describe('validatePassword', () => {
    it('should accept valid password with all requirements', () => {
      expect(validatePassword('SecureP@ss123')).toBe(true);
    });

    it('should reject password shorter than 8 characters', () => {
      expect(validatePassword('Short1!')).toBe(false);
    });

    it('should reject password without special character', () => {
      expect(validatePassword('NoSpecial123')).toBe(false);
    });
  });
});

// Integration Test - API
describe('POST /api/auth/login', () => {
  it('returns 200 and token for valid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'user@test.com', password: 'ValidP@ss123' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.token).toMatch(/^eyJ/); // JWT format
  });

  it('returns 401 for invalid password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'user@test.com', password: 'wrong' });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Invalid credentials');
  });
});
\`\`\``,
    guidelines: [
      "Write tests before or alongside code (TDD/BDD)",
      "Cover happy path, edge cases, and error states",
      "Use descriptive test names that explain behavior",
      "Mock external dependencies, test real logic"
    ],
    operationalStandards: [
      "Minimum coverage: 80% lines, 70% branches",
      "Run: `npm test -- --coverage --watchAll=false`",
      "E2E: `npm run test:e2e`"
    ],
    chainOfThought: [
      "1. COVERAGE: What needs to be tested?",
      "2. HAPPY PATH: What is the normal flow?",
      "3. EDGE CASES: What are the boundaries?",
      "4. ERRORS: What can fail?",
      "5. MOCKING: What to mock vs test real?"
    ],
    commands: [
      "npm test -- --coverage",
      "npm run test:e2e",
      "npm run test:watch"
    ]
  },
  documenter: {
    examples: `
\`\`\`typescript
/**
 * Authenticates a user and returns a session with JWT token.
 *
 * @description
 * This function validates user credentials, creates a session,
 * and returns a JWT token for subsequent API calls.
 *
 * @param credentials - User login credentials
 * @param credentials.email - User's email address (validated)
 * @param credentials.password - User's password (min 8 chars)
 * @param options - Optional configuration
 * @param options.rememberMe - Extend token expiry to 30 days
 *
 * @returns Promise resolving to session with token and user
 *
 * @throws {ValidationError} When email format is invalid
 * @throws {AuthError} When credentials don't match
 * @throws {RateLimitError} After 5 failed attempts
 *
 * @example
 * // Basic usage
 * const session = await authenticate({
 *   email: 'user@example.com',
 *   password: 'SecureP@ss123'
 * });
 * console.log(session.token); // "eyJhbG..."
 *
 * @example
 * // With remember me
 * const session = await authenticate(
 *   { email: 'user@example.com', password: 'SecureP@ss123' },
 *   { rememberMe: true }
 * );
 *
 * @see {@link logout} for ending a session
 * @see {@link refreshToken} for extending sessions
 */
export async function authenticate(
  credentials: LoginCredentials,
  options?: AuthOptions
): Promise<AuthSession> {
  // Implementation
}
\`\`\``,
    guidelines: [
      "Document ALL public APIs with JSDoc",
      "Include usage examples in documentation",
      "Keep README.md updated with setup instructions",
      "Document breaking changes in CHANGELOG.md"
    ],
    operationalStandards: [
      "Generate docs: `npm run docs`",
      "Check links: `npm run docs:check`",
      "Update CHANGELOG for every release"
    ],
    chainOfThought: [
      "1. WHO: Who will read this?",
      "2. WHAT: What does it do?",
      "3. WHY: Why would they use it?",
      "4. HOW: How to use it (examples)?",
      "5. EDGE CASES: What to watch out for?"
    ]
  },
  security: {
    examples: `
\`\`\`typescript
// ============================================================================
// ✅ SECURE PATTERNS
// ============================================================================

// 1. Environment Variables - NEVER hardcode secrets
const config = {
  apiKey: process.env.API_KEY!,           // From environment
  dbUrl: process.env.DATABASE_URL!,       // Never in code
  jwtSecret: process.env.JWT_SECRET!,     // Rotated regularly
};

// 2. Input Validation with Zod
import { z } from 'zod';

const UserInputSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(8).max(100),
  name: z.string().min(1).max(100).regex(/^[a-zA-Z\\s]+$/),
});

function createUser(input: unknown) {
  const validated = UserInputSchema.parse(input); // Throws if invalid
  return db.user.create({ data: validated });
}

// 3. Parameterized Queries - Prevent SQL Injection
// ✅ Safe - parameterized
const user = await db.$queryRaw\`
  SELECT * FROM users WHERE id = \${userId}
\`;

// ❌ NEVER - SQL injection vulnerability
const user = await db.$queryRawUnsafe(
  \`SELECT * FROM users WHERE id = '\${userId}'\`
);

// 4. Rate Limiting
import rateLimit from 'express-rate-limit';

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,                    // 5 attempts
  message: 'Too many login attempts, try again later'
});

app.post('/api/auth/login', authLimiter, loginHandler);

// 5. Secure Headers
import helmet from 'helmet';
app.use(helmet());

// ============================================================================
// ❌ ANTI-PATTERNS - NEVER DO THIS
// ============================================================================

// Hardcoded secrets
const API_KEY = 'sk-1234567890abcdef';  // 🚨 EXPOSED IN GIT HISTORY!

// String concatenation in queries
const query = \`SELECT * FROM users WHERE email = '\${email}'\`;  // 🚨 SQL INJECTION!

// No input validation
app.post('/api/users', (req, res) => {
  db.user.create({ data: req.body });  // 🚨 ACCEPTS ANYTHING!
});
\`\`\``,
    guidelines: [
      "NEVER commit secrets - use environment variables",
      "ALWAYS validate and sanitize user inputs",
      "ALWAYS use parameterized queries",
      "Implement rate limiting on all public endpoints",
      "Use HTTPS everywhere, set secure headers"
    ],
    operationalStandards: [
      "Audit dependencies: `npm audit`",
      "Check for secrets: `git secrets --scan`",
      "OWASP check: `npm run security:check`"
    ],
    chainOfThought: [
      "1. SECRETS: Any hardcoded credentials?",
      "2. INPUT: Is all user input validated?",
      "3. QUERIES: Are all queries parameterized?",
      "4. AUTH: Is authentication/authorization proper?",
      "5. HEADERS: Are security headers set?",
      "6. DEPENDENCIES: Any vulnerable packages?"
    ],
    securityNotes: [
      "Rotate all secrets every 90 days",
      "Use secret manager (AWS Secrets Manager, Vault)",
      "Enable 2FA for all production access",
      "Log all authentication attempts",
      "Implement proper CORS policies"
    ],
    commands: [
      "npm audit",
      "npm audit fix",
      "npx snyk test"
    ]
  },
  devops: {
    examples: `
\`\`\`yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=\${DATABASE_URL}
    depends_on:
      db:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  db:
    image: postgres:15-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_USER: \${DB_USER}
      POSTGRES_PASSWORD: \${DB_PASSWORD}
      POSTGRES_DB: \${DB_NAME}
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U \${DB_USER}"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
\`\`\`

\`\`\`yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm test -- --coverage
      - run: npm run build
\`\`\``,
    guidelines: [
      "Use Docker for consistent environments",
      "Implement CI/CD with GitHub Actions",
      "Set up staging environment before production",
      "Monitor logs and set up alerts"
    ],
    operationalStandards: [
      "Build: `docker compose build`",
      "Start: `docker compose up -d`",
      "Logs: `docker compose logs -f app`",
      "Deploy: `git push origin main` (triggers CI/CD)"
    ],
    chainOfThought: [
      "1. ENVIRONMENT: What environment is this?",
      "2. DEPENDENCIES: What services are needed?",
      "3. SECRETS: How are secrets managed?",
      "4. HEALTH: How do we know it's running?",
      "5. MONITORING: How do we track issues?"
    ],
    commands: [
      "docker compose up -d",
      "docker compose logs -f",
      "docker compose down",
      "npm run build",
      "npm run start"
    ]
  },
  bugfixer: {
    examples: `
\`\`\`markdown
## Bug Report #127: Login fails on mobile

### 1. REPRODUCE
**Steps:**
1. Open app on iPhone Safari
2. Enter valid credentials
3. Click "Login"
4. Observe: Spinner spins forever

**Expected:** Redirect to dashboard
**Actual:** Infinite loading state
**Environment:** iOS 17, Safari 17.2

### 2. DIAGNOSE
**Chain of Thought:**
1. Check network tab → Request succeeds (200)
2. Check console → "Cannot read property 'user' of undefined"
3. Check response → { data: { user: {...} } }
4. Check code → Expects res.user, got res.data.user
5. Root cause: API response structure changed

### 3. FIX
\`\`\`diff
- const user = response.user;
+ const user = response.data?.user ?? response.user;
\`\`\`

### 4. VERIFY
- [x] Regression test added
- [x] Works on iOS Safari
- [x] Works on Android Chrome
- [x] Works on Desktop browsers
- [x] No other tests broken

### 5. COMMIT
\`\`\`
fix(auth): handle new API response structure

The API now wraps user in data object. Updated auth
handler to check both formats for backwards compatibility.

Fixes #127
\`\`\`
\`\`\``,
    guidelines: [
      "ALWAYS reproduce issue before attempting fix",
      "Add regression test with every fix",
      "Document root cause in commit message",
      "Verify fix doesn't break other features"
    ],
    operationalStandards: [
      "Create failing test first",
      "Minimal fix - don't refactor while fixing",
      "Test on all affected platforms"
    ],
    chainOfThought: [
      "1. REPRODUCE: Can I reproduce the bug?",
      "2. LOCATE: Where is the bug in code?",
      "3. ROOT CAUSE: Why does this happen?",
      "4. FIX: What is the minimal fix?",
      "5. TEST: How to prevent regression?",
      "6. VERIFY: Does fix work everywhere?"
    ]
  },
  ui_specialist: {
    examples: `
\`\`\`tsx
// ✅ Good: Accessible, responsive, animated
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading,
  disabled,
  onClick,
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all';
  
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    ghost: 'text-gray-600 hover:bg-gray-100',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-4 py-2 text-base rounded-xl',
    lg: 'px-6 py-3 text-lg rounded-2xl',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={\`\${baseStyles} \${variants[variant]} \${sizes[size]}
        \${(disabled || isLoading) ? 'opacity-50 cursor-not-allowed' : ''}
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2\`}
      aria-busy={isLoading}
    >
      {isLoading && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
};
\`\`\``,
    guidelines: [
      "Accessibility first - ARIA labels, keyboard navigation",
      "Mobile-first responsive design",
      "Use CSS variables for theming",
      "Smooth animations with GPU-accelerated properties"
    ],
    operationalStandards: [
      "Check accessibility: `npm run a11y`",
      "Test on mobile: Use Chrome DevTools device mode",
      "Check contrast: WCAG 2.1 AA minimum"
    ],
    chainOfThought: [
      "1. A11Y: Is it accessible to everyone?",
      "2. RESPONSIVE: Works on all screen sizes?",
      "3. INTERACTION: Clear hover/focus/active states?",
      "4. ANIMATION: Smooth and purposeful?",
      "5. CONSISTENCY: Matches design system?"
    ]
  }
};

// ============================================================================
// TECH STACK COMMANDS
// ============================================================================

const TECH_COMMANDS: Record<string, TechCommands> = {
  nextjs: {
    dev: "npm run dev",
    build: "npm run build",
    test: "npm test",
    lint: "npm run lint",
    typecheck: "npm run typecheck"
  },
  react: {
    dev: "npm start",
    build: "npm run build",
    test: "npm test",
    lint: "npm run lint",
    typecheck: "npx tsc --noEmit"
  },
  vue: {
    dev: "npm run dev",
    build: "npm run build",
    test: "npm run test:unit",
    lint: "npm run lint",
    typecheck: "vue-tsc --noEmit"
  },
  nodejs: {
    dev: "npm run dev",
    build: "npm run build",
    test: "npm test",
    lint: "npm run lint",
    typecheck: "npm run typecheck"
  },
  python: {
    dev: "python -m uvicorn main:app --reload",
    build: "pip install -r requirements.txt",
    test: "pytest",
    lint: "ruff check .",
    typecheck: "mypy ."
  },
  default: {
    dev: "npm run dev",
    build: "npm run build",
    test: "npm test",
    lint: "npm run lint",
    typecheck: "npm run typecheck"
  }
};

// ============================================================================
// MAIN COMPILER FUNCTION
// ============================================================================

export const compileFiles = (ans: Record<number, string | string[] | undefined>): Record<string, string> => {
  const results: Record<string, string> = {};

  // ========================================================================
  // HELPER FUNCTIONS
  // ========================================================================

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

  const getString = (id: number, fallback = ""): string => {
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

  // ========================================================================
  // EXTRACT PROJECT DATA
  // ========================================================================

  const projectMission = getString(0, 'Mission not described');
  const projectTypeId = getString(1);
  const projectType = getLabel(1, projectTypeId) || 'General System';
  const techArray = getArray(3);
  const techLabels = getLabels(3, techArray);
  const projectTech = techLabels.length > 0 ? techLabels.join(', ') : 'Standard Stack';
  const structArray = getArray(2);
  const hasFSD = structArray.includes('fsd');
  const hasMonorepo = structArray.includes('monorepo');
  const projectStructure = structArray.length > 0 ? getLabels(2, structArray).join(' + ') : 'Standard Architecture';
  const forbiddenArray = getArray(10);
  const forbiddenList = forbiddenArray.length > 0 ? getLabels(10, forbiddenArray) : [];
  const packageManager = getLabel(4, getString(4)) || 'npm';
  const priorityId = getString(17);
  const priority = getLabel(17, priorityId) || 'Quality';
  const isQualityFirst = priorityId === 'quality';
  const optimization = getLabel(16, getString(16)) || 'Balanced';
  const codeStyle = getLabel(18, getString(18)) || 'Moderate';
  const docLevel = getLabel(15, getString(15)) || 'For complex logic';
  const topology = getLabel(12, getString(12)) || 'Main Orchestrator';
  const autonomy = getLabel(11, getString(11)) || 'Medium';
  const syncMethod = getLabel(13, getString(13)) || 'Log file';
  const conflict = getLabel(14, getString(14)) || 'Ask me';

  // Permissions
  const createPerm = getLabel(6, getString(6)) || 'Yes, freely';
  const editPerm = getLabel(7, getString(7)) || 'Yes, any files';
  const deletePerm = getLabel(8, getString(8)) || 'Only with approval';
  const gitPerm = getLabel(9, getString(9)) || 'Commits only';

  const permissions: PermissionMatrix = {
    create: createPerm,
    edit: editPerm,
    delete: deletePerm,
    git: gitPerm
  };

  const enabledAgentsIds = getArray(5);
  const finalAgentsIds = enabledAgentsIds.length > 0
    ? (enabledAgentsIds.includes('planner') ? enabledAgentsIds : ['planner', ...enabledAgentsIds])
    : ['planner', 'architect', 'codewriter', 'reviewer'];

  const generationDate = new Date().toISOString().split('T')[0];
  const generationTimestamp = new Date().toISOString();

  // Determine primary tech for commands
  const primaryTech = techArray.find(t => ['nextjs', 'react', 'vue', 'nodejs', 'python'].includes(t)) || 'default';
  const commands = TECH_COMMANDS[primaryTech] || TECH_COMMANDS.default;

  // ========================================================================
  // DYNAMIC PROJECT STRUCTURE
  // ========================================================================

  const getProjectStructure = (): string => {
    // FSD (Feature-Sliced Design)
    if (hasFSD) {
      return `
\`\`\`
project/
├── src/
│   ├── app/                    # Application layer (routes, providers)
│   │   ├── providers/          # Global providers (Theme, Auth, etc.)
│   │   ├── styles/             # Global styles
│   │   └── index.tsx           # App entry point
│   ├── pages/                  # Route pages (Next.js/Vite)
│   │   ├── index.tsx
│   │   └── [...slug].tsx
│   ├── widgets/                # Composite UI blocks
│   │   ├── header/
│   │   ├── sidebar/
│   │   └── footer/
│   ├── features/               # Feature modules (self-contained)
│   │   ├── auth/
│   │   │   ├── ui/            # Feature components
│   │   │   ├── model/         # State, hooks, stores
│   │   │   ├── api/           # API calls
│   │   │   ├── lib/           # Feature utilities
│   │   │   └── index.ts       # Public API
│   │   └── dashboard/
│   ├── entities/               # Business entities
│   │   ├── user/
│   │   │   ├── ui/
│   │   │   ├── model/
│   │   │   └── api/
│   │   └── product/
│   └── shared/                 # Shared utilities (no business logic)
│       ├── ui/                # Reusable UI components
│       ├── lib/               # Helpers, utils
│       ├── api/               # API client
│       └── config/            # Constants, env
├── tests/                      # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .env.local                  # Environment variables (DO NOT COMMIT)
└── package.json
\`\`\`

**FSD Import Rules:**
- \`app\` → can import from \`pages\`, \`widgets\`, \`features\`, \`entities\`, \`shared\`
- \`pages\` → can import from \`widgets\`, \`features\`, \`entities\`, \`shared\`
- \`features\` → can import from \`entities\`, \`shared\` (NOT other features)
- \`entities\` → can import from \`shared\` only
- \`shared\` → cannot import from anywhere except external libs`;
    }

    // AI Service
    if (projectTypeId === 'ai_service') {
      return `
\`\`\`
project/
├── src/
│   ├── api/                    # API endpoints
│   │   ├── routes/
│   │   └── middleware/
│   ├── agents/                 # AI agents
│   │   ├── base.py
│   │   └── specialized/
│   ├── chains/                 # LangChain chains
│   │   ├── rag.py
│   │   └── conversational.py
│   ├── embeddings/             # Vector embeddings
│   │   ├── generator.py
│   │   └── store.py
│   ├── data/                   # Data processing
│   │   ├── loaders/
│   │   ├── transformers/
│   │   └── validators/
│   ├── vectorstore/            # Vector database
│   │   ├── pinecone.py
│   │   └── chroma.py
│   ├── prompts/                # Prompt templates
│   │   ├── system/
│   │   └── user/
│   └── utils/                  # Utilities
├── data/                       # Data files
│   ├── raw/
│   └── processed/
├── tests/
├── .env                        # API keys (DO NOT COMMIT)
└── requirements.txt
\`\`\``;
    }

    // Monorepo
    if (hasMonorepo) {
      return `
\`\`\`
project/
├── apps/                       # Applications
│   ├── web/                   # Frontend (Next.js)
│   │   ├── src/
│   │   └── package.json
│   ├── api/                   # Backend (Express/Fastify)
│   │   ├── src/
│   │   └── package.json
│   └── mobile/                # Mobile (React Native)
│       ├── src/
│       └── package.json
├── packages/                   # Shared packages
│   ├── ui/                    # Component library
│   │   ├── src/
│   │   └── package.json
│   ├── types/                 # Shared TypeScript types
│   │   ├── src/
│   │   └── package.json
│   └── config/                # Shared config (ESLint, etc.)
│       └── package.json
├── tools/                      # Build tools, scripts
├── turbo.json                  # Turborepo config
├── pnpm-workspace.yaml         # Workspace definition
└── package.json               # Root package.json
\`\`\`

**Monorepo Commands:**
- Install all: \`pnpm install\`
- Build all: \`pnpm build\`
- Dev web: \`pnpm --filter web dev\`
- Dev api: \`pnpm --filter api dev\``;
    }

    // SaaS / Fullstack
    if (projectTypeId === 'web_full' || projectTypeId === 'saas') {
      return `
\`\`\`
project/
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── (auth)/            # Auth group
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (dashboard)/       # Dashboard group
│   │   │   ├── settings/
│   │   │   └── profile/
│   │   ├── api/               # API routes
│   │   │   └── v1/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/            # UI components
│   │   ├── ui/               # Base (Button, Input, etc.)
│   │   └── features/         # Feature-specific
│   ├── lib/                   # Utilities
│   │   ├── api.ts            # API client
│   │   ├── auth.ts           # Auth helpers
│   │   └── utils.ts          # Generic utils
│   ├── hooks/                 # Custom hooks
│   ├── stores/                # State (Zustand)
│   └── types/                 # TypeScript types
├── prisma/                    # Database
│   ├── schema.prisma
│   └── migrations/
├── public/                    # Static assets
├── tests/
├── .env.local                 # Environment (DO NOT COMMIT)
└── package.json
\`\`\``;
    }

    // Backend API
    if (projectTypeId === 'backend') {
      return `
\`\`\`
project/
├── src/
│   ├── controllers/           # Request handlers
│   │   ├── auth.controller.ts
│   │   └── user.controller.ts
│   ├── services/              # Business logic
│   │   ├── auth.service.ts
│   │   └── user.service.ts
│   ├── repositories/          # Data access
│   │   └── user.repository.ts
│   ├── models/                # Database models
│   │   └── user.model.ts
│   ├── middleware/            # Middleware
│   │   ├── auth.middleware.ts
│   │   └── error.middleware.ts
│   ├── routes/                # Route definitions
│   │   ├── index.ts
│   │   └── v1/
│   ├── utils/                 # Utilities
│   ├── types/                 # TypeScript types
│   └── app.ts                 # App entry
├── prisma/
├── tests/
├── .env                       # Environment (DO NOT COMMIT)
└── package.json
\`\`\``;
    }

    // Default
    return `
\`\`\`
project/
├── src/                       # Source code
│   ├── components/           # UI components
│   ├── lib/                  # Utilities
│   ├── hooks/                # Custom hooks
│   └── types/                # TypeScript types
├── tests/                     # Test files
├── public/                    # Static assets
├── docs/                      # Documentation
├── .env.local                 # Environment (DO NOT COMMIT)
└── package.json
\`\`\``;
  };

  // ========================================================================
  // PERMISSION MATRIX TABLE
  // ========================================================================

  const generatePermissionMatrix = (): string => {
    return `
| Action | Permission | Scope |
|--------|------------|-------|
| **Create Files** | ${permissions.create} | New files and directories |
| **Edit Files** | ${permissions.edit} | Modify existing code |
| **Delete Files** | ${permissions.delete} | Remove files/folders |
| **Git Operations** | ${permissions.git} | Commits, branches, PRs |

### Forbidden Paths
${forbiddenList.length > 0
        ? forbiddenList.map(f => `- \`${f}\` ❌`).join('\n')
        : '- No restrictions specified'}

### Sensitive Files (Always Review)
- \`.env\`, \`.env.local\`, \`.env.production\` — Environment secrets
- \`prisma/migrations/\` — Database migrations
- \`package-lock.json\` / \`pnpm-lock.yaml\` — Dependency locks
- \`*.key\`, \`*.pem\` — Cryptographic keys`;
  };

  // ========================================================================
  // AGENT SECTION GENERATOR
  // ========================================================================

  const generateAgentSection = (id: string): string => {
    const label = getLabel(5, id);
    const template = AGENT_TEMPLATES[id];

    if (!template) {
      return `### ${label}
- **Role:** Specialized worker agent
- **Focus:** ${priority} development
- **Standards:** Follow project guidelines
`;
    }

    const qualityRequirements = isQualityFirst ? `
**Quality-First Requirements:**
- All public functions MUST have JSDoc documentation
- All new code MUST have unit tests (min 80% coverage)
- All PRs MUST pass code review
` : '';

    return `### ${label}

**Guidelines:**
${template.guidelines.map(g => `- ${g}`).join('\n')}

**Operational Standards:**
${template.operationalStandards.map(s => `- ${s}`).join('\n')}

**Chain of Thought (ALWAYS follow):**
${template.chainOfThought.map((step) => `${step}`).join('\n')}
${template.securityNotes ? `
**Security Notes:**
${template.securityNotes.map(n => `- ⚠️ ${n}`).join('\n')}
` : ''}
${qualityRequirements}
**Code Examples:**
${template.examples}
${template.commands ? `
**Commands:**
${template.commands.map(c => `- \`${c}\``).join('\n')}
` : ''}`;
  };

  // ========================================================================
  // 1. AGENTS.md - Main Governance Document
  // ========================================================================

  results['AGENTS.md'] = `---
# YAML Frontmatter - Machine Readable Metadata
type: ai_agent_governance
version: 2.1.0
schema: enterprise
generated: ${generationTimestamp}
project:
  mission: "${projectMission.replace(/"/g, '\\"')}"
  type: ${projectTypeId || 'general'}
  architecture: [${structArray.map(s => `"${s}"`).join(', ')}]
  tech_stack: [${techArray.map(t => `"${t}"`).join(', ')}]
workflow:
  priority: ${priorityId || 'quality'}
  autonomy: ${getString(11) || 'medium'}
  topology: ${getString(12) || 'orchestrator'}
agents: [${finalAgentsIds.map(a => `"${a}"`).join(', ')}]
---

# 🤖 AI Agent Governance & Instructions

> **This document provides comprehensive instructions for AI coding assistants working on this project.**
> All agents MUST read and follow these guidelines.

---

## 📋 Project Overview

| Property | Value |
|----------|-------|
| **Mission** | ${projectMission} |
| **Type** | ${projectType} |
| **Architecture** | ${projectStructure} |
| **Tech Stack** | ${projectTech} |
| **Priority** | ${priority} |
| **Package Manager** | ${packageManager} |

---

## 🛠️ Development Commands

| Command | Description | Expected Output |
|---------|-------------|-----------------|
| \`${commands.dev}\` | Start development server | Server on localhost:3000 |
| \`${commands.build}\` | Build for production | Optimized bundle |
| \`${commands.test}\` | Run test suite | Test results + coverage |
| \`${commands.lint}\` | Lint code | Errors/warnings list |
| \`${commands.typecheck || 'npm run typecheck'}\` | Type check | TypeScript errors |

### Pre-Commit Checklist
\`\`\`bash
# Run these before every commit
${commands.lint}
${commands.typecheck || 'npm run typecheck'}
${commands.test}
\`\`\`

---

## 📁 Project Structure
${getProjectStructure()}

---

## 🔐 Security & Permissions
${generatePermissionMatrix()}

### Security Protocol
1. **NEVER** commit secrets to Git
2. **ALWAYS** validate user input
3. **ALWAYS** use parameterized queries
4. **CHECK** dependencies with \`npm audit\`

---

## 👥 Agent Team

> Each agent has specialized responsibilities. Follow the Chain of Thought protocol.

${finalAgentsIds.map(id => generateAgentSection(id)).join('\n\n---\n\n')}

---

## ⚙️ Coding Standards

### Style: ${codeStyle}

${isQualityFirst ? `
> ⚡ **QUALITY-FIRST MODE ACTIVE**
> 
> All code must meet these requirements:
> - JSDoc on all public functions
> - Unit tests required (80% min coverage)
> - Code review mandatory before merge
` : ''}

**TypeScript:**
\`\`\`typescript
// ✅ Good - Explicit types, documented
interface UserData {
  id: string;
  email: string;
  createdAt: Date;
}

/**
 * Fetches user by ID.
 * @param id - User's unique identifier
 * @returns User data or null
 */
async function getUser(id: string): Promise<UserData | null> {
  return await db.user.findUnique({ where: { id } });
}

// ❌ Bad - No types, no docs
const getUser = async (id) => await db.user.findUnique({ where: { id } });
\`\`\`

### Documentation: ${docLevel}

### Optimization: ${optimization}

---

## 🔄 Workflow Configuration

| Setting | Value |
|---------|-------|
| **Topology** | ${topology} |
| **Autonomy** | ${autonomy} |
| **Sync Method** | ${syncMethod} |
| **Conflict Resolution** | ${conflict} |

### State Management
- Read state: \`.agent/state.json\`
- Current task: \`memory/current_task.md\`
- Update after every decision

---

## 🚀 Quick Reference

### Starting Work
1. Read this AGENTS.md
2. Check \`.agent/state.json\` for current state
3. Read \`memory/current_task.md\` for active task

### During Development
1. Follow Chain of Thought for your role
2. Run linter before committing
3. Update state when task changes

### Before Commit
\`\`\`bash
${commands.lint}
${commands.test}
git diff  # Review changes
\`\`\`

---

*Generated by AI Agent Builder • v2.1.0 • ${generationDate}*
`;

  // ========================================================================
  // 2. ANTIGRAVITY_GUIDE.txt - Инструкция для Antigravity IDE  
  // ========================================================================

  // Master-промты для автоматизации
  const ANTIGRAVITY_PROMPTS = {
    setup: `Я загрузил файлы инструкций в корень проекта. Твоя задача — подготовить рабочую среду:

1. Создай папку prompts/ и перемести туда все файлы .md, кроме AGENTS.md, README-agents.md и ANTIGRAVITY_GUIDE.txt.
2. Создай папку memory/ и перемести туда current_task.md.
3. Создай папку .agent/ и перемести туда state.json.

После выполнения покажи структуру дерева файлов.`,

    start: `Структура готова. Теперь:

1. Прочитай AGENTS.md для понимания контекста проекта.
2. Активируй роль Strategic Planner из prompts/planner.md.
3. Проанализируй memory/current_task.md и предложи первый шаг.

Подтверди, что ты будешь обновлять .agent/state.json после каждого этапа работы.`
  };

  results['ANTIGRAVITY_GUIDE.txt'] = `================================================================================
РУКОВОДСТВО ПО ИСПОЛЬЗОВАНИЮ В ANTIGRAVITY IDE
================================================================================
Сгенерировано: ${generationDate}
Проект: ${projectMission}
================================================================================

🚀 БЫСТРЫЙ СТАРТ (3 шага)
================================================================================

Не нужно вручную создавать папки! ИИ сделает это за вас по промту.

┌─────────────────────────────────────────────────────────────────────────────┐
│  ШАГ 1: Загрузите все файлы из архива в КОРЕНЬ проекта Antigravity         │
│  ШАГ 2: Скопируйте и вставьте «ПРОМТ №1» в чат                             │
│  ШАГ 3: Скопируйте и вставьте «ПРОМТ №2» в чат                             │
└─────────────────────────────────────────────────────────────────────────────┘

================================================================================

📋 ПРОМТ №1: ИНИЦИАЛИЗАЦИЯ СТРУКТУРЫ
================================================================================
Скопируйте текст ниже и вставьте в чат Antigravity:

╔═══════════════════════════════════════════════════════════════════════════════╗
║                                                                               ║
║  ${ANTIGRAVITY_PROMPTS.setup.split('\n').join('\n║  ')}
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝

Что произойдёт:
• ИИ создаст правильную структуру папок
• Все файлы будут разложены по местам
• Вы увидите финальное дерево файлов

================================================================================

📋 ПРОМТ №2: ЗАПУСК ЦИКЛА РАЗРАБОТКИ  
================================================================================
После успешного выполнения Промта №1, вставьте этот текст:

╔═══════════════════════════════════════════════════════════════════════════════╗
║                                                                               ║
║  ${ANTIGRAVITY_PROMPTS.start.split('\n').join('\n║  ')}
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝

Что произойдёт:
• ИИ загрузит контекст вашего проекта из AGENTS.md
• Активируется роль Strategic Planner
• Вы получите первый шаг плана разработки
• ИИ начнёт вести историю в state.json

================================================================================

📖 ОПИСАНИЕ ФАЙЛОВ
--------------------------------------------------------------------------------

После инициализации структура будет выглядеть так:

    your-project/
    ├── AGENTS.md                  ← Главный документ (архитектура + правила)
    ├── ANTIGRAVITY_GUIDE.txt      ← Это руководство
    ├── README-agents.md           ← Краткая справка
    ├── agents-config.json         ← Машиночитаемый конфиг
    ├── prompts/                   ← Инструкции агентов
    │   ├── planner.md            ← Strategic Planner
    │   ├── architect.md          ← Архитектор
    │   ├── codewriter.md         ← Кодер
    │   └── ...                   ← Другие агенты
    ├── .agent/
    │   └── state.json            ← "Мозг" системы (текущее состояние)
    └── memory/
        └── current_task.md       ← Активная задача

================================================================================

🎭 ПЕРЕКЛЮЧЕНИЕ РОЛЕЙ АГЕНТОВ
--------------------------------------------------------------------------------

Чтобы переключить ИИ на другую роль, используйте промты:

┌─────────────────────────────────────────────────────────────────────────────┐
│  АРХИТЕКТОР:                                                                │
│  "Прочитай prompts/architect.md и предложи структуру для нового модуля"     │
├─────────────────────────────────────────────────────────────────────────────┤
│  КОДЕР:                                                                     │
│  "Используй инструкции из prompts/codewriter.md и реализуй эту функцию"     │
├─────────────────────────────────────────────────────────────────────────────┤
│  РЕВЬЮЕР:                                                                   │
│  "Следуя prompts/reviewer.md, проверь мой код"                              │
├─────────────────────────────────────────────────────────────────────────────┤
│  ТЕСТИРОВЩИК:                                                               │
│  "По инструкциям из prompts/tester.md напиши тесты"                         │
└─────────────────────────────────────────────────────────────────────────────┘

Доступные агенты в вашем проекте:
${finalAgentsIds.map(id => `    • ${getLabel(5, id)} → prompts/${id}.md`).join('\n')}

================================================================================

🧠 СИНХРОНИЗАЦИЯ СОСТОЯНИЯ
--------------------------------------------------------------------------------

⚠️  КРИТИЧЕСКИ ВАЖНО!

Файл .agent/state.json — это "память" вашего флота агентов.

После КАЖДОГО выполненного шага просите ИИ обновить state.json:

┌─────────────────────────────────────────────────────────────────────────────┐
│  "Мы закончили текущий шаг. Обнови .agent/state.json:                       │
│   - Отметь шаг N как выполненный                                            │
│   - Добавь следующий шаг в план"                                            │
└─────────────────────────────────────────────────────────────────────────────┘

Это позволяет:
    ✓ Сохранять контекст между сессиями
    ✓ Передавать информацию между агентами
    ✓ Отслеживать прогресс проекта

================================================================================

🖥️ КОМАНДЫ РАЗРАБОТКИ
--------------------------------------------------------------------------------

    ┌────────────────────────────────┬────────────────────────────────────────┐
    │  КОМАНДА                       │  ОПИСАНИЕ                              │
    ├────────────────────────────────┼────────────────────────────────────────┤
    │  ${commands.dev.padEnd(30)}│  Запуск dev-сервера                    │
    │  ${commands.build.padEnd(30)}│  Сборка для production                 │
    │  ${commands.test.padEnd(30)}│  Запуск тестов                         │
    │  ${commands.lint.padEnd(30)}│  Проверка линтером                     │
    │  ${(commands.typecheck || 'npm run typecheck').padEnd(30)}│  Проверка типов TypeScript             │
    └────────────────────────────────┴────────────────────────────────────────┘

================================================================================

🔐 БЕЗОПАСНОСТЬ
--------------------------------------------------------------------------------

Агенты обучены НЕ делать следующее:

    ✗ Коммитить секреты в Git
    ✗ Использовать тип \`any\` в TypeScript  
    ✗ Хардкодить API ключи
    ✗ Изменять файлы из списка запрещённых

Запрещённые пути:
${forbiddenList.length > 0 ? forbiddenList.map(f => `    ✗ ${f}`).join('\n') : '    Нет ограничений'}

================================================================================

❓ ШПАРГАЛКА
--------------------------------------------------------------------------------

┌───────────────────────────────────────────────────────────────────────────────┐
│  ДЕЙСТВИЕ                          │  ПРОМТ                                  │
├───────────────────────────────────────────────────────────────────────────────┤
│  Загрузить контекст                │  "Прочитай AGENTS.md"                   │
│  Переключить роль                  │  "Используй prompts/X.md"               │
│  Сохранить прогресс                │  "Обнови .agent/state.json"             │
│  Посмотреть задачу                 │  "Покажи memory/current_task.md"        │
│  Начать сначала                    │  Вставьте Промт №2 заново               │
└───────────────────────────────────────────────────────────────────────────────┘

================================================================================
Сгенерировано AI Agent Builder v2.1.0
Проект: ${projectType}
Стек: ${projectTech}
================================================================================
`;


  // ========================================================================
  // 3. agents-config.json - Machine Readable Config
  // ========================================================================

  results['agents-config.json'] = JSON.stringify({
    $schema: "https://agents-builder.dev/schema/v2.1.0.json",
    version: "2.1.0",
    generated: generationTimestamp,
    project: {
      mission: projectMission,
      type: projectTypeId,
      architecture: structArray,
      tech_stack: techArray,
      package_manager: packageManager
    },
    agents: finalAgentsIds.map((id: string) => ({
      id,
      name: getLabel(5, id),
      type: id === 'planner' ? "orchestrator" : "worker",
      priority: id === 'planner' ? 1 : 2,
      capabilities: AGENT_TEMPLATES[id]?.guidelines || []
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
      conflict_resolution: getString(14),
      priority: priorityId
    },
    standards: {
      code_style: getString(18),
      documentation: getString(15),
      optimization: getString(16),
      quality_first: isQualityFirst
    },
    commands
  }, null, 2);

  // ========================================================================
  // 4. Individual Agent Prompts
  // ========================================================================

  finalAgentsIds.forEach((id: string) => {
    const label = getLabel(5, id);
    const template = AGENT_TEMPLATES[id];
    const isOrchestrator = id === 'planner';

    results[`prompts/${id}.md`] = `---
# Agent Configuration
role: ${id}
name: ${label}
type: ${isOrchestrator ? 'orchestrator' : 'worker'}
project_type: ${projectTypeId}
tech_stack: [${techArray.join(', ')}]
priority: ${priorityId}
---

# ${label} — Operational Directive

## Mission Context
**Project Goal:** ${projectMission}
**Your Role:** ${label}
**Priority:** ${priority}

---

## Chain of Thought Protocol

> **CRITICAL: Always explain your reasoning before acting.**

${template?.chainOfThought
        ? template.chainOfThought.map(step => `${step}`).join('\n')
        : `1. UNDERSTAND: What is being asked?
2. PLAN: What steps are needed?
3. EXECUTE: Implement the solution
4. VALIDATE: Verify the result`}

---

## Guidelines

${template?.guidelines
        ? template.guidelines.map(g => `- ${g}`).join('\n')
        : `- Follow project coding standards
- Document your work
- Test before committing`}

---

## Operational Standards

${template?.operationalStandards
        ? template.operationalStandards.map(s => `- ${s}`).join('\n')
        : `- Run linter before commit
- Update state file after changes`}

${isQualityFirst ? `
---

## Quality-First Requirements

> ⚡ Quality mode is ACTIVE for this project

- **JSDoc:** Required on all public functions
- **Tests:** Unit tests mandatory (80% coverage)
- **Review:** All changes need code review
` : ''}

---

## Examples

${template?.examples || 'See AGENTS.md for code examples.'}

---

## Commands

${template?.commands
        ? template.commands.map(c => `- \`${c}\``).join('\n')
        : `- \`${commands.dev}\` — Start development
- \`${commands.test}\` — Run tests
- \`${commands.lint}\` — Check code style`}

---

## Constraints

- **Forbidden Paths:** ${forbiddenList.join(', ') || 'None'}
- **Style:** ${codeStyle}
- **Auto-Optimize:** ${optimization}

---

*${label} v2.1.0 • ${generationDate}*
`;
  });

  // ========================================================================
  // 5. State & Memory Files
  // ========================================================================

  results['.agent/state.json'] = JSON.stringify({
    $schema: "https://agents-builder.dev/schema/state-v1.json",
    status: "initialized",
    mission: projectMission,
    project_type: projectTypeId,
    current_step: 0,
    plan: [],
    agents: finalAgentsIds,
    permissions,
    last_updated: generationTimestamp,
    history: []
  }, null, 2);

  results['memory/current_task.md'] = `# Current Task

**Status:** ⚪ Ready for Planner
**Last Updated:** ${generationTimestamp}

---

## Mission
${projectMission}

---

## Context

| Property | Value |
|----------|-------|
| Project Type | ${projectType} |
| Tech Stack | ${projectTech} |
| Architecture | ${projectStructure} |
| Priority | ${priority} |

---

## Active Steps

- [ ] Initial system check
- [ ] Review AGENTS.md guidelines
- [ ] Validate project structure
- [ ] Begin first task

---

## Notes

_No notes yet._

---

*Updated by: System • ${generationDate}*
`;

  // ========================================================================
  // 6. README-agents.md
  // ========================================================================

  results['README-agents.md'] = `# 🤖 AI Agent System

This project uses AI agents for development assistance.

## Quick Start

\`\`\`bash
# Install dependencies
${packageManager} install

# Start development
${commands.dev}

# Run tests
${commands.test}

# Build for production
${commands.build}
\`\`\`

## File Structure

| File | Purpose |
|------|---------|
| \`AGENTS.md\` | Main AI governance & instructions |
| \`.cursorrules\` | Cursor IDE integration rules |
| \`agents-config.json\` | Machine-readable configuration |
| \`prompts/\` | Individual agent prompts |
| \`.agent/state.json\` | Current workflow state |
| \`memory/\` | Task memory & history |

## Mission

> ${projectMission}

## Agent Team

${finalAgentsIds.map(id => `| **${getLabel(5, id)}** | ${id === 'planner' ? 'Orchestrator' : 'Worker'} |`).join('\n')}

## Technology

- **Stack:** ${projectTech}
- **Architecture:** ${projectStructure}
- **Priority:** ${priority}

## Workflow

1. AI reads \`AGENTS.md\` for context
2. Checks \`.agent/state.json\` for current state
3. Reviews \`memory/current_task.md\` for active work
4. Follows Chain of Thought protocol
5. Updates state after each action

---

*Generated by AI Agent Builder v2.1.0 • ${generationDate}*
`;

  return results;
};
