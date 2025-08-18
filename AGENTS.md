# AGENTS.md

## Build, Lint, and Test Commands
- **Build**: `pnpm run build` (uses Nitro framework)
- **Development**: `pnpm run dev`
- **Prepare**: `pnpm run prepare`
- **Preview**: `pnpm run preview`
- **Database Migration**: `pnpm run migrate`
- **Test**: No dedicated test command found. Tests are likely run via a framework like Vitest or Jest. Please refer to `package.json` for specific test scripts.

## Code Style Guidelines
1. **Imports**:
   - Use ES6 module syntax.
   - Group imports by external libraries first, followed by internal modules.

2. **Formatting**:
   - Follow strict TypeScript rules (`strict: true` in `tsconfig.json`).
   - Use consistent indentation (2 spaces).

3. **Types**:
   - Prefer explicit types for function arguments and return values.
   - Use Zod for schema validation.

4. **Naming Conventions**:
   - Use camelCase for variables and functions.
   - Use PascalCase for classes and TypeScript types.

5. **Error Handling**:
   - Use `try-catch` blocks for async operations.
   - Validate inputs using Zod schemas.

## Notes
- No Cursor or Copilot rules detected.
- Ensure all scripts and configurations align with the Nitro framework and Drizzle ORM.