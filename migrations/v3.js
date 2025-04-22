import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin, testStopWhere, testSuccessWhere } from 'adapt-migrations';

describe('List - v2.0.2 to v3.0.0', async () => {
  let lists;
  whereFromPlugin('List - from v2.0.2', { name: 'adapt-list', version: '<3.0.0' });
  whereContent('where content 1', async content => {
    lists = content.filter(({ _component }) => _component === 'list');
    return lists.length;
  });
  mutateContent('List - add item body', async content => {
    lists.forEach(list => list._items.forEach(item => (item.body = '')));
    return true;
  });
  checkContent('List - check item body attribute', async content => {
    const isValid = lists.every(list => list._items.every(item => item.body !== undefined));
    if (!isValid) throw new Error('List - found invalid item body');
    return true;
  });
  updatePlugin('List - update to v3.0.0', { name: 'adapt-list', version: '3.0.0', framework: '>=5.0.0' });

  testSuccessWhere('correct version with list components', {
    fromPlugins: [{ name: 'adapt-contrib-list', version: '2.0.2' }],
    content: [
      { _id: 'c-100', _component: 'list' },
      { _id: 'c-105', _component: 'list' }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-list', version: '3.0.0' }]
  });

  testStopWhere('no list components', {
    fromPlugins: [{ name: 'adapt-contrib-list', version: '2.0.2' }],
    content: [{ _component: 'other' }]
  });
});

describe('List - v3.1.2 to v3.2.0', async () => {
  let lists;
  whereFromPlugin('List - from v3.1.2', { name: 'adapt-list', version: '<3.2.0' });
  whereContent('where content 1', async content => {
    lists = content.filter(({ _component }) => _component === 'list');
    return lists.length;
  });
  mutateContent('List - add _percentInviewVertical attribute', async content => {
    lists.forEach(list => (list._percentInviewVertical = 70));
    return true;
  });
  checkContent('List - check _percentInviewVertical attribute', async content => {
    const isValid = lists.every(({ _percentInviewVertical }) => (_percentInviewVertical === 70));
    if (!isValid) throw new Error('found invalid _percentInviewVertical attribute');
    return true;
  });
  updatePlugin('List - update to v3.2.0', { name: 'adapt-list', version: '3.2.0', framework: '>=5.0.0' });

  testSuccessWhere('correct version with list components', {
    fromPlugins: [{ name: 'adapt-contrib-list', version: '3.1.2' }],
    content: [
      { _id: 'c-100', _component: 'list' },
      { _id: 'c-105', _component: 'list' }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-list', version: '3.2.0' }]
  });

  testStopWhere('no list components', {
    fromPlugins: [{ name: 'adapt-contrib-list', version: '3.1.2' }],
    content: [{ _component: 'other' }]
  });
});

describe('List - v3.2.0 to v3.3.0', async () => {
  let lists;
  whereFromPlugin('List - from v3.2.0', { name: 'adapt-list', version: '<3.3.0' });
  whereContent('where content 1', async content => {
    lists = content.filter(({ _component }) => _component === 'list');
    return lists.length;
  });
  mutateContent('List - add _columns attribute', async content => {
    lists.forEach(list => (list._columns = 0));
    return true;
  });
  checkContent('List - check _columns attribute', async content => {
    const isValid = lists.every(({ _columns }) => (_columns === 0));
    if (!isValid) throw new Error('found invalid _columns attribute');
    return true;
  });
  updatePlugin('List - update to v3.3.0', { name: 'adapt-list', version: '3.3.0', framework: '>=5.0.0' });

  testSuccessWhere('correct version with list components', {
    fromPlugins: [{ name: 'adapt-contrib-list', version: '3.2.0' }],
    content: [
      { _id: 'c-100', _component: 'list' },
      { _id: 'c-105', _component: 'list' }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-list', version: '3.3.0' }]
  });

  testStopWhere('no list components', {
    fromPlugins: [{ name: 'adapt-contrib-list', version: '3.2.0' }],
    content: [{ _component: 'other' }]
  });
});
