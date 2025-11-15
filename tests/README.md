# Testing Documentation

## Overview

This directory contains test files and documentation for the AI Bubble Analytics application.

## Test Structure

```
tests/
├── README.md (this file)
├── unit/ (Unit tests - To be implemented)
├── integration/ (Integration tests - To be implemented)
└── e2e/ (End-to-end tests - To be implemented)

frontend/src/__tests__/
├── components/ (Component unit tests)
├── utils/ (Utility function tests)
└── hooks/ (Custom hooks tests - To be implemented)
```

## Running Tests

### Unit Tests (Jest + React Testing Library)

```bash
cd frontend
npm test
```

Run tests in watch mode:
```bash
npm test -- --watch
```

Run tests with coverage:
```bash
npm test -- --coverage
```

### E2E Tests (To Be Implemented - Cypress/Playwright)

```bash
# Install Cypress
npm install --save-dev cypress

# Open Cypress
npx cypress open

# Run Cypress tests
npx cypress run
```

## Writing Tests

### Component Tests

Component tests should be placed in `frontend/src/__tests__/components/` and follow this naming convention: `ComponentName.test.js`

**Example:**

```javascript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import YourComponent from '../../components/YourComponent';

describe('YourComponent', () => {
  test('renders correctly', () => {
    render(
      <BrowserRouter>
        <YourComponent />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/expected text/i)).toBeInTheDocument();
  });

  test('handles user interaction', () => {
    render(
      <BrowserRouter>
        <YourComponent />
      </BrowserRouter>
    );
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(screen.getByText(/result/i)).toBeInTheDocument();
  });
});
```

### Utility Function Tests

Place utility tests in `frontend/src/__tests__/utils/` and follow this naming convention: `utilityName.test.js`

**Example:**

```javascript
import { calculateBubbleSize } from '../../utils/chartConfig';

describe('calculateBubbleSize', () => {
  test('returns correct size for given divergence', () => {
    const result = calculateBubbleSize(10.4);
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThanOrEqual(100);
  });

  test('handles edge case of zero divergence', () => {
    const result = calculateBubbleSize(0);
    expect(result).toBe(0);
  });
});
```

## Test Coverage Goals

- **Overall Coverage**: 80%+
- **Components**: 75%+
- **Utilities**: 90%+
- **Hooks**: 80%+

## Current Test Status

### ✅ Implemented
- Component test structure (HomePage.test.js)
- Error logging utility

### ⏳ To Be Implemented

#### High Priority
- [ ] Navigation component tests
- [ ] Dynamic Bubble component tests
- [ ] Chart component tests
- [ ] API utility tests
- [ ] Error logger utility tests

#### Medium Priority
- [ ] Context page tests
- [ ] Metrics page tests
- [ ] Newsletter form tests
- [ ] Router integration tests

#### Low Priority
- [ ] E2E tests for full user flows
- [ ] Visual regression tests
- [ ] Performance tests
- [ ] Accessibility tests

## Testing Best Practices

### 1. Test Behavior, Not Implementation

```javascript
// ❌ Bad - Testing implementation details
test('component has state', () => {
  expect(component.state.value).toBe(10);
});

// ✅ Good - Testing behavior
test('displays current value', () => {
  expect(screen.getByText('10')).toBeInTheDocument();
});
```

### 2. Use Descriptive Test Names

```javascript
// ❌ Bad
test('works', () => {});

// ✅ Good
test('displays error message when API request fails', () => {});
```

### 3. Arrange-Act-Assert Pattern

```javascript
test('increments counter on button click', () => {
  // Arrange
  render(<Counter />);
  const button = screen.getByRole('button');
  
  // Act
  fireEvent.click(button);
  
  // Assert
  expect(screen.getByText('1')).toBeInTheDocument();
});
```

### 4. Mock External Dependencies

```javascript
import axios from 'axios';
jest.mock('axios');

test('fetches data on mount', async () => {
  axios.get.mockResolvedValue({ data: { value: 100 } });
  
  render(<DataComponent />);
  
  await waitFor(() => {
    expect(screen.getByText('100')).toBeInTheDocument();
  });
});
```

## Continuous Integration

### GitHub Actions (To Be Configured)

Create `.github/workflows/test.yml`:

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '20.x'
      - name: Install dependencies
        run: cd frontend && npm install
      - name: Run tests
        run: cd frontend && npm test -- --coverage
      - name: Upload coverage
        uses: codecov/codecov-action@v2
```

## Error Logging in Tests

The error logger utility is automatically available in tests:

```javascript
import errorLogger from '../../utils/errorLogger';

test('logs errors correctly', () => {
  const error = new Error('Test error');
  errorLogger.logError(error, 'Test Context');
  
  const errors = errorLogger.getErrors();
  expect(errors).toHaveLength(1);
  expect(errors[0].message).toBe('Test error');
});
```

## Debugging Tests

### VSCode Debug Configuration

Add to `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Jest Tests",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "${workspaceFolder}/frontend/node_modules/.bin/react-scripts",
      "args": ["test", "--runInBand", "--no-cache", "--watchAll=false"],
      "cwd": "${workspaceFolder}/frontend",
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

### Chrome DevTools

```bash
node --inspect-brk node_modules/.bin/jest --runInBand
# Open chrome://inspect in Chrome
```

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Cypress Documentation](https://docs.cypress.io/)

## Contributing

When adding new features:
1. Write tests first (TDD approach recommended)
2. Ensure all tests pass before committing
3. Maintain or improve code coverage
4. Update this README if adding new test patterns

---

**Last Updated**: November 15, 2025  
**Test Framework**: Jest 27.x + React Testing Library 13.x  
**Coverage Tool**: Jest Coverage
