---
description: Systematically identifies and fixes TypeScript type errors in a recursive loop until the codebase is clean.
---

# Typecheck Fix Loop Workflow

This workflow is for resolving TypeScript errors after major refactors, dependency updates, or when inherited code has significant type debt. It emphasizes a structured fix-verify-confirm cycle.

## Step 1: Initial Diagnosis

1. **Run Typecheck**: Execute the project's typecheck command.
    * *Standard*: `npx tsc --noEmit` or `npm run typecheck`.
2. **Analyze**: Group errors by file, directory, or impact (e.g., core types vs. UI components).
3. **Approve**: Present the error summary (count, affected files) to the user and wait for approval to begin the fix loop.

## Step 2: The Fix Loop

For each logical group of errors, repeat these steps:

1. **Selection**: Pick a focused set of related files or a specific error pattern.
2. **Fix**: Apply technical fixes to the selected targets.
3. **Verify**: Re-run the typecheck command to ensure the targeted errors are gone.
4. **Confirm**:
    - Verify that no regressions were introduced.
    - Check if the fixes revealed "downstream" errors that were previously masked.
5. **Approve**: Show the progress to the user and get approval before moving to the next group.

## Step 3: Final Sweep

1. **Full Validation**: Run a comprehensive typecheck on the entire project to ensure 100% type safety.
2. **Approve**: Request final sign-off from the user that the task is complete.

---

# Completion

* Notify the user that the codebase is now type-clean.
* List all files that were modified during the process.
* Suggest a commit (e.g., using `/commit`) to persist the changes.
