# Task 2: Create lib/data.ts — DONE

## Summary

Successfully created `lib/data.ts` with all typed constants for projects, certificates, and skills. File serves as the single source of truth for all portfolio content consumed by page.tsx and work/[slug]/page.tsx.

## What Was Created

**File:** `/Users/yayanrahmatwijaya/Herd/yayan-portfolio/.worktrees/scaffold/lib/data.ts`

**Content:**
- **3 interfaces** (Project, Certificate, Skill) with exact signatures from brief
- **6 projects** with kebab-case slugs, descriptions, long descriptions, tags, year format, stacks, and GitHub URLs
  - msglowformen (2024 → ongoing)
  - titanchessengine (2024)
  - heywatchface (2023)
  - sellershop (2023)
  - smart-home (2023)
  - bts100-dashboard (2022)
- **6 certificates** from Dicoding Indonesia with MM/YYYY validUntil format and PDF paths
- **3 skill groups**
  - languages: 8 skills with optional levels (Expert/Advanced/Intermediate/Beginner)
  - frameworks: 8 skills (no levels)
  - tools: 7 skills (no levels)

**Export structure:**
```typescript
export const projects: Project[]
export const certificates: Certificate[]
export const languages: Skill[]
export const frameworks: Skill[]
export const tools: Skill[]
```

## Verification Results

✓ **Type-check:** `npx tsc --noEmit` — No errors
✓ **All data matches brief exactly** — interfaces, counts, formats, content verified
✓ **GitHub URLs:** Present on first 2 projects (msglowformen, titanchessengine)
✓ **Live URLs:** Correctly undefined across all projects
✓ **Year format:** Correct ("2024 →" for ongoing, "2024"/"2023"/"2022" for completed)
✓ **Certificate dates:** All in MM/YYYY format (08/2026, 09/2028, etc.)
✓ **Slugs:** All lowercase kebab-case

## Commit

```
ad88381 feat: add lib/data.ts with all project, cert, and skill data
```

## Status

**DONE**

Task 2 is complete. File is ready for consumption by downstream components (tasks 3-12).
