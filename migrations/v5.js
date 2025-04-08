import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin, testStopWhere, testSuccessWhere } from 'adapt-migrations';
import _ from 'lodash';

describe('List - v5.1.0 to v5.2.0', async () => {
  let lists;
  whereFromPlugin('List - from v5.1.0', { name: 'adapt-list', version: '<5.2.0' });
  whereContent('where content 1', async content => {
    lists = content.filter(({ _component }) => _component === 'list');
    return lists.length;
  });
  mutateContent('List - add _graphic object', async content => {
    lists.forEach(list => {
      list._items.forEach(item => { if (!_.has(item, '_graphic')) _.set(item, '_graphic', {}); });
    });
    return true;
  });
  mutateContent('List - add _graphic alt attribute', async content => {
    lists.forEach(list => {
      list._items.forEach(item => { _.set(item._graphic, 'alt', item.alt || ''); });
    });
    return true;
  });
  mutateContent('List - add _graphic attribution attribute', async content => {
    lists.forEach(list => {
      list._items.forEach(item => { _.set(item._graphic, 'attribution', ''); });
    });
    return true;
  });
  mutateContent('List - add _graphic src attribute', async content => {
    lists.forEach(list => {
      list._items.forEach(item => { _.set(item._graphic, 'src', item._imageSrc || ''); });
    });
    return true;
  });
  mutateContent('List - delete deprecated _imageSrc attribute', async content => {
    lists.forEach(list => { list._items.forEach(item => (delete item._imageSrc)); });
    return true;
  });
  mutateContent('List - delete deprecated alt attribute', async content => {
    lists.forEach(list => { list._items.forEach(item => (delete item.alt)); });
    return true;
  });
  mutateContent('List - add item _classes', async content => {
    lists.forEach(list => { list._items.forEach(item => (item._classes = '')); });
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
    const isValid = lists.every(list => list._items.every(item => item._graphic));
    if (!isValid) throw new Error('List - _graphic object invalid');
    return true;
  });
  checkContent('List - check for _graphic alt attribute', async content => {
    const isValid = lists.every(list => list._items.every(item => (_.has(item._graphic, 'alt'))));
    if (!isValid) throw new Error('List - _graphic alt object invalid');
    return true;
  });
  checkContent('List - check for _graphic attribution attribute', async content => {
    const isValid = lists.every(list => list._items.every(item => (_.has(item._graphic, 'attribution'))));
    if (!isValid) throw new Error('List - _graphic attribution object invalid');
    return true;
  });
  checkContent('List - check for _graphic src attribute', async content => {
    const isValid = lists.every(list => list._items.every(item => (_.has(item._graphic, 'src'))));
    if (!isValid) throw new Error('List - _graphic src object invalid');
    return true;
  });
  checkContent('List - check that deprecated _imageSrc was removed', async content => {
    const isValid = lists.every(list => list._imageSrc === undefined);
    if (!isValid) throw new Error('List - found deprecated _imageSrc attribute');
    return true;
  });
  checkContent('List - check that deprecated alt was removed', async content => {
    const isValid = lists.every(list => list.alt === undefined);
    if (!isValid) throw new Error('List - found deprecated alt attribute');
    return true;
  });
  checkContent('List - check for item _classes', async content => {
    const isValid = lists.every(list => list._items.every(item => item._classes === ''));
    if (!isValid) throw new Error('List - found item _classes is invalid');
    return true;
  });
  checkContent('List - check _itemHorizontalAlignment attribute', async content => {
    const isValid = lists.every(({ _itemHorizontalAlignment }) => (_itemHorizontalAlignment === 'start'));
    if (!isValid) throw new Error('found invalid _itemHorizontalAlignment attribute');
    return true;
  });
  checkContent('List - check _bulletAlignment attribute', async content => {
    const isValid = lists.every(({ _bulletAlignment }) => (_bulletAlignment === 'start'));
    if (!isValid) throw new Error('found invalid _itemHorizontalAlignment attribute');
    return true;
  });
  updatePlugin('List - update to v5.2.0', { name: 'adapt-list', version: '5.2.0', framework: '>=5.14.0' });

  testSuccessWhere('correct version with list components', {
    fromPlugins: [{ name: 'adapt-contrib-list', version: '5.1.0' }],
    content: [
      { _id: 'c-100', _component: 'list' },
      { _id: 'c-105', _component: 'list' }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-list', version: '5.2.0' }]
  });

  testStopWhere('no list components', {
    fromPlugins: [{ name: 'adapt-contrib-list', version: '5.1.0' }],
    content: [{ _component: 'other' }]
  });
});

describe('List - v5.2.4 to v5.2.5', async () => {
  let lists;
  whereFromPlugin('List - from v5.2.4', { name: 'adapt-list', version: '<5.2.5' });
  whereContent('where content 1', async content => {
    lists = content.filter(({ _component }) => _component === 'list');
    return lists.length;
  });
  mutateContent('List - add bodyAfter attribute', async content => {
    lists.forEach(list => (list.bodyAfter = ''));
    return true;
  });
  checkContent('List - check bodyAfter attribute', async content => {
    const isValid = lists.every(({ bodyAfter }) => (bodyAfter === ''));
    if (!isValid) throw new Error('found invalid bodyAfter attribute');
    return true;
  });
  updatePlugin('List - update to v5.2.5', { name: 'adapt-list', version: '5.2.5', framework: '>=5.14.0' });

  testSuccessWhere('correct version with list components', {
    fromPlugins: [{ name: 'adapt-contrib-list', version: '5.2.4' }],
    content: [
      { _id: 'c-100', _component: 'list' },
      { _id: 'c-105', _component: 'list' }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-list', version: '5.2.5' }]
  });

  testStopWhere('no list components', {
    fromPlugins: [{ name: 'adapt-contrib-list', version: '5.2.4' }],
    content: [{ _component: 'other' }]
  });
});
