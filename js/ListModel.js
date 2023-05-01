import ItemsComponentModel from 'core/js/models/itemsComponentModel';

export default class ListModel extends ItemsComponentModel {

  defaults() {
    return ItemsComponentModel.resultExtend('defaults', {
      _animateList: false,
      _columns: 0,
      _orderedList: false,
      _percentInviewVertical: 70
    });
  }

}
