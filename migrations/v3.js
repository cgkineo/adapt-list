import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin } from 'adapt-migrations';

describe('List - v2.0.2 to v3.1.2', async () => {
  let lists;
  whereFromPlugin('List - from v2.0.2', { name: 'adapt-list', version: '<3.1.2' });
  whereContent('where content 1', async content => {
    lists = content.filter(({ _component }) => _component === 'list');
    if (lists) return true;
  });
  mutateContent('List - add _percentInviewVertical attribute', async content => {
    lists.forEach(list => (list._percentInviewVertical = 70));
    return true;
  });
  checkContent('List - check _percentInviewVertical attribute', async content => {
    const isValid = lists.every(({ _percentInviewVertical }) => (_percentInviewVertical !== undefined && _percentInviewVertical !== null));
    if (!isValid) throw new Error('found invalid _percentInviewVertical attribute');
    return true;
  });
  updatePlugin('List - update to v3.1.2', { name: 'adapt-list', version: '3.1.2', framework: '>=5' });
});

describe('List - v3.1.2 to v3.3.0', async () => {
  let lists;
  whereFromPlugin('List - from v3.1.2', { name: 'adapt-list', version: '<3.3.0' });
  whereContent('where content 1', async content => {
    lists = content.filter(({ _component }) => _component === 'list');
    if (lists) return true;
  });
  mutateContent('List - add _columns attribute', async content => {
    lists.forEach(list => (list._columns = 0));
    return true;
  });
  checkContent('List - check _columns attribute', async content => {
    const isValid = lists.every(({ _columns }) => (_columns !== undefined && _columns !== null));
    if (!isValid) throw new Error('found invalid _columns attribute');
    return true;
  });
  updatePlugin('List - update to v3.3.0', { name: 'adapt-list', version: '3.3.0', framework: '>=5' });
});
