module.exports = {
  extends: [
    /*'stylelint-config-standard'*/
  ],
  overrides: [
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html'
    },
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss'
    }
  ],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {}
}
