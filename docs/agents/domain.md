# Domain Docs

How engineering skills should consume this repository's domain documentation when exploring the codebase.

## Before exploring

- Read `CONTEXT.md` at the repository root when it exists.
- If `CONTEXT-MAP.md` exists, read the context files it references that are relevant to the work.
- Read relevant decisions under `docs/adr/`.

If these files do not exist, proceed silently. The domain-modeling workflows create them lazily when terminology or decisions are resolved.

## File structure

This is a single-context repository:

```text
/
├── CONTEXT.md
├── docs/adr/
└── src/
```

## Use the glossary's vocabulary

When output names a domain concept—in an issue title, proposal, hypothesis, or test—use the term defined in `CONTEXT.md`. Avoid synonyms that the glossary explicitly rejects.

If a needed concept is missing, reconsider whether the term belongs to the project or note the gap for `/domain-modeling`.

## Flag ADR conflicts

If proposed work contradicts an existing ADR, surface the conflict explicitly instead of silently overriding the decision.
