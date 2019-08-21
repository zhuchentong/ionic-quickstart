'use strict';

module.exports = {
  allowBreakingChanges: ['feat', 'fix'],
  allowCustomScopes: true,
  scopes: [],
  types: [
    {
      value: 'wip',
      name: '💪  WIP:      现在做一半,一会接着干',
    },
    {
      value: 'feat',
      name: '✨  feat:     很高兴我又完成一个新功能',
    },
    {
      value: 'fix',
      name: '🐞  fix:      我认为我修复了一个Bug',
    },
    {
      value: 'refactor',
      name: '🛠  refactor: 我对一些代码进行了重构',
    },
    {
      value: 'docs',
      name: '📚  docs:     我更新和修改了文档',
    },
    {
      value: 'test',
      name: '🏁  test:     我做了和测试有关的工作',
    },
    {
      value: 'chore',
      name: '🗯  chore:    我没有修改src目录,只是做了一些零散的事情',
    },
    {
      value: 'style',
      name: '💅  style:    我优化了一些代码的样式风格',
    },
    {
      value: 'revert',
      name: '⏪  revert:   我需要去回滚代码',
    },
  ],
};
