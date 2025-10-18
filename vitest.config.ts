import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['**/*.test.ts', '**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.config.ts',
        '**/*.test.ts',
        '**/*.spec.ts'
      ]
    }
  }
});
