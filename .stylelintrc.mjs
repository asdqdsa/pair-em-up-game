export default {
  customSyntax: 'postcss-scss',
  extends: ['stylelint-config-recommended-scss'],
  plugins: ['stylelint-scss'],
  rules: {
    'nesting-selector-no-missing-scoping-root': null,
  },
};
