import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin } from 'adapt-migrations';

describe('List - v3.3.0 to v5.2.0', async () => {
  let lists;
  whereFromPlugin('List - from v3.3.0', { name: 'adapt-list', version: '<5.2.0' });
  whereContent('where content 1', async content => {
    lists = content.filter(({ _component }) => _component === 'list');
    if (lists) return true;
  });
  mutateContent('List - change _imageSrc attribute to _graphic object attribute', async content => {
    lists.forEach(list => {
      list._items.forEach(item => {
        item._graphic = {};
        const src = item._imageSrc || '';
        const alt = item.alt || '';
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
  mutateContent('List - add item _classes', async content => {
    lists.forEach(list => {
      list._items.forEach(item => (item._classes = ''));
    });
    return true;
  });
  mutateContent('List - add _itemHorizontalAlignment', async content => {
    lists.forEach(list => (list._itemHorizontalAlignment = 'start'));
    return true;
  });
  mutateContent('List - add _bulletAlignment', async content => {
    lists.forEach(list => (list._bulletAlignment = 'start'));
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
  checkContent('List - check for item _classes', async content => {
    const isValid = lists.every(list =>
      list._items.every(item => item._classes !== undefined)
    );
    if (!isValid) throw new Error('List - _graphic object not found or is incomplete on items');
    return true;
  });
  checkContent('List - check _itemHorizontalAlignment attribute', async content => {
    const isValid = lists.every(({ _itemHorizontalAlignment }) => (_itemHorizontalAlignment !== undefined));
    if (!isValid) throw new Error('found invalid _itemHorizontalAlignment attribute');
    return true;
  });
  checkContent('List - check _bulletAlignment attribute', async content => {
    const isValid = lists.every(({ _bulletAlignment }) => (_bulletAlignment !== undefined));
    if (!isValid) throw new Error('found invalid _itemHorizontalAlignment attribute');
    return true;
  });
  updatePlugin('List - update to v5.2.0', { name: 'adapt-list', version: '5.2.0', framework: '>=5.14.0' });
});

describe('List - v5.2.0 to v5.2.5', async () => {
  let lists;
  whereFromPlugin('List - from v5.2.0', { name: 'adapt-list', version: '<5.2.5' });
  whereContent('where content 1', async content => {
    lists = content.filter(({ _component }) => _component === 'list');
    if (lists) return true;
  });
  mutateContent('List - add bodyAfter attribute', async content => {
    lists.forEach(list => (list.bodyAfter = ''));
    return true;
  });
  checkContent('List - check bodyAfter attribute', async content => {
    const isValid = lists.every(({ bodyAfter }) => (bodyAfter !== undefined));
    if (!isValid) throw new Error('found invalid bodyAfter attribute');
    return true;
  });
  updatePlugin('List - update to v5.2.5', { name: 'adapt-list', version: '5.2.5', framework: '>=5.14.0' });
});
