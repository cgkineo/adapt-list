import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin } from 'adapt-migrations';


describe('List - v5.2.4 > v5.2.5', async () => {
  let lists;
  whereFromPlugin('List - from v5.2.4', { name: 'adapt-list', version: '<=5.2.4' });
  whereContent('where content 1', async content => {
    lists = content.filter(({ _component }) => _component === 'list');
    if (lists) return true;
  });
  mutateContent('Narrative - add bodyAfter attribute', async content => {
    lists.forEach(item => (item.bodyAfter = ''));
    return true;
  });
  checkContent('Narrative - check bodyAfter attribute', async content => {
    const isValid = content.some(({ bodyAfter }) => bodyAfter);
    if (!isValid) throw new Error('found invalid bodyAfter attribute');
    return true;
  });
  updatePlugin('List - update to v5.2.5', { name: 'adapt-list', version: '5.2.5', framework: '>=5.14.0' });
});
