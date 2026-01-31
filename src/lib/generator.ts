export const compileFiles = (ans: Record<number, string | string[] | undefined>) => {
    const results: Record<string, string> = {};

    const getString = (id: number, fallback: string = ""): string => {
        const val = ans[id];
        if (Array.isArray(val)) return val.join(' + ');
        return val || fallback;
    };

    const getArray = (id: number): string[] => {
        const val = ans[id];
        if (Array.isArray(val)) return val;
        if (typeof val === 'string') return [val];
        return [];
    };

    const projectTech = getArray(3).join(', ');
    const projectStructure = getString(2, 'STANDARD_ARCH');
    const forbiddenDirs = getArray(10).map((p: string) => `\`${p}\``).join(', ') || 'NONE_SPECIFIED';

    const priority = getString(17, 'QUALITY');
    const enabledAgentsList = getArray(5);
    // Ensure 'planner' is in the list if not already there, as it's critical for the new system
    const finalAgentsList = enabledAgentsList.includes('planner') ? enabledAgentsList : ['planner', ...enabledAgentsList];

    const enabledAgentsMd = finalAgentsList.map((a: string) => `*   **${a}**: Specialized unit for ${priority} within ${projectTech} context.`).join('\n');
    const generationDate = new Date().toISOString().split('T')[0];

    const optimization = getString(16, 'BALANCED');
    const style = getString(18, 'STANDARD');
    const documentation = getString(15, 'CONCISE');
    const topology = getString(12, 'DECENTRALIZED');
    const interface_sync = getString(13, 'FILE_LOGS');
    const conflict = getString(14, 'MANUAL');
    const autonomy = getString(11, 'SUPERVISED');

    // 1. AGENTS.md - Corporate Level Governance
    results['AGENTS.md'] = `---
type: governance_policy
version: 1.3.0
status: operational
last_revised: ${generationDate}
---

# AGENTIC GOVERNANCE AND SYSTEM ARCHITECTURE POLICY

## 1. EXECUTIVE SUMMARY
This document defines the binding operational framework for all autonomous agents. It establishes technical boundaries, engineering standards, and the **Iterative Task Loop** protocol.

## 2. PROJECT TAXONOMY
| CATEGORY | SPECIFICATION |
| :--- | :--- |
| **Project Type** | ${getString(1, 'GENERAL_SYSTEM')} |
| **Logic Architecture** | ${projectStructure} |
| **Technical Stack** | ${projectTech || 'NOT_DETERMINED'} |
| **Toolchain** | ${getString(4, 'SYSTEM_DEFAULT')} |

## 3. AGENTIC STATE MANAGEMENT
Agents MUST maintain and synchronize state via the following artifacts:
*   **GLOBAL_STATE:** \`.agent/state.json\` (Machine-readable task tree and agent status).
*   **TASK_MEMORY:** \`memory/current_task.md\` (Human-readable progress, blockers, and next steps).

## 4. THE ITERATIVE TASK LOOP (GOAL-PLAN-EXECUTE)
All agents operate within a continuous feedback loop:
1.  **GOAL:** Identify the high-level objective from the user or Planner.
2.  **PLAN:** Decompose the goal into atomic, executable steps in \`.agent/state.json\`.
3.  **EXECUTE:** Perform the assigned step using specialized prompts.
4.  **VALIDATE:** Run tests, linters, or peer reviews (Reviewer agent) to verify the output.
5.  **DECIDE:** If validation fails, auto-trigger a fix step. If successful, proceed to the next step.

## 5. SECURITY AND PERMISSION MODEL (RBAC)
### 5.1 FS_ACCESS_CONTROL_LIST (ACL)
RESTRICTED_ZONES (Modification Prohibited): **${forbiddenDirs}**

### 5.2 CAPABILITY_MATRIX
*   **VFS_CREATE:** ${getString(6).toUpperCase()}
*   **VFS_MODIFY:** ${getString(7).toUpperCase()}
*   **VFS_DELETE:** ${getString(8).toUpperCase()}
*   **VCS_COMMIT:** ${getString(9).toUpperCase()}

## 6. ENGINEERING STANDARDS
*   **PRIORITY:** ${priority.toUpperCase()}
*   **CODE_STYLE:** ${style}
*   **OPTIMIZATION:** ${optimization}
`;

    // 2. agents-config.json - Machine readable
    results['agents-config.json'] = JSON.stringify({
        schema_version: "1.3.0",
        metadata: {
            generated_at: generationDate,
            target_env: getString(1),
            tech_base: getArray(3)
        },
        registry: finalAgentsList.map((name: string) => {
            const isPlanner = name.toLowerCase() === 'planner';
            return {
                uid: name.toLowerCase(),
                role: isPlanner ? "Planner / Orchestrator" : name,
                type: isPlanner ? "orchestrator" : "worker",
                priority: isPlanner ? 1 : 2,
                permissions: {
                    fs: {
                        create: isPlanner ? "full" : getString(6),
                        edit: isPlanner ? "any" : getString(7),
                        delete: isPlanner ? "never" : getString(8)
                    },
                    vcs: getString(9),
                    forbidden: getArray(10)
                },
                capabilities: isPlanner ? [
                    "task_planning",
                    "agent_coordination",
                    "state_management",
                    "auto_trigger"
                ] : [
                    "implementation",
                    "validation"
                ]
            };
        }),
        orchestration: {
            method: getString(12),
            interface: getString(13),
            autonomy: getString(11),
            state_path: ".agent/state.json"
        }
    }, null, 2);

    // 3. prompts/planner.md - Dedicated Orchestrator Prompt
    results['prompts/planner.md'] = `---
role: PLANNER
domain: ${getString(1)}
type: orchestrator
priority: 1
---

# SOP: PLANNER AGENT OPERATIONAL DIRECTIVE

## 1. OBJECTIVE
You are the primary Planner/Orchestrator. Your mission is to decompose complex goals into atomic tasks, manage the Global State (.agent/state.json), coordinate all worker agents, and maintain the GOAL-PLAN-EXECUTE-VALIDATE-DECIDE loop.

## 2. WORKFLOW
1.  **RECEIVE GOAL:** Extract high-level objective from user input.
2.  **DECOMPOSE:** Break down the goal into atomic, executable steps.
3.  **WRITE STATE:** Update \`.agent/state.json\` with the plan:
    \`\`\`json
    {
      "goal": "...",
      "steps": [
        {"id": 1, "agent": "code writer", "task": "...", "status": "pending"},
        {"id": 2, "agent": "qa automation", "task": "...", "status": "pending"}
      ],
      "current_step": 1
    }
    \`\`\`
4.  **EXECUTE:** Launch steps sequentially by assigning them to relevant agents.
5.  **VALIDATE:** After each step, verify the output meets the target criteria.
6.  **DECIDE:** Based on validation result, move forward or trigger a fix.

## 3. AUTO-TRIGGER LOGIC
- **IF step.status == "failed":** Create fix_step -> Assign to agent -> Retry.
- **IF step.status == "completed":** Increment current_step -> Move to next step.
- **IF all_steps == "completed":** Mark goal as "achieved" -> Report to user.

## 4. STATE SYNC
**BEFORE action:**
- Read \`.agent/state.json\`
- Read \`memory/current_task.md\`

**AFTER action:**
- Update \`.agent/state.json\`
- Append progress to \`memory/current_task.md\`

## 5. DECISION ENGINE
Evaluate current state and validation results. If architectural ambiguity arises, HALT and request human intervention.
`;

    // 4. Worker Prompts
    finalAgentsList.filter(a => a.toLowerCase() !== 'planner').forEach((name: string) => {
        results[`prompts/${name.toLowerCase()}.md`] = `---
role: ${name.toUpperCase()}
domain: ${getString(1)}
stack: ${projectTech}
type: worker
---

# SOP: ${name.toUpperCase()} AGENT OPERATIONAL DIRECTIVE

## 1. OBJECTIVE
You are the ${name} technical unit. Your mission is the execution of tasks specifically focused on ${priority} within the ${projectTech} environment.

## 2. OPERATIONAL PROTOCOL
1.  **CONSULT_STATE:** Read \`.agent/state.json\` and \`memory/current_task.md\` before any action.
2.  **EXECUTE_STEP:** Perform the single most relevant step assigned to your role.
3.  **UPDATE_STATE:** Immediately record progress, output, and failures in the State Management artifacts.

## 3. AUTO-TRIGGER PROTOCOL
### 3.1 SUCCESS CASE
If current_step.status == "completed":
- Update \`state.json\`: increment current_step
- Load next agent's prompt
- DO NOT wait for user confirmation

### 3.2 FAILURE CASE
If current_step.validation == "failed":
- Create fix_step with id: current_step.id + 0.1
- Execute fix_step immediately
- If fix_step fails twice: HALT and notify human.

### 3.3 BLOCKER CASE
If architectural ambiguity or security violation:
- Add to "blockers" in \`state.json\`
- HALT and notify user.

## 4. TECHNICAL CONSTRAINTS
- **STACK:** ${projectTech}
- **FS_WRITE:** ${getString(7)} | **FS_CREATE:** ${getString(6)}
- **DENY_LIST:** ${forbiddenDirs}

## 5. QUALITY ASSURANCE
Maintain ${documentation} documentation level. Priority: **${priority}**.
`;
    });

    // 5. State & Memory Manifests (Templates)
    results['.agent/state.json'] = JSON.stringify({
        schema_version: "1.0.0",
        session: {
            id: `session-${new Date().getTime()}`,
            started_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            status: "initialized"
        },
        goal: {
            description: "Goal not yet defined",
            priority: "high"
        },
        plan: {
            total_steps: 0,
            completed_steps: 0,
            current_step: 0,
            steps: []
        },
        errors: [],
        blockers: []
    }, null, 2);

    results['memory/current_task.md'] = `# Current Task: [Goal Name]

**Session ID:** session-${new Date().getTime()}  
**Started:** ${new Date().toLocaleString()}  
**Status:** ⚪ INITIALIZED

---

## 🎯 GOAL
[Describe the high-level goal here]

## 📋 PLAN (0/0 completed)
[Steps will be added by Planner]

---

## 📝 PROGRESS LOG
### [START] Session initialized. 
Waiting for Strategic Planner to decompose the goal.

---

## 🚧 BLOCKERS
*None*

## ⚠️ ERRORS (RESOLVED)
*None*

## 📊 METRICS
- Steps completed: 0
- Test coverage: N/A
`;

    // 6. README-agents.md
    results['README-agents.md'] = `# SYSTEM INTEGRATION: AGENTIC CORE v1.3

## 1. OPERATIONAL INFRASTRUCTURE
To activate the autonomous system, initialize these core files:
*   \`.agent/state.json\`: Machine-readable session state.
*   \`memory/current_task.md\`: Human-readable task journal.

## 2. WORKFLOW (THE AUTONOMOUS LOOP)
1. **INPUT:** Provide your goal to the **Strategic Planner**.
2. **ORCHESTRATION:** The Planner populates \`state.json\` with an executable roadmap.
3. **AUTONOMOUS EXECUTION:** Workers execute steps and auto-trigger each other based on completion status.

## 3. ACTIVE AGENT REGISTRY
${enabledAgentsMd}

---
*Generated by AI Agent Builder*
`;

    return results;
};
