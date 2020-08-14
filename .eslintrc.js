module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/essential',
    'plugin:vue/strongly-recommended',
    'eslint:recommended'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    'vue/require-default-prop': 'off',
    'vue/html-indent': ['error', 'tab', {}],
    'vue/html-self-closing': ['error', {
      'html': {
        'void': 'any',
        'normal': 'any',
        'component': 'always'
      }
    }],
    'vue/this-in-template': ['error', 'never'],
    'vue/order-in-components': ['error', {}],
    'vue/component-tags-order': ['error', {
      'order': ['template', 'script', 'style']
    }]
  }
}
