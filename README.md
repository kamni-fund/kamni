# KAMNI

## Development

### Installation

```bash
npm install
```

### Running the application

```bash
npm run dev
```

### Tests

The project uses Vitest for testing.

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Linting

```bash
# Run linter
npm run lint

# Format code
npm run format
```

### Git Hooks

The project uses Husky for git hooks. Pre-commit hook runs linting and tests.

To skip the pre-commit hook, use:

```bash
git commit -m "message" --no-verify
```
