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

describe('List - v2.0.2 to v5.2.1', async () => {
  let lists;
  whereFromPlugin('List - from v2.0.2', { name: 'adapt-list', version: '<5.2.1' });
  whereContent('where content 1', async content => {
    lists = content.filter(({ _component }) => _component === 'list');
    if (lists) return true;
  });
  mutateContent('List - change _imageSrc attribute to _graphic object attribute', async content => {
    lists.forEach(list => {
      list._items.forEach(item => {
        const src = item._imageSrc;
        const alt = item.alt;
        item._graphic = { src, alt, attribution: '' };
      });
    });
    return true;
  });
  mutateContent('List - delete deprecated _imageSrc and alt attributes', async content => {
    lists.forEach(list => {
      list._items.forEach(item => {
        delete item._imageSrc;
        delete item.alt;
      });
    });
    return true;
  });
  checkContent('List - check for _graphic object', async content => {
    const isValid = lists.every(list =>
      list._items.every(item =>
        item._graphic &&
        ![item._graphic.src, item._graphic.alt, item._graphic.attribution].some(prop => prop === undefined)
      )
    );
    if (!isValid) throw new Error('List - _graphic object not found or is incomplete on items');
    return true;
  });
  checkContent('List - check that deprecated _imageSrc and alt were removed', async content => {
    let isValid = true;
    lists.forEach(list => {
      if (list._imageSrc || list.alt) isValid = false;
    });
    if (!isValid) throw new Error('List - found deprecated _imageSrc or alt attributes');
    return true;
  });
  updatePlugin('List - update to v5.2.1', { name: 'adapt-list', version: '5.2.1', framework: '>=5.14.0' });
});

describe('List - v5.2.4 to v5.2.5', async () => {
  let lists;
  whereFromPlugin('List - from v5.2.4', { name: 'adapt-list', version: '<=5.2.4' });
  whereContent('where content 1', async content => {
    lists = content.filter(({ _component }) => _component === 'list');
    if (lists) return true;
  });
  mutateContent('List - add bodyAfter attribute', async content => {
    lists.forEach(list => (list.bodyAfter = ''));
    return true;
  });
  checkContent('List - check bodyAfter attribute', async content => {
    const isValid = lists.every(({ bodyAfter }) => (bodyAfter !== undefined && bodyAfter !== null));
    if (!isValid) throw new Error('found invalid bodyAfter attribute');
    return true;
  });
  updatePlugin('List - update to v5.2.5', { name: 'adapt-list', version: '5.2.5', framework: '>=5.14.0' });
});
