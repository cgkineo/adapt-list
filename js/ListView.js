import ComponentView from 'core/js/views/componentView';

class ListView extends ComponentView {

  className() {
    let classes = super.className();
    if (this.isAnimatedList) classes += ' is-animated-list is-animating';
    return classes;
  }

  postRender() {
    this.setReadyStatus();
    this.setupInviewCompletion('.component__widget');
    this.contentAlignment();

    if (this.isAnimatedList) {
      this.$('.list__container').on('onscreen.animate', this.checkIfOnScreen.bind(this));
    }
  }

  contentAlignment() {
    const _horizontalAlignment = this.model.get('_itemHorizontalAlignment');
    const _bulletAlignment = this.model.get('_bulletAlignment');

    if (_horizontalAlignment) this.$el.addClass(`item-justify-${_horizontalAlignment}`);
    if (_bulletAlignment) this.$el.addClass(`bullet-align-${_bulletAlignment}`);
  }

  /**
   * Kicks off the list item animation once the list container is at least xx% on screen
   */
  checkIfOnScreen({ currentTarget }, options) {
    const { onscreen, percentInviewVertical } = options;
    if (!onscreen || percentInviewVertical < this.model.get('_percentInviewVertical')) return;

    $(currentTarget).off('onscreen.animate');
    this.animateListItems();
  }

  /**
   * animates the list items in one-by-one
   */
  animateListItems() {
    const items = this.model.getChildren();
    const itemCount = items.length;
    items.forEach((listItem, index) => {
      setTimeout(listItem.toggleActive.bind(listItem, true), 200 * index);
      if (index !== (itemCount - 1)) return;
      const $item = this.$('.list-item').eq(index);
      $item.one('transitionend', () => this.$el.removeClass('is-animating'));
    });
  }

  remove() {
    this.$('.list__container').off('onscreen.animate');

    super.remove();
  }

  get isAnimatedList() {
    // don't animate when Visua11y 'no animations' is set
    return this.model.get('_animateList') && (!$('html').hasClass('a11y-no-animations'));
  }
};

ListView.template = 'list.jsx';

export default ListView;
