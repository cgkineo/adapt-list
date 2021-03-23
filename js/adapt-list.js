import Adapt from 'core/js/adapt';
import ListModel from './list-model';
import ListView from './list-view';

export default Adapt.register('list', {
  model: ListModel,
  view: ListView
});
