module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 13,
  },
  rules: {
    'prettier/prettier': 'error',
    'no-plusplus': 0,
    'no-await-in-loop': 0,
    'consistent-return': 0,
    'no-unused-vars': 0,
    'no-param-reassign': 0,
  },
  plugins: ['prettier'],
};
