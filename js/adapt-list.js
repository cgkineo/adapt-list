import components from 'core/js/components';
import ListModel from './ListModel';
import ListView from './ListView';

export default components.register('list', {
  model: ListModel,
  view: ListView
});
