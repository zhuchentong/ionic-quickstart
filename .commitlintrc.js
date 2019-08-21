module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-empty': [0, 'never'],
    'scope-empty': [0, 'never'],
    'scope-case': [2, 'always', 'lowerCase'],
    'header-max-length': [2, 'always', 80],
    'type-enum': [
      2,
      'always',
      ['wip', 'build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test']
    ]
  }
}
