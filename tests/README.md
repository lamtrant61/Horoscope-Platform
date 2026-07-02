# Test Structure

All project tests live under `tests/` and mirror the source tree they cover.

```text
tests/
├── setup.ts
├── README.md
└── unit/
    ├── app/
    │   └── stores/
    │       └── use-counter.test.ts
    ├── components/
    │   └── awesome/
    │       └── Button/
    │           └── index.test.ts
    ├── composables/
    │   └── use-sync-props.test.ts
    └── server/
        └── utils/
            ├── common.test.ts
            ├── horoscope.test.ts
            ├── openai.test.ts
            └── response.test.ts
```

Use `unit/` for isolated tests that mock network, database, OpenAI, Telegram, and payment dependencies.
