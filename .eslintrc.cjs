module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  ignorePatterns: [
    'node_modules/*',
    'commitlint.config.cjs',
    'tailwind.config.js',
    'postfix.config.js',
  ],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      settings: {
        react: { version: 'detect' },
        'import/resolver': {
          typescript: {},
        },
      },
      env: {
        browser: true,
        node: true,
        es2021: true,
      },
      extends: [
        'plugin:import/recommended',
        'plugin:import/typescript',
        'airbnb',
        'airbnb-typescript',
        'airbnb/hooks',
        'prettier',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:storybook/recommended',
      ],

      plugins: ['@typescript-eslint', 'react'],
      rules: {
        'react/react-in-jsx-scope': 'off',
        'react/require-default-props': 'off',
        'react/jsx-props-no-spreading': 'off',
        'jsx-a11y/label-has-associated-control': 'off',
        'no-plusplus': 'off',
        'no-restricted-exports': 'off',
        'react/no-array-index-key': 'off',
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: ['**/*.stories.*', '**/.storybook/**/*.*'],
            peerDependencies: true,
          },
        ],
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
};
