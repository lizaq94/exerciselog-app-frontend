import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const noDeepFeatureImport = {
  group: ['@/features/*/**'],
  message:
    'Deep import into a feature. Import from the feature barrel instead: @/features/<name>. Inside the feature itself use a relative path.',
};

const noFeaturesFromShared = {
  group: ['@/features', '@/features/**'],
  message: 'shared/ must stay domain-agnostic and never import from features/.',
};

const noAppImport = {
  group: ['@/app/**'],
  message: 'Dependency direction is one-way: app/ -> features/ -> shared/.',
};

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', { patterns: [noDeepFeatureImport] }],
    },
  },
  {
    files: ['src/features/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', { patterns: [noDeepFeatureImport, noAppImport] }],
    },
  },
  {
    files: ['src/shared/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', { patterns: [noFeaturesFromShared, noAppImport] }],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
