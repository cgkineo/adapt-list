define([
  'core/js/adapt',
  './list-model',
  './list-view'
], function(Adapt, ListModel, ListView) {

  return Adapt.register('list', {
    model: ListModel,
    view: ListView
  });

});
