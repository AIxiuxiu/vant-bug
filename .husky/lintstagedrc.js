module.exports = {
  'src/**/*.js': ['eslint --fix'],
  'src/**/*.ts': ['eslint --fix'],
  'src/**/*.vue': ['eslint --fix', 'stylelint --fix'],
  'src/**/*.{scss,less}': ['stylelint --fix']
}
